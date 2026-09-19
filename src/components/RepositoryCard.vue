<template>
  <a target="_blank" :href="link" draggable="false">
    <Card class="repository-card">
      <h1 class="card-title">
        {{ name }}
      </h1>
      <h2 class="card-description">
        {{ desc }}
      </h2>
      <i class="card-icon" :class="langClass"></i>
    </Card>
  </a>
</template>

<script lang="ts">
import Card from "./Card.vue";

export default {
  name: "RepositoryCard", 
  props: [
    "link",
    "name",
    "desc",
    "lang"
  ],
  components: { Card },
  data() {
    return {
      langClass: "",
    };
  },
  mounted() {
    if (this.lang === "HTML") {
      this.langClass = `devicon-html5-plain`;
    } else if (this.lang === "Vue") {
      this.langClass = `devicon-vuejs-plain`;
    } else {
      this.langClass = `devicon-${this.lang.toLowerCase()}-plain`;
    }
  },
};
</script>

<style scoped>
@reference "tailwindcss";

.repository-card {
  @apply bg-slate-800 p-6;
}

.card-title {
  @apply font-bold text-lg md:text-2xl break-all w-full mb-4 text-slate-200 relative z-20;
}

.card-description {
  @apply font-semibold text-base md:text-xl break-words w-full text-slate-300 relative z-20;
}

.card-icon {
  @apply text-7xl absolute bottom-6 text-slate-300 right-6 transition ease-in-out duration-300 z-20;
}

.card:hover .card-icon {
  @apply text-orange-400;
}
</style>
