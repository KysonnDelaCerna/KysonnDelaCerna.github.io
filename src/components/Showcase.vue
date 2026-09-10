<template>
  <div>
    <h1 class="showcase-title">
      {{ title }}
    </h1>

    <div class="w-screen h-screen">
      <OrbitingRing
        :projects="projects"
        :reduceMotion="false"
        :ringRadius="360"
        :spacingLevel="2.08"
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
  },
  mounted() {
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
