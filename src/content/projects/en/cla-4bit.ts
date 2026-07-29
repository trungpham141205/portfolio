import type { ProjectContent } from "../../types";

export default {
  title: "Carry Lookahead Adder",
  theme: "dark",
  category: "Arithmetic Logic",
  level: "Foundation",
  architecture: "cla-4bit",
  tags: ["arithmetic", "verilog"],
  source: "https://github.com/trungpham141205/CLA_4_BIT",
  description:
    "A four-bit carry lookahead adder that derives carry terms from bit generate and propagate signals.<br/><br/>It demonstrates how Boolean expansion reduces dependence on a serial carry chain.",
  components: [
    {
      type: "text",
      props: {
        title: "Carry reasoning",
        text: "Each bit computes generate G = A·B and propagate P = A⊕B. The carry network expands these terms so downstream carries can be evaluated in parallel from Cin and earlier G/P values.",
      },
    },
    {
      type: "list",
      props: {
        title: "Learning focus",
        size: "md",
        items: [
          "Generate/propagate equations translated directly into combinational RTL.",
          "Comparison between logic depth and the simpler ripple-carry topology.",
          "Sum formation from propagate signals and the computed carry vector.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
