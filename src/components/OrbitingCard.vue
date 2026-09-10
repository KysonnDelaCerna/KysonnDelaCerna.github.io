<template>
  <Card 
    class="absolute panel"
    :link="link"
    :name="name"
    :desc="desc"
    :lang="lang"
    :style="style"
  />
</template>

<script lang="ts">
import Card from "./Card.vue";

export default {
  name: "OrbitingCard",
  props: ["link", "name", "desc", "lang", "radius", "index", "total"],
  components: { Card },
  data() {
    return {
      angle: 0,
      tilt: 0,
      ry: "0deg",
      tz: "0px",
      rz: "0deg"
    }
  },
  mounted() {
    this.positionPanel();
  },
  methods: {
    positionPanel() {
      this.angle = (360 / this.total) * this.index;
      this.tilt = Math.sin((this.index / this.total) * Math.PI * 2) * 8;
      this.ry = `${this.angle}deg`;
      this.tz = `${this.radius}px`;
      this.rz = `${this.tilt.toFixed(2)}deg`;
    }
  },
  computed: {
    style() {
      return {
        transform: `rotateY(${this.ry}) translateZ(${this.tz}) rotateZ(${this.rz}) scale(1)`
      };
    }
  }
};
</script>

<style scoped>
.panel {
  position: absolute;
  top: 0; left: 0;
  width: 158px;
  height: 210px;
  margin-left: -79px;
  margin-top: -105px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: inset 0 0 34px rgba(139, 92, 246, 0.16), 0 0 42px rgba(6, 182, 212, 0.1);
  transition: transform 0.7s var(--ease), box-shadow 0.7s var(--ease);
  cursor: pointer;
}
/* 1px gradient border via masked pseudo element */
.panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: background 0.7s var(--ease), opacity 0.7s var(--ease);
}
.panel:hover {
  --s: 1.1;
  box-shadow: inset 0 0 44px rgba(139, 92, 246, 0.3), 0 0 60px rgba(6, 182, 212, 0.4);
}
.panel:hover::after {
  background: linear-gradient(to bottom right, rgba(139, 92, 246, 0.95), rgba(6, 182, 212, 0.7));
}
</style>
