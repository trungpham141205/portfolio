import React, { useState } from 'react';
import { ArrowUpRight, Cpu, MoveRight, Network, PlusSquare, TrafficCone, Zap } from 'lucide-react';
import { Github } from '../components/Icons';

const projects = [
  {
    title: 'RV32I Single-Cycle CPU',
    url: 'https://github.com/trungpham141205/RV32I_Single_Cycle',
    category: 'CPU',
    level: 'Advanced',
    icon: Cpu,
    description: 'A RISC-V RV32I processor focused on datapath integration, instruction decode, ALU control, register file and memory interfaces.',
    highlights: ['Single-cycle datapath', 'Control and ALU decode', 'SoC-ready foundation'],
    tags: ['RISC-V', 'RV32I', 'Verilog'],
  },
  {
    title: 'SoC RV32I CNN',
    url: 'https://github.com/trungpham141205/SoC-RV32I-CNN-',
    category: 'SoC',
    level: 'Advanced',
    icon: Network,
    description: 'An early SoC exploration combining an RV32I direction with accelerator-level thinking and system integration.',
    highlights: ['CPU + accelerator direction', 'Memory-mapped architecture', 'System-level design'],
    tags: ['SoC', 'Accelerator'],
  },
  {
    title: 'Traffic Light Controller',
    url: 'https://github.com/trungpham141205/TRAFFIC_LIGHT_CONTROLLER',
    category: 'FSM',
    level: 'Intermediate',
    icon: TrafficCone,
    description: 'A finite-state traffic controller for practicing state encoding, transition logic and counter-driven timing.',
    highlights: ['Moore-style FSM', 'State register logic', 'Counter-based timing'],
    tags: ['FSM', 'SystemVerilog'],
  },
  {
    title: 'SIPO 8-bit Register',
    url: 'https://github.com/trungpham141205/SIPO_8_BIT',
    category: 'Sequential',
    level: 'Intermediate',
    icon: MoveRight,
    description: 'A serial-in parallel-out register for exploring flip-flop chains, timing behavior and reset strategies.',
    highlights: ['Sequential logic', 'D flip-flop chain', 'Timing-aware verification'],
    tags: ['SIPO', 'Flip-Flop'],
  },
  {
    title: 'Carry Lookahead Adder',
    url: 'https://github.com/trungpham141205/CLA_4_BIT',
    category: 'Arithmetic',
    level: 'Intermediate',
    icon: Zap,
    description: 'A 4-bit carry lookahead adder centered on generate/propagate logic and fast carry computation.',
    highlights: ['Generate / propagate', 'Fast carry computation', 'Combinational optimization'],
    tags: ['CLA', 'Adder'],
  },
  {
    title: 'Ripple Carry Adder 32-bit',
    url: 'https://github.com/trungpham141205/Ripple_Carry_Adder_32bit',
    category: 'Arithmetic',
    level: 'Intermediate',
    icon: PlusSquare,
    description: 'A 32-bit ripple carry adder that scales full-adder composition into a wider processor datapath.',
    highlights: ['32-bit datapath', 'Full-adder chaining', 'Carry propagation'],
    tags: ['RCA', 'Datapath'],
  },
];

const filters = ['All', 'CPU', 'SoC', 'FSM', 'Sequential', 'Arithmetic'];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="content-page projects-page page-enter">
      <header className="page-intro">
        <p className="page-overline">02 / Selected work</p>
        <div className="page-intro-grid">
          <h1>Projects built<br />to understand.</h1>
          <p>
            A focused collection charting my progression from core combinational
            logic to CPU and system-level hardware architecture.
          </p>
        </div>
      </header>

      <div className="filter-bar" role="tablist" aria-label="Project filters">
        {filters.map((filter) => (
          <button
            key={filter}
            role="tab"
            aria-selected={activeFilter === filter}
            className={activeFilter === filter ? 'is-active' : ''}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="project-grid" role="tabpanel">
        {visibleProjects.map((project, index) => {
          const Icon = project.icon;
          return (
            <article className="ghost-card project-card" key={project.title}>
              <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-card-main">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.level}</span>
                </div>
                <div className="project-title-row">
                  <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
                  <h2>{project.title}</h2>
                </div>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className="project-card-footer">
                <div className="tag-list">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={15} />
                  Source
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
