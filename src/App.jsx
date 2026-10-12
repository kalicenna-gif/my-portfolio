import { useEffect, useState } from "react";

import EarthGlobe from "./components/EarthGlobe.jsx/EarthGlobe";

import "./App.css";

const services = [
  {
    number: "01",
    icon: "✳",
    title: "AI Workflow Automation",
    text: "Connect business tools and automate repetitive tasks with intelligent workflows.",
    tags: ["n8n", "AI workflows", "Process automation"],
  },
  {
    number: "02",
    icon: "⌘",
    title: "AI Agents & Integrations",
    text: "Build workflows that use AI models, APIs, and connected applications to move information intelligently.",
    tags: ["LLM APIs", "Integrations", "Webhooks"],
  },
  {
    number: "03",
    icon: "⟷",
    title: "API Integration",
    text: "Connect platforms and services so information moves reliably between systems.",
    tags: ["REST APIs", "JSON", "Webhooks"],
  },
  {
    number: "04",
    icon: "▧",
    title: "Web Development",
    text: "Develop modern websites and web applications for practical business needs.",
    tags: ["React", "JavaScript", "Responsive UI"],
  },
];

const projects = [
  {
    number: "01",
    type: "RECRUITMENT AUTOMATION",
    title: "CV Recruitment CRM",
    description:
      "A recruitment dashboard for organizing candidate records using Google Sheets, Streamlit, and n8n. The project is still in development.",
    tools: ["Python", "Streamlit", "Google Sheets", "n8n"],
    status: "IN DEVELOPMENT",
    visual: "recruitment",
  },
  {
    number: "02",
    type: "AI WORKFLOW AUTOMATION",
    title: "AI CV Screening Automation",
    description:
      "An n8n workflow that extracts information from uploaded CVs, uses AI to evaluate candidate information, stores results in Google Sheets, and supports recruitment follow-ups.",
    tools: ["n8n", "AI", "PDF Extraction", "Google Sheets"],
    status: "WORKFLOW PROJECT",
    visual: "workflow",
  },
  {
    number: "03",
    type: "LINKEDIN AUTOMATION",
    title: "LinkedIn Client Automation",
    description:
      "An automation system for managing multiple LinkedIn client profiles and organizing connection and lead workflows.",
    tools: ["Python", "Google Sheets", "Automation"],
    status: "AUTOMATION PROJECT",
    visual: "workflow",
  },
  {
    number: "04",
    type: "SOCIAL MEDIA AUTOMATION",
    title: "LinkedIn AI Posting",
    description:
      "An automated posting workflow designed to support AI-assisted LinkedIn content creation and publishing.",
    tools: ["AI", "LinkedIn", "Workflow Automation"],
    status: "WORKFLOW PROJECT",
    visual: "workflow",
  },
  {
    number: "05",
    type: "DATA AUTOMATION",
    title: "AI-Powered Data Storage Workflows",
    description:
      "Automated workflows designed to process information and store structured data in connected applications.",
    tools: ["n8n", "AI", "Google Sheets", "Integrations"],
    status: "WORKFLOW PROJECT",
    visual: "workflow",
  },
  {
    number: "06",
    type: "NETWORKING",
    title: "Networking Simulation",
    description:
      "A networking simulation project for exploring network configurations and communication between network components.",
    tools: ["Networking", "Simulation"],
    status: "ACADEMIC PROJECT",
    visual: "workflow",
  },
  {
    number: "07",
    type: "WEB DEVELOPMENT",
    title: "Real-Time Chat Application",
    description:
      "A chat application project focused on enabling communication between users in real time.",
    tools: ["Web Development", "Real-Time Communication"],
    status: "DEVELOPMENT PROJECT",
    visual: "workflow",
  },
];

const skills = [
  "AI workflow automation",
  "API integrations",
  "n8n",
  "Python",
  "JavaScript",
  "React",
  "Google Sheets",
  "Webhooks",
  "Streamlit",
  "Workflow design",
];

