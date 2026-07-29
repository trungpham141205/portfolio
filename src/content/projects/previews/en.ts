import type { ProjectPreview } from "../../types";

export default [
  {
    title: "RV32I Single-Cycle CPU",
    slug: "rv32i-cpu",
    category: "CPU Architecture",
    index: "01",
    description: "A complete single-cycle processor path from instruction fetch to write-back.",
    tags: ["RISC-V", "RV32I", "Verilog"],
  },
  {
    title: "SoC RV32I CNN",
    slug: "soc-cnn",
    category: "System Integration",
    index: "02",
    description: "An SoC exploration connecting an RV32I core with accelerator-oriented hardware.",
    tags: ["SoC", "CPU", "Accelerator"],
  },
  {
    title: "Traffic Light Controller",
    slug: "traffic-fsm",
    category: "Control Logic",
    index: "03",
    description: "A timed four-state traffic controller built around explicit sequential behavior.",
    tags: ["FSM", "SystemVerilog", "Timing"],
  },
  {
    title: "SIPO 8-bit Register",
    slug: "sipo-8bit",
    category: "Sequential Logic",
    index: "04",
    description: "An eight-stage serial-in, parallel-out register for studying data movement by clock.",
    tags: ["SIPO", "Flip-flop", "RTL"],
  },
  {
    title: "Carry Lookahead Adder",
    slug: "cla-4bit",
    category: "Arithmetic Logic",
    index: "05",
    description: "A four-bit adder that exposes generate and propagate logic to reduce carry delay.",
    tags: ["CLA", "Boolean logic", "Verilog"],
  },
  {
    title: "Ripple Carry Adder 32-bit",
    slug: "rca-32bit",
    category: "Arithmetic Logic",
    index: "06",
    description: "A structural 32-bit adder assembled from a transparent full-adder carry chain.",
    tags: ["RCA", "Structural RTL", "32-bit"],
  },
] as const satisfies ProjectPreview[];
