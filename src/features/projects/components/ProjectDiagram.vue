<script setup lang="ts">
defineProps<{
  slug: string;
  compact?: boolean;
}>();

const stages = ["IF", "ID", "EX", "MEM", "WB"];
const fsmStates = ["IDLE", "RED", "GREEN", "YELLOW"];
</script>

<template>
  <div class="project-diagram" :class="{ 'project-diagram-compact': compact }" :data-project="slug">
    <div class="project-diagram-grid"></div>
    <div class="project-diagram-meta">
      <span>ARCH / {{ slug.toUpperCase() }}</span>
      <span>RTL SIGNAL VIEW</span>
    </div>

    <svg v-if="slug === 'rv32i-cpu'" viewBox="0 0 900 420" role="img" aria-label="RV32I CPU datapath">
      <g class="diagram-wires">
        <path d="M110 210H185M300 210H355M465 210H525M635 210H690M790 210H840" />
        <path d="M410 150V92H585V150M745 265V330H245V265" />
      </g>
      <g v-for="(stage, index) in stages" :key="stage" class="diagram-block">
        <rect :x="index * 170 + 15" y="150" width="120" height="115" rx="8" />
        <text :x="index * 170 + 75" y="196" class="diagram-title">{{ stage }}</text>
        <text :x="index * 170 + 75" y="226">{{ ["PC + IMEM", "CTRL + REG", "ALU", "DATA MEM", "REG WRITE"][index] }}</text>
      </g>
      <text x="497" y="75" class="diagram-label">CONTROL</text>
      <text x="430" y="355" class="diagram-label">WRITE-BACK BUS</text>
    </svg>

    <svg v-else-if="slug === 'soc-cnn'" viewBox="0 0 900 420" role="img" aria-label="RV32I CNN SoC architecture">
      <g class="diagram-wires">
        <path d="M205 210H340M560 210H695" />
        <path d="M450 145V70M450 275V350" />
      </g>
      <g class="diagram-block diagram-block-major">
        <rect x="35" y="140" width="170" height="140" rx="8" />
        <text x="120" y="195" class="diagram-title">RV32I</text>
        <text x="120" y="228">CPU CORE</text>
      </g>
      <g class="diagram-block diagram-block-accent">
        <rect x="340" y="145" width="220" height="130" rx="8" />
        <text x="450" y="197" class="diagram-title">MMIO</text>
        <text x="450" y="230">SYSTEM BUS</text>
      </g>
      <g class="diagram-block diagram-block-major">
        <rect x="695" y="140" width="170" height="140" rx="8" />
        <text x="780" y="195" class="diagram-title">CNN</text>
        <text x="780" y="228">ACCELERATOR</text>
      </g>
      <g class="diagram-block">
        <rect x="370" y="25" width="160" height="70" rx="8" />
        <text x="450" y="69">MEMORY</text>
        <rect x="370" y="325" width="160" height="70" rx="8" />
        <text x="450" y="369">CTRL / STATUS</text>
      </g>
    </svg>

    <svg v-else-if="slug === 'traffic-fsm'" viewBox="0 0 900 420" role="img" aria-label="Traffic light controller state diagram">
      <g class="diagram-wires">
        <path d="M192 210H265M412 210H485M632 210H705" />
        <path d="M775 275C710 370 330 370 120 275" />
      </g>
      <g v-for="(state, index) in fsmStates" :key="state" class="diagram-block" :class="{ 'diagram-block-accent': index === 2 }">
        <rect :x="index * 220 + 45" y="145" width="150" height="130" rx="65" />
        <text :x="index * 220 + 120" y="198" class="diagram-title">{{ state }}</text>
        <text :x="index * 220 + 120" y="230">{{ ["10 TICKS", "5 TICKS", "5 TICKS", "3 TICKS"][index] }}</text>
      </g>
      <text x="450" y="380" class="diagram-label">SYNCHRONOUS LOOP / 1 HZ LAB CLOCK</text>
    </svg>

    <svg v-else-if="slug === 'sipo-8bit'" viewBox="0 0 900 420" role="img" aria-label="Eight-bit SIPO shift register">
      <g class="diagram-wires">
        <path d="M10 220H37M127 220H142M232 220H247M337 220H352M442 220H457M547 220H562M652 220H667M757 220H772M862 220H890" />
        <path d="M82 285V330H817V285" />
      </g>
      <g v-for="index in 8" :key="index" class="diagram-block">
        <rect :x="(index - 1) * 105 + 37" y="165" width="90" height="120" rx="8" />
        <text :x="(index - 1) * 105 + 82" y="218" class="diagram-title">D{{ index - 1 }}</text>
        <text :x="(index - 1) * 105 + 82" y="248">DFF</text>
      </g>
      <text x="450" y="355" class="diagram-label">SHARED CLOCK / PARALLEL Q[7:0]</text>
    </svg>

    <svg v-else-if="slug === 'cla-4bit'" viewBox="0 0 900 420" role="img" aria-label="Four-bit carry lookahead architecture">
      <g class="diagram-wires">
        <path d="M80 120H820M125 120V175M345 120V175M565 120V175M785 120V175" />
        <path d="M125 275V320H785V275" />
      </g>
      <g v-for="index in 4" :key="index" class="diagram-block">
        <rect :x="index * 220 + 50" y="175" width="150" height="100" rx="8" />
        <text :x="index * 220 + 125" y="216" class="diagram-title">G{{ index }} / P{{ index }}</text>
        <text :x="index * 220 + 125" y="246">SUM {{ index }}</text>
      </g>
      <g class="diagram-block diagram-block-accent">
        <rect x="290" y="305" width="320" height="82" rx="8" />
        <text x="450" y="354" class="diagram-title">LOOKAHEAD CARRY NETWORK</text>
      </g>
    </svg>

    <svg v-else viewBox="0 0 900 420" role="img" aria-label="Thirty-two-bit ripple carry architecture">
      <g class="diagram-wires">
        <path d="M55 220H120M230 220H285M395 220H450M560 220H615M725 220H845" />
      </g>
      <g v-for="(label, index) in ['FA 00', 'FA 01', 'FA 02', 'FA 30', 'FA 31']" :key="label" class="diagram-block">
        <rect :x="index * 165 + 120" y="165" width="110" height="110" rx="8" />
        <text :x="index * 165 + 175" y="214" class="diagram-title">{{ label }}</text>
        <text :x="index * 165 + 175" y="245">A + B + C</text>
      </g>
      <text x="478" y="330" class="diagram-label">CARRY PROPAGATION / CIN → COUT</text>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.project-diagram {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 8.25;
  min-height: 260px;
  overflow: hidden;
  border: 1px solid var(--color-grayscale-500);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 50% 55%, rgba(67, 74, 132, 0.23), transparent 42%),
    #050507;
  color: #c8cbf8;

  &-grid {
    position: absolute;
    inset: 0;
    opacity: 0.16;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: linear-gradient(to bottom, black, transparent 92%);
  }

  &-meta {
    position: absolute;
    z-index: 2;
    inset: 12px 14px auto;
    display: flex;
    justify-content: space-between;
    color: #808080;
    font: 700 9px/1.5 "Urbanist", sans-serif;
    letter-spacing: 0.14em;
  }

  svg {
    position: absolute;
    inset: 6% 2% 0;
    width: 96%;
    height: 94%;
  }

  :deep(.diagram-wires) {
    fill: none;
    stroke: #6c72ad;
    stroke-width: 2;
    stroke-dasharray: 7 7;
    animation: signal-flow 10s linear infinite;
  }

  :deep(.diagram-block rect) {
    fill: rgba(5, 5, 8, 0.78);
    stroke: #535775;
    stroke-width: 2;
  }

  :deep(.diagram-block-major rect) {
    fill: rgba(52, 55, 85, 0.35);
  }

  :deep(.diagram-block-accent rect) {
    fill: rgba(83, 89, 144, 0.38);
    stroke: #9097e3;
  }

  :deep(text) {
    fill: #8f92a8;
    font: 700 14px "ProFontWindows", monospace;
    text-anchor: middle;
    letter-spacing: 0.04em;
  }

  :deep(.diagram-title) {
    fill: #f4f4ff;
    font-size: 19px;
  }

  :deep(.diagram-label) {
    fill: #6f728a;
    font-size: 13px;
    letter-spacing: 0.12em;
  }

  &-compact {
    min-height: 0;

    .project-diagram-meta {
      inset: 9px 10px auto;
      font-size: 7px;
    }
  }
}

@keyframes signal-flow {
  to {
    stroke-dashoffset: -140;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-diagram :deep(.diagram-wires) {
    animation: none;
  }
}
</style>
