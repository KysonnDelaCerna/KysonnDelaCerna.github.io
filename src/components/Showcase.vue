<template>
  <div>
    <h1 class="showcase-title">
      {{ title }}
    </h1>

    <div
      v-for="(page, index) in paginatedProjects"
      class="w-screen relative"
      :key="`${title}-${index}`"
      :style="{ height: `${2 * ringRadius}px` }"
    >
      <OrbitingRing
        :projects="page.projects"
        :reduceMotion="false"
        :ringRadius="ringRadius"
        :spacingLevel="lerp(minimumSpacingevel, maximumSPacingLevel, page.projects.length / pageSize)"
        :shiftX="page.shiftX"
        :baseDrift="page.baseDrift"
        :title="subtitle"
        :page="index + 1"
      />
    </div>

    <div class="pb-32"></div>
  </div>
</template>

<script lang="ts">
import OrbitingRing from "./OrbitingRing.vue";

export default {
  name: "Showcase",
  components: { OrbitingRing },
  props: [
    "title",
    "subtitle",
    "projects"
  ],
  data() {
    return {
      ringRadius: 360,
      minimumSpacingevel: 0.75,
      maximumSPacingLevel: 1.60,
      pageSize: 8,
      baseDrift: 0.12,
      maxShiftX: -25,
      windowWidth: window.innerWidth,
      smallScreenThreshold: 640
    }
  },
  mounted() {
  },
  computed: {
    paginatedProjects() {
      const singlePage = this.projects.length <= this.pageSize;
      const pages = [] as { projects: object[]; shiftX: number; baseDrift: number; }[];
      for (let i = 0; i < this.projects.length / this.pageSize; i++) {
        const slice = this.projects.slice(i * this.pageSize, (i + 1) * this.pageSize);
        pages.push({
          projects: slice,
          shiftX: singlePage || this.windowWidth < this.smallScreenThreshold
            ? 0
            : (i % 2) === 0
              ? this.maxShiftX
              : -this.maxShiftX,
          baseDrift: (i % 2) === 0
            ? this.baseDrift
            : -this.baseDrift
        });
      }
      return pages;
    },
  },
  methods: {
    lerp(start: number, end: number, amt: number) {
      return (1 - amt) * start + amt * end;
    }
  },
  unmounted() {
  }
};
</script>

<style scoped>
@reference "tailwindcss";

.showcase-title {
  @apply text-white text-center font-bold text-5xl lg:text-6xl filter drop-shadow-lg relative z-10;
}
</style>
