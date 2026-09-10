<template>
  <div class="pb-16">
    <h1 class="showcase-title">
      {{ title }}
    </h1>

    <div
      v-for="(page, index) in paginatedProjects"
      class="w-screen h-screen relative"
      :key="`${title}-${index}`"
    >
      <OrbitingRing
        :projects="page.projects"
        :reduceMotion="false"
        :ringRadius="360"
        :spacingLevel="1.58"
        :shiftX="page.shiftX"
        :baseDrift="page.baseDrift"
      />
    </div>
  </div>
</template>

<script lang="ts">
import OrbitingRing from "./OrbitingRing.vue";

export default {
  name: "Showcase",
  components: { OrbitingRing },
  props: ["title", "projects"],
  data() {
    return {
      pageSize: 8,
      baseDrift: 0.12,
      maxShiftX: -25
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
          shiftX: singlePage
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
  unmounted() {
  }
};
</script>

<style scoped>
@reference "tailwindcss";

.showcase-title {
  @apply text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10;
}

.showcase-subtitle {
  @apply text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg;
}
</style>
