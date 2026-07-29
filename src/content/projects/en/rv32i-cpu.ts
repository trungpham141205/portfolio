import type { ProjectContent } from "../../types";

export default {
  title: "RV32I Single-Cycle CPU",
  theme: "dark",
  category: "CPU Architecture",
  level: "Advanced",
  architecture: "rv32i-cpu",
  tags: ["riscv", "rv32i", "verilog"],
  source: "https://github.com/trungpham141205/RV32I_Single_Cycle",
  description:
    "A processor implementation centered on the complete RV32I instruction path: fetch, decode, execute, memory access and register write-back.<br/><br/>The project is the architectural foundation for later SoC integration.",
  components: [
    {
      type: "text",
      props: {
        title: "Architecture",
        text: "A single clock cycle carries every instruction through the program counter, instruction decoder, register file, immediate generator, ALU, data-memory interface and write-back multiplexer. Keeping this path explicit makes control decisions and data dependencies easy to inspect.",
      },
    },
    {
      type: "list",
      props: {
        title: "What the implementation preserves",
        size: "md",
        items: [
          "Single-cycle datapath with a clear fetch → decode → execute → memory → write-back flow.",
          "Dedicated main-control and ALU-control decode for RV32I instruction classes.",
          "Register-file, immediate and memory interfaces structured as a base for an SoC.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
