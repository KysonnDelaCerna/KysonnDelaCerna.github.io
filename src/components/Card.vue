<template>
    <div class="card">
      <a target="_blank" :href="link" class="transform-3d">
        <div class="card-front">
            <h1 class="card-title">
              {{ name }}
            </h1>
            <h2 class="card-description">
              {{ desc }}
            </h2>
            <i class="card-icon" :class="langClass"></i>
        </div>
      </a>
      <div class="card-back">
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "Card",
  props: [
    "link",
    "name",
    "desc",
    "lang"
  ],
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

.card {
  @apply rounded-md drop-shadow-lg overflow-hidden z-0;
  width: 400px;
  height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  transform-style: preserve-3d;
}

.card-front, .card-back {
  @apply absolute top-0 left-0 w-full h-full backface-hidden;
}

.card-front {
  @apply bg-slate-800 p-6;
}

.card-back {
  @apply bg-black rotate-y-180;
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
</style>
