<template>
  <a :href="link" target="_blank" class="animate">
    <div
      class="w-80 h-64 md:w-96 md:h-72 bg-white border-t-4 border-solid p-6 relative rounded-lg drop-shadow-lg card border-orange-600 text-orange-600 transition ease-in-out duration-150 hover:border-orange-500 hover:text-orange-500 hover:rotate-3 hover:scale-105 z-10"
    >
      <h1
        class="font-bold text-lg md:text-2xl break-all w-full mb-4 text-slate-800"
      >
        {{ name }}
      </h1>
      <h2
        class="font-semibold text-md md:text-xl break-words w-full text-slate-700"
      >
        {{ desc }}
      </h2>
      <i class="text-7xl absolute bottom-6 right-6" :class="langClass"></i>
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
    } else {
      this.langClass = `devicon-${this.lang.toLowerCase()}-plain`;
    }

    this.$emit("finished");
  },
};
</script>

<style lang="css">
.animate {
  opacity: 0;
  filter: blur(10px);
  transform: translateX(-100%);
  transition: opacity 1.5s, filter 1.5s, transform 1.5s;
  transition-delay: calc(100ms * var(--order));
  transition-timing-function: ease-in-out;
}

.fade-in {
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
}

@media (prefers-reduced-motion) {
  .animate {
    transition: none;
  }
}
</style>
