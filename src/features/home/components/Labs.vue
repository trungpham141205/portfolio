<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

type Operation = "AND" | "OR" | "XOR" | "ADD";
type Lab = "alu" | "fsm";
type View = "logic" | "source";

const activeLab = ref<Lab>("alu");
const activeView = ref<View>("logic");
const operations: Operation[] = ["AND", "OR", "XOR", "ADD"];
const bitsA = ref([1, 0, 1, 0]);
const bitsB = ref([1, 1, 0, 0]);
const operation = ref<Operation>("AND");

const toValue = (bits: number[]) => bits.reduce((value, bit, index) => value | (bit << index), 0);
const valueA = computed(() => toValue(bitsA.value));
const valueB = computed(() => toValue(bitsB.value));
const result = computed(() => {
  if (operation.value === "AND") return valueA.value & valueB.value;
  if (operation.value === "OR") return valueA.value | valueB.value;
  if (operation.value === "XOR") return valueA.value ^ valueB.value;
  return valueA.value + valueB.value;
});
const outputBits = computed(() => [4, 3, 2, 1, 0].map((bit) => (result.value >> bit) & 1));

const toggleBit = (target: "a" | "b", index: number) => {
  const bits = target === "a" ? bitsA.value : bitsB.value;
  bits[index] = bits[index] ? 0 : 1;
};

const states = [
  { name: "IDLE", limit: 10, light: "red" },
  { name: "RED", limit: 5, light: "red" },
  { name: "GREEN", limit: 5, light: "green" },
  { name: "YELLOW", limit: 3, light: "yellow" },
] as const;
const stateIndex = ref(0);
const counter = ref(0);
const running = ref(true);
const currentState = computed(() => states[stateIndex.value]!);

const advanceFsm = () => {
  if (!running.value) return;
  counter.value += 1;
  if (counter.value < currentState.value.limit) return;
  counter.value = 0;
  stateIndex.value = stateIndex.value === 3 ? 1 : stateIndex.value + 1;
};

const timer = window.setInterval(advanceFsm, 1000);
onUnmounted(() => window.clearInterval(timer));

const resetFsm = () => {
  stateIndex.value = 0;
  counter.value = 0;
  running.value = true;
};

const switchLab = (lab: Lab) => {
  activeLab.value = lab;
  activeView.value = "logic";
};

const aluCode = `module alu_4bit (
    input  [3:0] a,
    input  [3:0] b,
    input  [1:0] alu_sel,
    output reg [3:0] result,
    output reg       carry_out
);
    wire [4:0] add_res;
    assign add_res = a + b;

    always @(*) begin
        result    = 4'b0000;
        carry_out = 1'b0;
        case (alu_sel)
            2'b00: result = a & b;
            2'b01: result = a | b;
            2'b10: result = a ^ b;
            2'b11: begin
                result    = add_res[3:0];
                carry_out = add_res[4];
            end
        endcase
    end
endmodule`;

const fsmCode = `module traffic_controller (
    input  logic clk, rstn,
    output logic red, yellow, green
);
    typedef enum logic [1:0] {
        IDLE, RED, GREEN, YELLOW
    } state_t;

    state_t state, next_state;
    logic [3:0] counter;

    always_ff @(posedge clk or negedge rstn)
        if (!rstn) begin
            state   <= IDLE;
            counter <= 0;
        end else begin
            state   <= next_state;
            counter <= (state != next_state)
                ? 0 : counter + 1;
        end

    always_comb begin
        next_state = state;
        case (state)
            IDLE:   if (counter > 9) next_state = RED;
            RED:    if (counter > 4) next_state = GREEN;
            GREEN:  if (counter > 4) next_state = YELLOW;
            YELLOW: if (counter > 2) next_state = RED;
        endcase
    end

    assign red    = (state == IDLE) || (state == RED);
    assign green  = (state == GREEN);
    assign yellow = (state == YELLOW);
endmodule`;
</script>

