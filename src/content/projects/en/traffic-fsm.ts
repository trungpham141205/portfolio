import type { ProjectContent } from "../../types";

export default {
  title: "Traffic Light Controller",
  theme: "dark",
  category: "Control Logic",
  level: "Intermediate",
  architecture: "traffic-fsm",
  tags: ["fsm", "systemverilog"],
  source: "https://github.com/trungpham141205/TRAFFIC_LIGHT_CONTROLLER",
  description:
    "A synchronous traffic controller that makes state, timing and output behavior visible.<br/><br/>Its four-state flow is also reproduced as a live simulation in the Lab section of this portfolio.",
  components: [
    {
      type: "text",
      props: {
        title: "State behavior",
        text: "IDLE holds red for ten ticks, RED and GREEN each hold for five, YELLOW holds for three, then the sequence returns to RED. A state register and counter separate sequential state retention from combinational next-state decisions.",
      },
    },
    {
      type: "list",
      props: {
        title: "RTL structure",
        size: "md",
        items: [
          "Enumerated state type for IDLE, RED, GREEN and YELLOW.",
          "Clocked state/counter block with active-low reset.",
          "Combinational next-state logic and state-derived light outputs.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
