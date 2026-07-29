import React, { useEffect, useState } from 'react';
import { Cpu, FileCode2, GitMerge, RotateCcw, TrafficCone, Zap } from 'lucide-react';

const aluCode = `module alu_4bit (
    input  [3:0] a,
    input  [3:0] b,
    input  [1:0] alu_sel,
    output reg [3:0] result,
    output reg       carry_out
);
    wire [4:0] add_res;
    assign add_res = a + b;

    always @(*) begin
        result    = 4'b0000;
        carry_out = 1'b0;
        case (alu_sel)
            2'b00: result = a & b;
            2'b01: result = a | b;
            2'b10: result = a ^ b;
            2'b11: begin
                result    = add_res[3:0];
                carry_out = add_res[4];
            end
        endcase
    end
endmodule`;

const fsmCode = `module traffic_controller (
    input  logic clk, rstn,
    output logic red, yellow, green
);
    typedef enum logic [1:0] {
        IDLE, RED, GREEN, YELLOW
    } state_t;

    state_t state, next_state;
    logic [3:0] counter;

    always_ff @(posedge clk or negedge rstn)
        if (!rstn) begin
            state   <= IDLE;
            counter <= 0;
        end else begin
            state   <= next_state;
            counter <= (state != next_state)
                ? 0 : counter + 1;
        end

    always_comb begin
        next_state = state;
        case (state)
            IDLE:   if (counter > 9) next_state = RED;
            RED:    if (counter > 4) next_state = GREEN;
            GREEN:  if (counter > 4) next_state = YELLOW;
            YELLOW: if (counter > 2) next_state = RED;
        endcase
    end

    assign red    = (state == IDLE) || (state == RED);
    assign green  = (state == GREEN);
    assign yellow = (state == YELLOW);
endmodule`;

const ViewTabs = ({ view, setView, codeLabel, schematicLabel }) => (
  <div className="view-tabs" role="tablist" aria-label="Engineering view">
    <button
      role="tab"
      aria-selected={view === 'verilog'}
      className={view === 'verilog' ? 'is-active' : ''}
      onClick={() => setView('verilog')}
    >
      <FileCode2 size={14} />
      {codeLabel}
    </button>
    <button
      role="tab"
      aria-selected={view === 'schematic'}
      className={view === 'schematic' ? 'is-active' : ''}
      onClick={() => setView('schematic')}
    >
      <GitMerge size={14} />
      {schematicLabel}
    </button>
  </div>
);

const BitSwitches = ({ label, value, bits, onToggle }) => (
  <div className="signal-panel">
    <div className="signal-heading">
      <span>{label} [3:0]</span>
      <span>DEC / {value}</span>
    </div>
    <div className="switch-row">
      {[3, 2, 1, 0].map((bit) => (
        <div className="switch-unit" key={bit}>
          <button
            className={`bit-switch ${bits[bit] ? 'is-on' : ''}`}
            onClick={() => onToggle(bit)}
            role="switch"
            aria-checked={bits[bit] === 1}
            aria-label={`${label} bit ${bit}`}
          >
            <span />
          </button>
          <small>{label}{bit}</small>
        </div>
      ))}
    </div>
  </div>
);