<template>
  <section class="labs">
    <div class="labs-shell grid">
      <header class="labs-header">
        <div>
          <p class="labs-eyebrow">03 / DIGITAL LAB</p>
          <h2>Touch the logic.<br />Watch it respond.</h2>
        </div>
        <p class="labs-intro">
          Two browser simulations preserve the original HDL behavior while exposing signal state, timing and source
          side by side.
        </p>
      </header>

      <nav class="labs-selector" role="tablist" aria-label="Choose digital logic lab">
        <button
          v-for="lab in [{ id: 'alu', name: '4-bit ALU', code: 'LAB / 01' }, { id: 'fsm', name: 'Traffic FSM', code: 'LAB / 02' }]"
          :key="lab.id"
          role="tab"
          :aria-selected="activeLab === lab.id"
          :class="{ active: activeLab === lab.id }"
          @click="switchLab(lab.id as Lab)"
        >
          <span>{{ lab.code }}</span>
          {{ lab.name }}
        </button>
      </nav>

      <div class="labs-bench">
        <div class="labs-bench-topline">
          <span><i></i> SIMULATION ACTIVE</span>
          <div class="labs-view-switch" role="tablist" aria-label="Lab view">
            <button :class="{ active: activeView === 'logic' }" @click="activeView = 'logic'">LOGIC</button>
            <button :class="{ active: activeView === 'source' }" @click="activeView = 'source'">SOURCE</button>
          </div>
        </div>

        <template v-if="activeLab === 'alu'">
          <div v-if="activeView === 'logic'" class="alu-panel">
            <div class="alu-inputs">
              <div v-for="(bits, group) in { a: bitsA, b: bitsB }" :key="group" class="bit-bank">
                <div class="bit-bank-title">
                  <span>INPUT {{ String(group).toUpperCase() }} [3:0]</span>
                  <strong>DEC / {{ group === "a" ? valueA : valueB }}</strong>
                </div>
                <div class="bit-switches">
                  <label v-for="bit in [3, 2, 1, 0]" :key="bit">
                    <button
                      role="switch"
                      :aria-checked="Boolean(bits[bit])"
                      :class="{ on: bits[bit] }"
                      :aria-label="`Toggle ${group} bit ${bit}`"
                      @click="toggleBit(group as 'a' | 'b', bit)"
                    >
                      <i></i>
                    </button>
                    <span>{{ String(group).toUpperCase() }}{{ bit }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="alu-core">
              <div class="alu-core-symbol">
                <span>A</span><span>B</span>
                <strong>ALU</strong>
                <small>4-BIT</small>
              </div>
              <div class="alu-operations" role="radiogroup" aria-label="ALU operation">
                <button
                  v-for="op in operations"
                  :key="op"
                  role="radio"
                  :aria-checked="operation === op"
                  :class="{ active: operation === op }"
                  @click="operation = op"
                >
                  {{ op }}
                </button>
              </div>
            </div>

            <div class="alu-output">
              <div class="alu-output-leds" role="status" :aria-label="`ALU result ${result}`">
                <div v-for="(bit, index) in outputBits" :key="index">
                  <i :class="{ on: bit }"></i>
                  <span>{{ index === 0 ? "COUT" : `O${4 - index}` }}</span>
                </div>
              </div>
              <div class="alu-output-value">
                <span>BIN / {{ outputBits.join("") }}</span>
                <strong>DEC / {{ result }}</strong>
              </div>
            </div>
          </div>
          <pre v-else class="source-panel"><code>{{ aluCode }}</code></pre>
        </template>

        <template v-else>
          <div v-if="activeView === 'logic'" class="fsm-panel">
            <div class="traffic-column">
              <div class="traffic-light" :aria-label="`Traffic light is ${currentState.light}`" role="status">
                <i v-for="color in ['red', 'yellow', 'green']" :key="color" :class="[color, { on: currentState.light === color }]"></i>
              </div>
              <span class="clock-pulse"><i></i> CLK / 1 HZ</span>
            </div>

            <div class="fsm-flow">
              <div class="fsm-states">
                <div v-for="(state, index) in states" :key="state.name" :class="{ active: stateIndex === index }">
                  <span>0{{ index }}</span>
                  <strong>{{ state.name }}</strong>
                  <small>{{ state.limit }} TICKS</small>
                </div>
              </div>
              <div class="fsm-readout">
                <p><span>STATE REG</span><strong>{{ currentState.name }}</strong></p>
                <p><span>COUNTER</span><strong>{{ String(counter).padStart(2, "0") }}</strong></p>
                <div>
                  <button @click="running = !running">{{ running ? "PAUSE CLK" : "RUN CLK" }}</button>
                  <button @click="resetFsm">RSTN</button>
                </div>
              </div>
            </div>
          </div>
          <pre v-else class="source-panel"><code>{{ fsmCode }}</code></pre>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.labs {
  position: relative;
  padding: 120px var(--space-outer);
  background:
    radial-gradient(circle at 70% 40%, rgba(52, 55, 85, 0.24), transparent 30%),
    #050505;
  border-top: 1px solid var(--color-grayscale-500);
  border-bottom: 1px solid var(--color-grayscale-500);
  color: #ffffff;

  @include mixins.mq("md") {
    padding-top: 160px;
    padding-bottom: 160px;
  }

  &-shell {
    row-gap: var(--space-xl);
  }

  &-header {
    grid-column: 1 / 13;
    display: grid;
    gap: var(--space-lg);

    @include mixins.mq("md") {
      grid-template-columns: 1fr 0.7fr;
      align-items: end;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }

    h2 {
      font-size: clamp(44px, 7vw, 94px);
      line-height: 0.92;
      letter-spacing: -0.045em;
      text-transform: uppercase;
    }
  }

  &-eyebrow {
    color: #8b8fac;
    font: 700 10px/1.5 "Urbanist", sans-serif;
    letter-spacing: 0.17em;
    margin-bottom: 12px;
  }

  &-intro {
    color: var(--color-gray-400);
    font-size: clamp(16px, 1.5vw, 21px);
    line-height: 1.45;
    max-width: 560px;
  }

  &-selector {
    grid-column: 1 / 13;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }

    button {
      min-width: 150px;
      padding: 11px 14px;
      border: 1px solid var(--color-grayscale-500);
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.025);
      color: #999;
      text-align: left;
      font-size: 13px;
      font-weight: 700;

      span {
        display: block;
        color: #666;
        font-size: 8px;
        letter-spacing: 0.14em;
        margin-bottom: 3px;
      }

      &.active {
        background: #343755;
        border-color: #686d9f;
        color: #fff;
      }
    }
  }

  &-bench {
    grid-column: 1 / 13;
    min-height: 610px;
    border: 1px solid var(--color-grayscale-500);
    border-radius: 12px;
    background:
      linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      rgba(0, 0, 0, 0.68);
    background-size: 28px 28px;
    overflow: hidden;

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }

    &-topline {
      min-height: 52px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--color-grayscale-500);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #808080;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;

      > span {
        display: flex;
        align-items: center;
        gap: 7px;

        i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8ef5bd;
          box-shadow: 0 0 12px #8ef5bd;
        }
      }
    }
  }

  &-view-switch {
    display: flex;
    gap: 3px;

    button {
      padding: 6px 9px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: #777;
      font-size: 9px;
      font-weight: 700;

      &.active {
        color: #fff;
        background: #343755;
      }
    }
  }
}