function NeuralNetwork() {
  const nodes = [
    [10, 25],
    [22, 12],
    [27, 42],
    [40, 23],
    [43, 60],
    [56, 12],
    [60, 38],
    [68, 68],
    [77, 25],
    [85, 48],
    [91, 15],
    [17, 72],
    [34, 82],
    [53, 83],
    [75, 88],
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [4, 12],
    [5, 6],
    [5, 10],
    [6, 7],
    [6, 8],
    [7, 9],
    [7, 13],
    [8, 9],
    [8, 10],
    [9, 14],
    [11, 2],
    [11, 12],
    [12, 13],
    [13, 7],
    [13, 14],
  ];

  return (
    <div className="neural-scene" aria-hidden="true">
      <div className="neural-glow neural-glow-one" />
      <div className="neural-glow neural-glow-two" />
      <div className="neural-orbit orbit-one" />
      <div className="neural-orbit orbit-two" />
      <div className="neural-orbit orbit-three" />

      <svg
        className="neural-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="network-line">
            <stop offset="0%" stopColor="#2778ff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#63d8ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2778ff" stopOpacity="0.08" />
          </linearGradient>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map(([from, to], index) => (
          <line
            key={`line-${index}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
            stroke="url(#network-line)"
            strokeWidth=".23"
            className="network-line"
            style={{ animationDelay: `${index * 110}ms` }}
          />
        ))}

        {connections.slice(0, 14).map(([from, to], index) => (
          <circle
            key={`particle-${index}`}
            r=".48"
            fill="#8be9ff"
            className="network-particle"
            style={{
              offsetPath: `path("M ${nodes[from][0]} ${nodes[from][1]} L ${nodes[to][0]} ${nodes[to][1]}")`,
              animationDelay: `${index * -0.6}s`,
            }}
          />
        ))}

        {nodes.map(([x, y], index) => (
          <g key={`node-${index}`} filter="url(#node-glow)">
            <circle
              cx={x}
              cy={y}
              r={index % 4 === 0 ? "1.1" : ".62"}
              fill={index % 3 === 0 ? "#91efff" : "#4c94ff"}
              className="network-node"
              style={{ animationDelay: `${index * 180}ms` }}
            />
          </g>
        ))}
      </svg>

      <div className="core-label">
        <span className="core-label-dot" />
        INTELLIGENCE IN MOTION
      </div>

      <div className="floating-chip chip-top">
        <span className="chip-icon">✳</span>
        AI SYSTEMS
      </div>
      <div className="floating-chip chip-bottom">
        <span className="chip-icon">↗</span>
        CONNECTED WORKFLOWS
      </div>
      <div className="scene-cross cross-one">+</div>
      <div className="scene-cross cross-two">+</div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const links = [
    ["Services", "#services"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["About", "#about"],
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" onClick={closeMenu}>
          SHAHBAZ<span>.</span>
        </a>

        <button
          className="mobile-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? "nav-open" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let's talk <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="availability-pill reveal">
            <span className="availability-dot" />
            AI AUTOMATION · SOFTWARE DEVELOPMENT
          </div>

          <p className="hero-kicker reveal delay-1">
            BUILD SMARTER. AUTOMATE BETTER.
          </p>

          <h1 className="hero-title reveal delay-2">
            I turn complex
            <br />
            workflows into
            <br />
            <span className="gradient-text">intelligent systems.</span>
          </h1>

          <p className="hero-description reveal delay-3">
            I'm Shahbaz, an <strong>AI Automation Specialist</strong> and
            Software Developer focused on connecting tools, streamlining
            business processes, and building practical digital solutions.
          </p>

          <div className="hero-actions reveal delay-4">
            <a className="button button-primary" href="#projects">
              Explore my work <span>↗</span>
            </a>
            <a className="button button-secondary" href="#contact">
              Let's discuss a project
            </a>
          </div>

          <div className="hero-trust reveal delay-4">
            <span className="trust-line" />
            <span>Automation · Integration · Development</span>
          </div>
        </div>

        <div className="hero-visual reveal delay-3">
          <EarthGlobe />
          <div className="visual-caption">
            <span>01 / GLOBAL AI NETWORK</span>
            <span>CONNECTED INTELLIGENCE</span>
          </div>
        </div>
      </div>
      <a className="scroll-indicator" href="#services">
        <span className="scroll-line" />
        SCROLL TO EXPLORE
      </a>
    </section>
  );
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">
        <span /> {eyebrow}
      </p>
      <h2>
        {title} <span className="gradient-text">{accent}</span>
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="WHAT I DO"
          title="Technology that"
          accent="works smarter."
          description="Practical solutions that connect your tools, improve workflows, and reduce repetitive work."
        />

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.number}
              style={{ "--card-delay": `${index * 100}ms` }}
            >
              <div className="service-card-top">
                <span className="service-icon">{service.icon}</span>
                <span className="service-number">{service.number}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="tag-list">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="card-arrow">↗</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ type }) {
  if (type === "recruitment") {
    return (
      <div className="project-visual recruitment-visual">
        <div className="mini-window">
          <div className="mini-window-bar">
            <span />
            <span />
            <span />
            <small>RECRUITMENT PIPELINE</small>
          </div>
          <div className="pipeline">
            <div className="pipeline-step">
              <span>01</span>
              <b>CV Upload</b>
              <i>✓</i>
            </div>
            <div className="pipeline-connector" />
            <div className="pipeline-step active-step">
              <span>02</span>
              <b>AI Extraction</b>
              <i>✳</i>
            </div>
            <div className="pipeline-connector" />
            <div className="pipeline-step">
              <span>03</span>
              <b>Candidate Record</b>
              <i>↗</i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual workflow-visual">
      <div className="workflow-node node-trigger">
        <span>↗</span>
        <small>TRIGGER</small>
      </div>
      <div className="workflow-link">
        <span />
      </div>
      <div className="workflow-node node-ai">
        <span>✳</span>
        <small>AI ENGINE</small>
      </div>
      <div className="workflow-link">
        <span />
      </div>
      <div className="workflow-node node-action">
        <span>✓</span>
        <small>ACTION</small>
      </div>
      <div className="workflow-orb" />
    </div>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="SELECTED WORK"
          title="Built to solve"
          accent="real problems."
          description="A look at projects and practical solutions involving software, automation, and connected workflows."
        />

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <ProjectVisual type={project.visual} />
              <div className="project-content">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="project-note">
          Project descriptions reflect current work and concepts; additional
          details can be added as projects are completed.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-layout">
        <div className="about-mark">
          <div className="about-orbit about-orbit-a" />
          <div className="about-orbit about-orbit-b" />
          <div className="about-center">
            <span>AI</span>
            <small>+ SYSTEMS</small>
          </div>
          <span className="about-coordinate">INTELLIGENT BY DESIGN</span>
        </div>

        <div className="about-copy">
          <SectionHeading
            eyebrow="ABOUT ME"
            title="Engineering a"
            accent="smarter workflow."
          />
          <p>
            I work at the intersection of software development and automation,
            with an interest in making digital processes more connected,
            efficient, and useful.
          </p>
          <p>
            My focus is on practical solutions: connecting APIs, organizing
            information, building web interfaces, and designing workflows around
            real business needs.
          </p>
          <div className="role-card">
            <span className="role-card-icon">⌘</span>
            <div>
              <strong>AI Automation Specialist</strong>
              <span>Software Developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container skills-layout">
        <div>
          <SectionHeading
            eyebrow="TOOLS & TECHNOLOGY"
            title="The building blocks"
            accent="behind the work."
            description="Technologies and areas relevant to my current work. The right stack depends on the problem being solved."
          />
        </div>
        <div className="skills-cloud">
          {skills.map((skill, index) => (
            <span key={skill} style={{ "--skill-delay": `${index * 65}ms` }}>
              <i /> {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const service = form.get("service");
    const message = form.get("message");

    const subject = encodeURIComponent(`Portfolio enquiry: ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`,
    );

    window.location.href = `mailto:shahbazsajjad1000@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="conversation-section">
      <div className="conversation-container">
        <div className="conversation-copy">
          <span className="conversation-eyebrow">
            <span className="conversation-status-dot" />
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Start a <span>conversation.</span>
          </h2>

          <p className="conversation-description">
            Have an idea worth building? Let's discuss how AI automation,
            thoughtful software, and practical integrations can help bring it to
            life.
          </p>

          <div className="conversation-details">
            <a
              className="conversation-detail"
              href="mailto:shahbazsajjad1000@gmail.com"
            >
              <span className="conversation-icon">@</span>
              <span className="conversation-detail-text">
                <small>EMAIL ME</small>
                <strong>shahbazsajjad1000@gmail.com</strong>
              </span>
              <span className="conversation-arrow">↗</span>
            </a>

            <a
              className="conversation-detail"
              href="https://www.linkedin.com/in/shahbaz-sajjad-eh/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="conversation-icon">in</span>
              <span className="conversation-detail-text">
                <small>CONNECT ON LINKEDIN</small>
                <strong>Let's connect professionally</strong>
              </span>
              <span className="conversation-arrow">↗</span>
            </a>
          </div>

          <p className="conversation-note">
            Software Developer · AI Automation Specialist
          </p>
        </div>

        <div className="conversation-form-card">
          <div className="conversation-form-heading">
            <span className="conversation-form-number">
              01 / PROJECT ENQUIRY
            </span>
            <h3>Tell me what you're planning.</h3>
            <p>A few details are enough to get started.</p>
          </div>

          <form className="conversation-form" onSubmit={handleSubmit}>
            <div className="conversation-field">
              <label htmlFor="conversation-name">Your name</label>
              <input
                id="conversation-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="conversation-field">
              <label htmlFor="conversation-email">Email address</label>
              <input
                id="conversation-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="conversation-field">
              <label htmlFor="conversation-service">
                What can I help you with?
              </label>
              <select
                id="conversation-service"
                name="service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="AI Workflow Automation">
                  AI Workflow Automation
                </option>
                <option value="AI Agents and Integrations">
                  AI Agents & Integrations
                </option>
                <option value="Web Development">Web Development</option>
                <option value="API Integration">API Integration</option>
                <option value="Custom Software">Custom Software</option>
                <option value="Other">Something else</option>
              </select>
            </div>

            <div className="conversation-field">
              <label htmlFor="conversation-message">Project overview</label>
              <textarea
                id="conversation-message"
                name="message"
                rows="4"
                placeholder="Tell me about your idea, goals, or the problem you want to solve..."
                required
              />
            </div>

            <button className="conversation-submit" type="submit">
              <span>Prepare your enquiry</span>
              <span className="conversation-submit-arrow">↗</span>
            </button>

            <p className="conversation-form-footnote">
              This will open your email app with the details filled in.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              SHAHBAZ<span>.</span>
            </a>

            <p>AI Automation Specialist &amp; Software Developer</p>

            <p className="footer-tagline">
              Building smarter workflows and practical digital solutions.
            </p>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
          </div>

          <div className="footer-links">
            <h3>Connect</h3>
            <a href="mailto:shahbazsajjad1000@gmail.com">Email me ↗</a>
            <a
              href="https://www.linkedin.com/in/shahbaz-sajjad-eh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Shahbaz. All rights reserved.</p>

          <a href="#home" className="back-top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
