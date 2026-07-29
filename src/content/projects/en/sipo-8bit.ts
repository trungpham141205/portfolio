import type { ProjectContent } from "../../types";

export default {
  title: "SIPO 8-bit Register",
  theme: "dark",
  category: "Sequential Logic",
  level: "Foundation",
  architecture: "sipo-8bit",
  tags: ["sequential", "verilog"],
  source: "https://github.com/trungpham141205/SIPO_8_BIT",
  description:
    "An eight-bit serial-in, parallel-out register used to study how clocked storage moves data through a chain.<br/><br/>The project keeps the timing relationship between serial input, flip-flop stages and parallel observation explicit.",
  components: [
    {
      type: "text",
      props: {
        title: "Sequential path",
        text: "At each active clock edge, the new serial bit enters the first stage while every stored bit advances by one stage. The eight register taps expose the complete word in parallel.",
      },
    },
    {
      type: "list",
      props: {
        title: "Learning focus",
        size: "md",
        items: [
          "Non-blocking assignment and edge-triggered behavior.",
          "A repeatable flip-flop chain with deterministic bit ordering.",
          "Waveform-level verification of latency and serial-to-parallel conversion.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
