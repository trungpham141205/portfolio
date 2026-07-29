<template>
  <section
    class="signal-ticker"
    aria-label="Digital IC disciplines: Verilog, SystemVerilog, RISC-V, FPGA, RTL, SoC and verification"
  >
    <div class="signal-ticker-track">
      <div v-for="copy in 2" :key="copy" class="signal-ticker-copy" :aria-hidden="copy === 2">
        <span>VERILOG</span>
        <i></i>
        <span>SYSTEMVERILOG</span>
        <i></i>
        <span>RISC-V</span>
        <i></i>
        <span>FPGA</span>
        <i></i>
        <span>RTL DESIGN</span>
        <i></i>
        <span>SOC</span>
        <i></i>
        <span>VERIFICATION</span>
        <i></i>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.signal-ticker {
  position: relative;
  z-index: 12;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(4px);

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    width: 12vw;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #000, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #000, transparent);
  }

  &-track {
    display: flex;
    width: max-content;
    animation: signal-ticker 28s linear infinite;
  }

  &-copy {
    display: flex;
    align-items: center;
    gap: 24px;
    min-width: max-content;
    padding: 13px 12px;
    color: #c6c6c6;
    font: 700 10px/1 "Urbanist", sans-serif;
    letter-spacing: 0.18em;

    i {
      width: 4px;
      height: 4px;
      border: 1px solid #808080;
      border-radius: 50%;
    }
  }
}

@keyframes signal-ticker {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-ticker-track {
    animation: none;
  }
}
</style>
