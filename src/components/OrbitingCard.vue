<template>
  <div class="panel" :style="rotationStyle">
    <RepositoryCard 
      class="card-front"
      :link="link"
      :name="name"
      :desc="desc"
      :lang="lang"
    />
    <ImageCard
      class="card-back bg-black"
      :src="'./pictures/github-white-icon.webp'"
    />
  </div>
</template>

<script lang="ts">
import RepositoryCard from "./RepositoryCard.vue";
import ImageCard from "./ImageCard.vue";

export default {
  name: "OrbitingCard",
  props: [
    "link",
    "name",
    "desc",
    "lang",
    "radius",
    "index",
    "total",
  ],
  components: {
    RepositoryCard,
    ImageCard,
  },
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
    rotationStyle() {
      return {
        transform: `rotateY(${this.angle}deg) translateZ(${this.radius}px) rotateZ(${this.tilt}deg) scale(1)`
      };
    },
  }
};
</script>

<style scoped>
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  transition: transform 0.7s var(--ease);
  transform-style: preserve-3d;
}

.card-front, .card-back {
  position: absolute;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
