import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';

const skillGroups = [
  { title: 'Languages', items: ['Verilog / SystemVerilog', 'C / C++', 'Python'] },
  { title: 'Tools', items: ['Vivado', 'ModelSim / Questa', 'Quartus'] },
  { title: 'Domains', items: ['Computer Architecture', 'FSM Design', 'FPGA Prototyping'] },
];

const timeline = [
  { phase: 'Current phase', title: 'CPU Architecture', text: 'Designing a single-cycle RV32I processor: fetch, decode, execute and memory mapping.' },
  { phase: 'Previous phase', title: 'FSM & Control Logic', text: 'Moore and Mealy machines, state encoding and clean next-state logic separation.' },
  { phase: 'Completed', title: 'Sequential Logic', text: 'Shift registers and counters with deliberate reset, enable and timing behavior.' },
  { phase: 'Foundation', title: 'Combinational Logic', text: 'Adders, multiplexers, core gate-level design and propagation-delay awareness.' },
];

const AboutPage = () => (
  <div className="content-page about-page page-enter">
    <header className="page-intro">
      <p className="page-overline">04 / About</p>
      <div className="page-intro-grid">
        <h1>Learning hardware<br />by making it real.</h1>
        <p>
          I care about the point where an algorithm becomes a physical structure:
          explicit, testable and ready to meet timing.
        </p>
      </div>
    </header>

    <div className="about-layout">
      <aside className="ghost-card profile-card">
        <div className="profile-monogram" aria-hidden="true">
          <span>PQT</span>
          <div />
        </div>
        <div>
          <p className="micro-label">Profile / 001</p>
          <h2>Pham Quoc Trung</h2>
          <p className="profile-role">Digital IC Design Learner</p>
          <p>
            Focused on RTL design, verification thinking, FPGA prototyping and
            the long road from individual logic blocks to integrated systems.
          </p>
        </div>
        <div className="profile-links">
          <a href="https://github.com/trungpham141205" target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub <ArrowUpRight size={13} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </aside>

      <div className="about-details">
        <section className="ghost-card skills-panel" aria-labelledby="skills-title">
          <div className="panel-heading">
            <p className="micro-label">Capabilities</p>
            <h2 id="skills-title">Skills matrix</h2>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="ghost-card timeline-panel" aria-labelledby="timeline-title">
          <div className="panel-heading">
            <p className="micro-label">Progression</p>
            <h2 id="timeline-title">Learning path</h2>
          </div>
          <ol className="timeline-list">
            {timeline.map((item, index) => (
              <li key={item.title}>
                <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="micro-label">{item.phase}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  </div>
);

export default AboutPage;
