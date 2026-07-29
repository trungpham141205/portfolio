export type TagVariant =
  | "riscv"
  | "rv32i"
  | "verilog"
  | "systemverilog"
  | "soc"
  | "cnn"
  | "fsm"
  | "sequential"
  | "arithmetic"
  | "fpga";

export const tagLabels = {
  riscv: "RISC-V",
  rv32i: "RV32I",
  verilog: "Verilog",
  systemverilog: "SystemVerilog",
  soc: "SoC",
  cnn: "CNN accelerator",
  fsm: "FSM",
  sequential: "Sequential",
  arithmetic: "Arithmetic",
  fpga: "FPGA",
} as const satisfies Record<TagVariant, string>;
