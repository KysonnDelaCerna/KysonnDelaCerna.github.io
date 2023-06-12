<template>
  <div>
    <h1
      class="text-white text-center font-bold text-5xl lg:text-6xl py-8 lg:py-10 filter drop-shadow-lg relative z-10"
    >
      {{ title }}
    </h1>

    <div v-if="!projects">
      <h2
        class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg"
      >
        Can't get Github repositories
      </h2>
    </div>

    <div v-if="projects.length === 0">
      <h2
        class="text-white text-center font-semibold text-3xl lg:text-4xl pb-4 relative z-10 filter drop-shadow-lg"
      >
        Loading Github repositories
      </h2>
    </div>

    <div
      v-else
      class="flex flex-row flex-wrap justify-evenly content-evenly md:px-8"
    >
      <Card
        class="my-4"
        :link="project.html_url"
        :name="project.name"
        :desc="project.description"
        :lang="project.language"
        v-for="(project, index) in projects"
        :key="index"
        @finished="cardFinished"
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
  data() {
    return {
      finishedCards: 0,
    };
  },
  methods: {
    cardFinished() {
      this.finishedCards += 1;

      if (this.finishedCards == this.projects.length) {
        this.$emit("finished");
      }
    },
  },
};
</script>
