<template>
  <div>
    <h1 class="showcase-title">
      {{ title }}
    </h1>

    <div v-if="!projects">
      <h2 class="showcase-subtitle">Can't get Github repositories</h2>
    </div>

    <div v-if="projects.length === 0">
      <h2 class="showcase-subtitle">Loading Github repositories</h2>
    </div>

    <div v-else class="showcase-container">
      <Card
        class="my-4"
        :link="project.html_url"
        :name="project.name"
        :desc="project.description"
        :lang="project.language"
        v-for="(project, index) in projects"
        :key="`${project.name}-${index}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Card from "./Card.vue";

export default {
  name: "Showcase",
  components: { Card },
  props: ["title", "projects"],
};
</script>

<style scoped lang="postcss">
.showcase-title {
  @apply text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10;
}

.showcase-subtitle {
  @apply text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg;
}

.showcase-container {
  @apply flex flex-row flex-wrap justify-evenly content-evenly md:px-8;
}
</style>