.alu-panel {
  min-height: 557px;
  display: grid;
  grid-template-columns: 1fr;

  @include mixins.mq("md") {
    grid-template-columns: 1fr 0.9fr 1fr;
  }
}

.alu-inputs,
.alu-core,
.alu-output {
  padding: clamp(22px, 3vw, 42px);
}

.alu-inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  border-right: 1px solid var(--color-grayscale-500);
}

.bit-bank-title {
  display: flex;
  justify-content: space-between;
  color: #777;
  font: 700 9px/1.4 "Urbanist", sans-serif;
  letter-spacing: 0.1em;
  margin-bottom: 16px;

  strong {
    color: #c7c9dd;
  }
}

.bit-switches {
  display: flex;
  gap: clamp(10px, 1.6vw, 18px);

  label {
    display: grid;
    justify-items: center;
    gap: 7px;
    color: #666;
    font: 700 8px/1 "Urbanist", sans-serif;
  }

  button {
    width: 34px;
    height: 56px;
    padding: 4px;
    border: 1px solid #525252;
    border-radius: 5px;
    background: #111;
    display: flex;
    align-items: flex-end;

    i {
      width: 100%;
      height: 22px;
      border-radius: 3px;
      background: #454545;
      transition: all 0.2s ease;
    }

    &.on {
      align-items: flex-start;
      border-color: #777da9;
      box-shadow: inset 0 0 16px rgba(93, 99, 157, 0.28);

      i {
        background: #bfc3f5;
        box-shadow: 0 0 14px rgba(191, 195, 245, 0.45);
      }
    }
  }
}

.alu-core {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 30px;
  border-right: 1px solid var(--color-grayscale-500);
}

.alu-core-symbol {
  width: min(210px, 80%);
  aspect-ratio: 1.1;
  clip-path: polygon(0 0, 100% 18%, 78% 100%, 22% 100%);
  background: #343755;
  display: grid;
  place-items: center;
  align-content: center;
  position: relative;

  strong {
    font-size: 34px;
    letter-spacing: 0.08em;
  }

  small {
    color: #9b9fca;
    font-size: 9px;
    letter-spacing: 0.15em;
  }

  > span {
    position: absolute;
    top: 12%;
    font-size: 10px;
    color: #999dca;

    &:first-child { left: 25%; }
    &:nth-child(2) { right: 25%; }
  }
}

.alu-operations {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;

  button {
    border: 1px solid #4d4d4d;
    border-radius: 500px;
    padding: 6px 10px;
    background: #050505;
    color: #777;
    font-size: 9px;
    font-weight: 700;

    &.active {
      background: #fff;
      color: #000;
      border-color: #fff;
    }
  }
}

