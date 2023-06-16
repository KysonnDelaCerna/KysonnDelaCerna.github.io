<template>
  <a :href="link" target="_blank">
    <div class="card">
      <div class="card-bg"></div>

      <h1 class="card-title">
        {{ name }}
      </h1>
      <h2 class="card-description">
        {{ desc }}
      </h2>
      <i class="card-icon" :class="langClass"></i>
    </div>
  </a>
</template>

<script lang="ts">
export default {
  name: "Card",
  props: ["link", "name", "desc", "lang"],
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

<style scoped lang="postcss">
.card {
  @apply w-80 h-64 md:w-96 md:h-72 bg-slate-800 p-6 rounded-md drop-shadow-lg overflow-hidden z-0;
}

.card-bg {
  @apply h-32 w-32 absolute bg-orange-500 -top-12 -right-16 z-10 rounded-full transition ease-in-out duration-300;
}

.card:hover .card-bg {
  @apply scale-750 bg-orange-700;
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
