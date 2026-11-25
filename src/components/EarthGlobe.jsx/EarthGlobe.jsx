import { useEffect, useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const LIGHTS_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_lights_2048.png";

const CITIES = [
  [40.71, -74.0],
  [51.5, -0.12],
  [31.52, 74.35],
  [35.68, 139.69],
  [1.35, 103.82],
  [-33.87, 151.21],
  [25.2, 55.27],
  [-23.55, -46.63],
  [-33.92, 18.42],
];

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [1, 6],
  [2, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [6, 3],
  [6, 8],
  [8, 7],
  [7, 0],
  [0, 2],
  [4, 6],
];

function globePoint(lat, lon, radius = 2) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function EarthGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId;
    let renderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.error("Unable to initialize the 3D globe:", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 8.5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(mount.clientWidth || 600, mount.clientHeight || 500);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    scene.add(new THREE.AmbientLight(0x91b9ee, 1.7));

    const sunlight = new THREE.DirectionalLight(0xffffff, 3);
    sunlight.position.set(-4, 3, 5);
    scene.add(sunlight);

    const blueLight = new THREE.PointLight(0x168cff, 20, 18);
    blueLight.position.set(4, -1, 3);
    scene.add(blueLight);

    const loader = new THREE.TextureLoader();

    // Earth surface
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 15,
      specular: new THREE.Color(0x183d64),
    });

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2, 96, 96),
      earthMaterial,
    );
    globe.add(earth);

    loader.load(
      EARTH_TEXTURE,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.warn("Earth texture could not load:", error),
    );

    // Night-side city lights
    const lightsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdba0,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nightLights = new THREE.Mesh(
      new THREE.SphereGeometry(2.006, 72, 72),
      lightsMaterial,
    );
    globe.add(nightLights);

    loader.load(
      LIGHTS_TEXTURE,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = THREE.SRGBColorSpace;
        lightsMaterial.map = texture;
        lightsMaterial.needsUpdate = true;
      },
      undefined,
      () => {},
    );

    // Atmospheric glow
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x258dff) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -viewPosition.xyz;
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 glowColor;

        void main() {
          float glow = pow(
            0.78 - max(
              dot(normalize(vNormal), normalize(vViewPosition)), 0.0
            ),
            2.2
          );
          gl_FragColor = vec4(glowColor, glow * 0.8);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    globe.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.22, 72, 72),
        atmosphereMaterial,
      ),
    );

    // City nodes
    const nodeGeometry = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9df5ff,
      toneMapped: false,
    });

    CITIES.forEach(([lat, lon]) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(globePoint(lat, lon, 2.025));
      globe.add(node);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 12, 12),
        new THREE.MeshBasicMaterial({
          color: 0x168cff,
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );

      halo.position.copy(node.position);
      globe.add(halo);
    });

    // Curved global network links and travelling pulses
    const pulses = [];

    CONNECTIONS.forEach(([a, b], index) => {
      const start = globePoint(...CITIES[a], 2.025);
      const end = globePoint(...CITIES[b], 2.025);

      const middle = start.clone().add(end).multiplyScalar(0.5);
      middle.normalize().multiplyScalar(2.35 + start.distanceTo(end) * 0.12);

      const curve = new THREE.QuadraticBezierCurve3(start, middle, end);

      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
        new THREE.LineBasicMaterial({
          color: index % 3 === 0 ? 0x9b86ff : 0x28baff,
          transparent: true,
          opacity: 0.48,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      globe.add(line);

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.027, 10, 10),
        new THREE.MeshBasicMaterial({
          color: index % 3 === 0 ? 0xc5b7ff : 0xb2f6ff,
          toneMapped: false,
        }),
      );
      globe.add(pulse);

      pulses.push({
        mesh: pulse,
        curve,
        offset: index / CONNECTIONS.length,
        speed: 0.06 + (index % 4) * 0.012,
      });
    });

    // Background stars
    const starPositions = new Float32Array(450 * 3);

    for (let i = 0; i < 450; i++) {
      const radius = 5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.cos(phi);
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );

    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xa9c8f1,
        size: 0.02,
        transparent: true,
        opacity: 0.75,
      }),
    );
    scene.add(stars);

    // Keep the globe fitted to its container
    const resize = () => {
      if (disposed) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clock = new THREE.Clock();

    function animate() {
      if (disposed) return;

      frameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      if (!reducedMotion) {
        globe.rotation.y += delta * 0.075;
        stars.rotation.y += delta * 0.003;

        pulses.forEach(({ mesh, curve, offset, speed }) => {
          mesh.position.copy(curve.getPoint((elapsed * speed + offset) % 1));
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();

      scene.traverse((object) => {
        object.geometry?.dispose();

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value?.isTexture) value.dispose();
            });
            material.dispose();
          });
        }
      });

      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="earth-globe" aria-hidden="true" />;
}