const ALULab = () => {
  const [view, setView] = useState('verilog');
  const [hardware, setHardware] = useState({
    a: [0, 1, 0, 1],
    b: [0, 0, 1, 1],
    op: 'AND',
  });

  const toggleSwitch = (group, bit) => {
    setHardware((current) => {
      const nextBits = [...current[group]];
      nextBits[bit] = nextBits[bit] ? 0 : 1;
      return { ...current, [group]: nextBits };
    });
  };

  const valueA = (hardware.a[3] << 3) | (hardware.a[2] << 2) | (hardware.a[1] << 1) | hardware.a[0];
  const valueB = (hardware.b[3] << 3) | (hardware.b[2] << 2) | (hardware.b[1] << 1) | hardware.b[0];
  const operation = {
    AND: () => valueA & valueB,
    OR: () => valueA | valueB,
    XOR: () => valueA ^ valueB,
    ADD: () => valueA + valueB,
  };
  const result = operation[hardware.op]();
  const outputs = [4, 3, 2, 1, 0].map((bit) => ({
    label: bit === 4 ? 'COUT' : `O${bit}`,
    value: (result >> bit) & 1,
  }));

  return (
    <div className="lab-workspace">
      <section className="ghost-card lab-board" aria-labelledby="alu-board-title">
        <div className="lab-board-heading">
          <div>
            <p className="micro-label">Interactive board / ALU-04</p>
            <h2 id="alu-board-title"><Cpu size={19} /> FPGA interface</h2>
          </div>
          <div className="operation-control" role="radiogroup" aria-label="ALU operation">
            {Object.keys(operation).map((op) => (
              <button
                key={op}
                role="radio"
                aria-checked={hardware.op === op}
                className={hardware.op === op ? 'is-active' : ''}
                onClick={() => setHardware((current) => ({ ...current, op }))}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="input-grid">
          <BitSwitches
            label="A"
            value={valueA}
            bits={hardware.a}
            onToggle={(bit) => toggleSwitch('a', bit)}
          />
          <BitSwitches
            label="B"
            value={valueB}
            bits={hardware.b}
            onToggle={(bit) => toggleSwitch('b', bit)}
          />
        </div>

        <div className="output-panel">
          <div className="output-title"><Zap size={15} /> Result output</div>
          <div className="led-row" role="status" aria-label={`ALU decimal result: ${result}`}>
            {outputs.map((output) => (
              <div className="led-unit" key={output.label}>
                <span className={`logic-led ${output.value ? 'is-on' : ''}`} />
                <small>{output.label}</small>
              </div>
            ))}
          </div>
          <div className="output-readout">
            <span>BIN / {outputs.map((output) => output.value).join('')}</span>
            <strong>DEC / {result}</strong>
          </div>
        </div>
      </section>

      <section className="engineering-panel">
        <ViewTabs
          view={view}
          setView={setView}
          codeLabel="alu_4bit.v"
          schematicLabel="RTL schematic"
        />
        {view === 'verilog' ? (
          <pre className="code-view"><code>{aluCode}</code></pre>
        ) : (
          <div className="schematic-view">
            <svg viewBox="0 0 420 360" role="img" aria-label="Four-bit ALU schematic">
              <text x="106" y="36">A [3:0]</text>
              <text x="312" y="36">B [3:0]</text>
              <line x1="106" y1="50" x2="106" y2="102" />
              <line x1="312" y1="50" x2="312" y2="102" />
              <polygon points="66,102 352,102 278,262 244,262 210,222 176,262 140,262" />
              <text className="schematic-title" x="210" y="176">ALU</text>
              <text x="210" y="202">4-BIT / {hardware.op}</text>
              <line x1="210" y1="244" x2="210" y2="312" />
              <text x="210" y="338">RESULT [4:0] / {result}</text>
            </svg>
          </div>
        )}
      </section>
    </div>
  );
};

const FSMLab = () => {
  const [view, setView] = useState('schematic');
  const [state, setState] = useState(0);
  const [counter, setCounter] = useState(0);
  const states = ['IDLE', 'RED', 'GREEN', 'YELLOW'];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCounter((current) => {
        const next = current + 1;
        if (state === 0 && next > 9) { setState(1); return 0; }
        if (state === 1 && next > 4) { setState(2); return 0; }
        if (state === 2 && next > 4) { setState(3); return 0; }
        if (state === 3 && next > 2) { setState(1); return 0; }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [state]);

  const reset = () => {
    setState(0);
    setCounter(0);
  };

  const lightStates = [
    { name: 'red', active: state === 0 || state === 1 },
    { name: 'yellow', active: state === 3 },
    { name: 'green', active: state === 2 },
  ];

  return (
    <div className="lab-workspace lab-workspace-fsm">
      <section className="ghost-card lab-board" aria-labelledby="fsm-board-title">
        <div className="lab-board-heading">
          <div>
            <p className="micro-label">Interactive board / FSM-04</p>
            <h2 id="fsm-board-title"><TrafficCone size={19} /> Traffic controller</h2>
          </div>
          <button className="button-ghost reset-button" onClick={reset}>
            <RotateCcw size={13} /> RSTN
          </button>
        </div>

        <div className="traffic-simulator">
          <div className="traffic-light" role="status" aria-label={`Current state: ${states[state]}`}>
            {lightStates.map((light) => (
              <span
                key={light.name}
                className={`traffic-bulb ${light.name} ${light.active ? 'is-on' : ''}`}
                aria-label={`${light.name} light ${light.active ? 'on' : 'off'}`}
              />
            ))}
          </div>
          <div className="clock-label">
            <span>CLK</span>
            <i />
            <span>1 HZ</span>
          </div>
        </div>

        <div className="state-readout">
          <div>
            <span>STATE REG</span>
            <strong>{states[state]}</strong>
          </div>
          <div>
            <span>COUNTER</span>
            <strong>{String(counter).padStart(2, '0')}</strong>
          </div>
        </div>
      </section>

      <section className="engineering-panel">
        <ViewTabs
          view={view}
          setView={setView}
          codeLabel="traffic_controller.sv"
          schematicLabel="State diagram"
        />
        {view === 'verilog' ? (
          <pre className="code-view"><code>{fsmCode}</code></pre>
        ) : (
          <div className="schematic-view state-diagram">
            <svg viewBox="0 0 920 390" role="img" aria-label="Traffic controller state diagram">
              <defs>
                <marker id="state-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
                  <polygon points="0 0, 9 3.5, 0 7" />
                </marker>
              </defs>
              {states.map((label, index) => {
                const x = 45 + index * 220;
                return (
                  <g className={state === index ? 'is-active' : ''} key={label}>
                    <rect x={x} y="120" width="150" height="86" rx="5" />
                    <text x={x + 75} y="158">{String(index).padStart(2, '0')}</text>
                    <text className="state-name" x={x + 75} y="184">{label}</text>
                  </g>
                );
              })}
              <line x1="198" y1="163" x2="258" y2="163" markerEnd="url(#state-arrow)" />
              <line x1="418" y1="163" x2="478" y2="163" markerEnd="url(#state-arrow)" />
              <line x1="638" y1="163" x2="698" y2="163" markerEnd="url(#state-arrow)" />
              <path d="M 772 210 Q 580 330 334 210" fill="none" markerEnd="url(#state-arrow)" />
              <text x="554" y="318">SEQUENTIAL STATE FLOW / CLK 1 HZ</text>
            </svg>
          </div>
        )}
      </section>
    </div>
  );
};

const LabsPage = () => {
  const [activeLab, setActiveLab] = useState('alu');

  return (
    <div className="content-page labs-page page-enter">
      <header className="page-intro lab-page-intro">
        <div>
          <p className="page-overline">03 / Digital lab</p>
          <h1>Touch the logic.<br />Watch it respond.</h1>
        </div>
        <div>
          <p>
            Small, interactive RTL studies that connect source code,
            signal state and hardware behavior.
          </p>
          <div className="lab-selector" role="tablist" aria-label="Lab selector">
            <button
              role="tab"
              aria-selected={activeLab === 'alu'}
              className={activeLab === 'alu' ? 'is-active' : ''}
              onClick={() => setActiveLab('alu')}
            >
              4-bit ALU
            </button>
            <button
              role="tab"
              aria-selected={activeLab === 'fsm'}
              className={activeLab === 'fsm' ? 'is-active' : ''}
              onClick={() => setActiveLab('fsm')}
            >
              Traffic FSM
            </button>
          </div>
        </div>
      </header>

      <div role="tabpanel">
        {activeLab === 'alu' ? <ALULab /> : <FSMLab />}
      </div>
    </div>
  );
};

export default LabsPage;