.alu-output {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 42px;
}

.alu-output-leds {
  display: flex;
  justify-content: center;
  gap: clamp(13px, 2vw, 24px);

  > div {
    display: grid;
    justify-items: center;
    gap: 9px;
    color: #666;
    font: 700 8px/1 "Urbanist", sans-serif;
  }

  i {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #1d2028;
    border: 1px solid #454957;

    &.on {
      background: #c2c7ff;
      border-color: #e7e9ff;
      box-shadow: 0 0 22px rgba(183, 190, 255, 0.82);
    }
  }
}

.alu-output-value {
  padding: 18px;
  border: 1px solid #383b51;
  border-radius: 5px;
  background: rgba(52, 55, 85, 0.22);
  color: #777b98;
  font: 700 11px/1.4 "ProFontWindows", monospace;
  display: flex;
  justify-content: space-between;

  strong {
    color: #e8e9ff;
  }
}

.fsm-panel {
  min-height: 557px;
  display: grid;
  grid-template-columns: 220px 1fr;
}

.traffic-column {
  border-right: 1px solid var(--color-grayscale-500);
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  gap: 22px;
}

.traffic-light {
  padding: 18px;
  border: 1px solid #4d4d4d;
  border-radius: 52px;
  background: #0a0a0a;
  display: grid;
  gap: 12px;

  i {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #151515;
    border: 1px solid #333;

    &.red.on { background: #ff5364; box-shadow: 0 0 35px rgba(255, 83, 100, 0.75); }
    &.yellow.on { background: #ffd45c; box-shadow: 0 0 35px rgba(255, 212, 92, 0.75); }
    &.green.on { background: #65ee9a; box-shadow: 0 0 35px rgba(101, 238, 154, 0.75); }
  }
}

.clock-pulse {
  color: #777;
  font: 700 9px/1 "Urbanist", sans-serif;
  letter-spacing: 0.12em;
  display: flex;
  align-items: center;
  gap: 7px;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: clock 1s steps(1) infinite;
  }
}

.fsm-flow {
  padding: clamp(24px, 4vw, 52px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 48px;
}

.fsm-states {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  > div {
    min-height: 130px;
    padding: 16px 12px;
    border: 1px solid #3d3d3d;
    border-radius: 8px;
    display: grid;
    align-content: center;
    text-align: center;
    color: #666;
    position: relative;

    &:not(:last-child)::after {
      content: "→";
      position: absolute;
      right: -13px;
      top: 50%;
      z-index: 2;
      color: #666;
      transform: translateY(-50%);
    }

    span, small {
      font: 700 8px/1.4 "Urbanist", sans-serif;
      letter-spacing: 0.12em;
    }

    strong {
      margin: 7px 0;
      color: #aaa;
      font-size: clamp(12px, 1.5vw, 18px);
    }

    &.active {
      border-color: #8d93cb;
      background: rgba(52, 55, 85, 0.5);
      box-shadow: 0 0 34px rgba(63, 69, 119, 0.2);

      strong { color: #fff; }
    }
  }
}

.fsm-readout {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  overflow: hidden;

  p {
    padding: 16px;
    display: grid;
    gap: 4px;
    border-right: 1px solid #3d3d3d;
    font-family: "Urbanist", sans-serif;

    span {
      color: #666;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    strong {
      color: #e7e9ff;
      font: 700 19px/1 "ProFontWindows", monospace;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
  }

  button {
    border: 1px solid #555;
    border-radius: 4px;
    background: transparent;
    color: #aaa;
    padding: 8px 10px;
    font-size: 8px;
    font-weight: 700;
  }
}

.source-panel {
  min-height: 557px;
  margin: 0;
  padding: clamp(20px, 4vw, 48px);
  overflow: auto;
  color: #d6d8f5;
  background: rgba(0, 0, 0, 0.54);
  font: 14px/1.65 "ProFontWindows", monospace;
  tab-size: 4;
}

@keyframes clock {
  50% { opacity: 0.15; }
}

@media (max-width: 839px) {
  .alu-inputs,
  .alu-core {
    border-right: 0;
    border-bottom: 1px solid var(--color-grayscale-500);
  }

  .fsm-panel {
    grid-template-columns: 1fr;
  }

  .traffic-column {
    padding: 28px;
    border-right: 0;
    border-bottom: 1px solid var(--color-grayscale-500);
  }

  .fsm-states {
    grid-template-columns: repeat(2, 1fr);
  }

  .fsm-readout {
    grid-template-columns: 1fr 1fr;

    > div {
      grid-column: 1 / -1;
      border-top: 1px solid #3d3d3d;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .clock-pulse i {
    animation: none;
  }
}
</style>
