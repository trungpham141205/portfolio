import type { ProjectContent } from "../../types";

export default {
  title: "SoC RV32I CNN",
  theme: "dark",
  category: "System Integration",
  level: "Advanced",
  architecture: "soc-cnn",
  tags: ["soc", "rv32i", "cnn", "fpga"],
  source: "https://github.com/trungpham141205/SoC-RV32I-CNN-",
  description:
    "An early system-on-chip exploration that extends the RV32I direction toward accelerator-level thinking.<br/><br/>The essential question is how a programmable CPU, memory space and CNN-oriented compute hardware cooperate as one mapped system.",
  components: [
    {
      type: "text",
      props: {
        title: "System direction",
        text: "The design treats the accelerator as a hardware resource in the processor system instead of an isolated arithmetic block. Address decoding, control/status exchange and memory movement therefore become part of the architecture.",
      },
    },
    {
      type: "list",
      props: {
        title: "Integration focus",
        size: "md",
        items: [
          "RV32I processor as the programmable control plane.",
          "Memory-mapped communication between CPU and CNN-oriented accelerator logic.",
          "System-level reasoning about data movement, status, control and shared resources.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
