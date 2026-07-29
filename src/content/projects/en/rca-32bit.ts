import type { ProjectContent } from "../../types";

export default {
  title: "Ripple Carry Adder 32-bit",
  theme: "dark",
  category: "Arithmetic Logic",
  level: "Foundation",
  architecture: "rca-32bit",
  tags: ["arithmetic", "verilog"],
  source: "https://github.com/trungpham141205/Ripple_Carry_Adder_32bit",
  description:
    "A structural 32-bit ripple-carry adder assembled from full-adder stages.<br/><br/>The design makes hierarchy, composition and carry latency visible before moving to faster arithmetic structures.",
  components: [
    {
      type: "text",
      props: {
        title: "Structural composition",
        text: "Thirty-two full-adder instances form a regular chain. Each stage consumes A, B and the previous carry, then emits one sum bit and the carry for the next position.",
      },
    },
    {
      type: "list",
      props: {
        title: "Learning focus",
        size: "md",
        items: [
          "Reusable one-bit full-adder hierarchy.",
          "Explicit 33-bit carry chain from Cin to Cout.",
          "A timing baseline for comparison with the carry lookahead implementation.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
