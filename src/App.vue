<template>
  <div class="bg-[url(/pictures/bg.jpg)] bg-cover bg-center h-full relative">
    <div class="absolute flex flex-col items-center justify-center w-full h-full z-50 p-8">
      <h1 id="title" class="text-white text-center font-bold text-7xl md:text-8git-xl lg:text-9xl">
        {{ title }}
      </h1>
      <h2 id="subtitle" class="text-white text-center font-semibold text-3xl lg:text-4xl pt-4">
        {{ subtitle }}
      </h2>
    </div>
    <div id="galaxy-perlin">
    </div>
    <div class="mix-blend-hue absolute bg-gradient-to-b from-purple-900 via-transparent to-indigo-900 z-20 w-full h-full">
    </div>
    <div class="absolute bg-gradient-to-b from-transparent via-transparent to-gray-900 z-30 w-full h-full">
    </div>
  </div>
  <div class="relative z-50">
    <Repositories />
    <div class="bg-gradient-to-b from-gray-900 to-black h-screen relative">
      <div class="flex flex-col items-center justify-center w-screen h-screen p-8">
        <h1 class="text-white text-center font-bold text-5xl lg:text-6xl pt-4 lg:pt-10" >
          Contact
        </h1>
        <h2 class="text-white text-center font-semibold text-3xl lg:text-4xl pt-4 pb-6" >
          Want to work together? Send me an email.
        </h2>
        <a href="mailto:kysonndelacerna@gmail.com">
          <button class="rounded-md text-white font-semibold text-3xl lg:text-4xl py-3 px-10 md:py-5 md:px-20 border-2 mt-6">
            Email Me
          </button>
        </a>
      </div>
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
