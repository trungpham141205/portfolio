import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Binary, Cpu, Workflow } from 'lucide-react';

const HomePage = ({ navigate }) => {
  const [typingText, setTypingText] = useState('');
  const terminalLines = [
    '$ source setup_env.sh',
    '> Synthesizing RTL modules...',
    '> Simulating testbenches... [PASS]',
    '> Pham Quoc Trung: system online',
  ];

  useEffect(() => {
    const fullText = terminalLines.join('\n');
    let character = 0;
    let timeoutId;

    const typeNext = () => {
      character += 1;
      setTypingText(fullText.slice(0, character));
      if (character < fullText.length) {
        timeoutId = window.setTimeout(typeNext, character < 24 ? 34 : 18);
      }
    };

    timeoutId = window.setTimeout(typeNext, 500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const disciplines = [
    {
      index: '01',
      icon: Binary,
      title: 'RTL Design',
      description: 'Verilog and SystemVerilog modules—from combinational blocks to complete CPU datapaths.',
    },
    {
      index: '02',
      icon: Workflow,
      title: 'Verification',
      description: 'Testbench-driven development, waveform inspection, edge cases and expected-result checking.',
    },
    {
      index: '03',
      icon: Cpu,
      title: 'CPU Architecture',
      description: 'RV32I single-cycle CPU, memory-mapped systems and a path toward SoC integration.',
    },
  ];

  return (
    <div className="home-page page-enter">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-pulse" aria-hidden="true" />
            Available for opportunities
          </div>

          <p className="hero-kicker">Digital IC Design Portfolio · 2026</p>
          <h1>
            Logic, shaped
            <br />
            <span>into silicon.</span>
          </h1>
          <p className="hero-intro">
            I’m Pham Quoc Trung, a digital IC design learner building practical
            work in RTL, FPGA prototyping, RISC-V architecture and hardware verification.
          </p>

          <div className="hero-actions">
            <button className="button-primary" onClick={() => navigate('projects')}>
              Explore selected work
              <ArrowRight size={15} />
            </button>
            <button className="button-ghost" onClick={() => navigate('labs')}>
              Open digital lab
              <ArrowDownRight size={15} />
            </button>
          </div>
        </div>

        <div className="hero-scene-label" aria-hidden="true">
          <span>PORTAL / RTL</span>
          <span>72°N 18°E</span>
        </div>

        <div className="terminal-panel" aria-label="Hardware portfolio terminal status">
          <div className="panel-label">
            <span>System log</span>
            <span>LIVE</span>
          </div>
          <pre>{typingText}<span className="terminal-cursor">_</span></pre>
        </div>
      </section>

      <section className="disciplines-section" aria-labelledby="disciplines-title">
        <div className="section-heading">
          <p className="section-index">01 / Focus</p>
          <div>
            <h2 id="disciplines-title">Building from gates to systems.</h2>
            <p>
              A learning practice grounded in implementation: design it, simulate it,
              inspect it, then make it better.
            </p>
          </div>
        </div>

        <div className="card-grid card-grid-three">
          {disciplines.map(({ index, icon: Icon, title, description }) => (
            <article className="ghost-card discipline-card" key={title}>
              <div className="card-topline">
                <span>{index}</span>
                <Icon size={19} strokeWidth={1.4} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
