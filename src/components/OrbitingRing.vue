<template>
  <div
    class="stage"
    @pointerdown="stagePointerDown"
    @mousemove="stageMouseMove"
    @pointermove="stagePointerMove"
    @pointerup="stagePointerUp"
    @pointercancel="stagePointerCancel"
    @pointerleave="stagePointerLeave"
    @wheel="stageWheel"
    :class="{ dragging }"
  >
    <div
      class="parallax"
      :style="{ transform: `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) translateX(${shiftX * ringRadius / 100}px)` }"
    >
      <div
        class="ring-tilt"
      >
        <div
          class="ring"
          :style="{ transform: `rotateY(${rotation.toFixed(3)}deg)` }"
        >
          <OrbitingCard
            v-for="(project, index) in projects"
            :link="project.html_url"
            :name="project.name"
            :desc="project.description"
            :lang="project.language"
            :radius="effectiveRadius"
            :index="index"
            :total="projects.length"
            :key="`${project.name}-${index}`"
          />
        </div>
      </div>
      <div class="hero-text">
        <div><p class="eyebrow text-slate-200 text-lg">{{ title }}</p></div>
        <h1 class="text-slate-100 text-9xl">{{ `${page}`.padStart(2, "0") }}</h1>
        <p class="subtitle text-slate-200 text-xs">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrbitingCard from "./OrbitingCard.vue";

export default {
  name: "OrbitingRing",
  props: [
    "projects",
    "reduceMotion",
    "ringRadius",
    "spacingLevel",
    "shiftX",
    "baseDrift",
    "title",
    "page",
  ],
  components: { OrbitingCard },
  data() {
    return {
      rotation: 0,
      velocity: 0,
      friction: 0.94,
      maxVelocity: 7,
      dragSensitivity: 0.16,
      wheelSensitivity: 0.05,
      dragging: false,
      lastX: 0,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      rangeY: 28,
      rangeX: 30,
      biasX: 10
    }
  },
  mounted() {
    /*

      Tooplate 2167 Orbital

      https://www.tooplate.com/view/2167-orbital

      Free HTML CSS Template

    */
    this.frame();
  },
  methods: {
    clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    },
    stageMouseMove(e: MouseEvent) {
      if (this.reduceMotion) {
        return;
      }

      const mx = (e.clientX / window.innerWidth) - 0.5;
      const my = (e.clientY / window.innerHeight) - 0.5;
      this.targetY = mx * this.rangeY;
      this.targetX = (-my * this.rangeX) + this.biasX;
    },
    stagePointerDown(e: PointerEvent) {
      this.dragging = true;
      this.lastX = e.clientX;
      this.velocity = 0;
    },
    stagePointerMove(e: PointerEvent) {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      this.lastX = e.clientX;
      const step = dx * this.dragSensitivity;
      this.rotation += step;
      this.velocity = this.clamp(step, -this.maxVelocity, this.maxVelocity);
    },
    endDrag() {
      if (!this.dragging) return;
      this.dragging = false;
    },
    stagePointerUp(_: PointerEvent) {
      this.endDrag();
    },
    stagePointerCancel(_: PointerEvent) {
      this.endDrag();
    },
    stagePointerLeave(_: PointerEvent) {
      this.endDrag();
    },
    stageWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        this.velocity = this.clamp(this.velocity + e.deltaX * this.wheelSensitivity, -this.maxVelocity, this.maxVelocity);
      }
    },
    frame() {
      if (!this.dragging) {
        this.rotation += this.baseDrift + this.velocity;
        this.velocity *= this.friction;
        if (Math.abs(this.velocity) < 0.0015) this.velocity = 0;
      }

      if (!this.reduceMotion) {
        this.currentX += (this.targetX - this.currentX) * 0.06;
        this.currentY += (this.targetY - this.currentY) * 0.06;
      }
      requestAnimationFrame(this.frame);
    }
  },
  computed: {
    effectiveRadius() {
      return this.ringRadius * this.spacingLevel;
    },
    subtitle() {
      return this.projects
        .map((p: { name: string; }) => p.name.toLocaleUpperCase())
        .join(" | ");
    }
  }
};
</script>

<style scoped>
.stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1300px;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.stage.dragging { cursor: grabbing; }
.stage.dragging .panel { cursor: grabbing; }

.parallax {
  position: relative;
  width: 1px; height: 1px;
  transform-style: preserve-3d;
  transition: transform 0.6s var(--ease);
}

.ring-tilt {
  position: absolute;
  top: 0; 
  transform-style: preserve-3d;
  transform: rotateX(var(--tiltX, -20deg)) scale3d(var(--zoom, 1), var(--zoom, 1), var(--zoom, 1));
  transition: transform 0.8s var(--ease);
}
.ring {
  position: absolute;
  top: 0; left: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.hero-text {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) translateZ(40px);
  text-align: center;
  width: 90vw;
  max-width: 760px;
  pointer-events: none;
}
.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 6px;
  text-shadow: 0 0 16px rgba(0, 0, 0);
  margin-bottom: 22px;
}
.hero-text h1 {
  font-weight: 700;
  line-height: 0.94;
  letter-spacing: -0.03em;
  text-shadow: 0 0 38px rgba(0, 0, 0), 0 0 80px rgba(139, 92, 246, 0.32);
}
.subtitle {
  margin-top: 26px;
  letter-spacing: 0.4px;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}
</style>
