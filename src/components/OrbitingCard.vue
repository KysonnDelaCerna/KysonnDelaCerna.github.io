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
  props: [
    "link",
    "name",
    "desc",
    "lang",
    "radius",
    "index",
    "total"
  ],
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
  top: 0;
  left: 0;
  width: 158px;
  height: 210px;
  margin-left: -79px;
  margin-top: -105px;
  transition: transform 0.7s var(--ease);
  cursor: pointer;
}
</style>
