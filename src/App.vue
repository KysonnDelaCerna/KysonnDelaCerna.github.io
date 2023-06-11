<template>
  <div class="bg-indigo-900 h-full relative">
    <div
      class="absolute flex flex-col items-center justify-center w-full h-full z-20 p-8"
    >
      <h1
        id="title"
        class="text-white text-center font-bold text-7xl md:text-8git-xl lg:text-9xl"
      >
        {{ title }}
      </h1>
      <h2
        id="subtitle"
        class="text-white text-center font-semibold text-3xl lg:text-4xl pt-4"
      >
        {{ subtitle }}
      </h2>
    </div>
    <div
      class="absolute bg-gradient-to-b from-purple-900 via-transparent to-gray-900 z-10 w-full h-full"
    ></div>
  </div>
  <Repositories />
  <div class="bg-gradient-to-b from-gray-900 to-black h-full relative">
    <div
      class="absolute flex flex-col items-center justify-center w-full h-full p-8"
    >
      <h1
        class="text-white text-center font-bold text-5xl lg:text-6xl pt-4 lg:pt-10"
      >
        Contact
      </h1>
      <h2
        class="text-white text-center font-semibold text-3xl lg:text-4xl pt-4 pb-6"
      >
        Want to work together? Send me an email.
      </h2>
      <a href="mailto:kysonndelacerna@gmail.com">
        <button
          class="rounded-md text-white font-semibold text-3xl lg:text-4xl py-3 px-10 md:py-5 md:px-20 border-2 mt-6"
        >
          Email Me
        </button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Repositories from "./components/Repositories.vue";

export default {
  components: {
    Repositories,
  },
  data() {
    return {
      title: "\xa0",
      subtitle: "\xa0",
      titleText: `<Kysonn Dela Cerna/>`,
      subtitleText: `Computer Scientist`,
    };
  },
  async mounted() {
    for (let i = 0; i < this.titleText.length; i++) {
      this.title = this.titleText.slice(0, i + 1);
      await new Promise((r) =>
        setTimeout(r, 50 + Math.floor(Math.random() * 50))
      );
    }

    await new Promise((r) =>
      setTimeout(r, 500 + Math.floor(Math.random() * 200))
    );

    for (let i = 0; i < this.subtitleText.length; i++) {
      this.subtitle = this.subtitleText.slice(0, i + 1);
      await new Promise((r) =>
        setTimeout(r, 50 + Math.floor(Math.random() * 50))
      );
    }
  },
};
</script>
