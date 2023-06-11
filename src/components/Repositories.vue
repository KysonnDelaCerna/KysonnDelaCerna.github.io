<template>
  <div class="relative bg-gray-900 w-full pb-16">
    <Showcase
      class="showcase"
      title="Github Repositories"
      :projects="repositories"
      :perRow="perRow"
      @finished="showcaseFinished"
    />

    <Showcase
      class="showcase"
      title="Contributing"
      :projects="forks"
      :perRow="perRow"
      @finished="showcaseFinished"
    />
  </div>
</template>

<script lang="ts">
import { IRepository } from "../interfaces/repository";
import Showcase from "./Showcase.vue";

export default {
  name: "Repositories",
  components: {
    Showcase,
  },
  data() {
    return {
      repositories: [] as IRepository[] | null,
      forks: [] as IRepository[] | null,
      finishedShowcases: 0,
      windowWidth: 0,
    };
  },
  mounted() {
    this.axios
      .get("https://api.github.com/users/KysonnDelaCerna/repos")
      .then(({ data }) => {
        data.forEach((repo: IRepository) => {
          if (repo.fork) {
            if (this.forks) {
              this.forks.push(repo);
            }
          } else {
            if (this.repositories) {
              this.repositories.push(repo);
            }
          }
        });
      })
      .catch(() => {
        this.repositories = null;
        this.forks = null;
      });
  },
  created() {
    window.addEventListener("resize", this.updateWindowSize);
    this.updateWindowSize();
  },
  destroyed() {
    window.removeEventListener("resize", this.updateWindowSize);
  },
  computed: {
    perRow() {
      if (this.windowWidth >= 768) {
        return Math.floor((this.windowWidth - 32 * 2) / 384);
      } else {
        return Math.floor(this.windowWidth / 320);
      }
    },
  },
  methods: {
    showcaseFinished() {
      this.finishedShowcases += 1;

      if (this.finishedShowcases == 2) {
        this.observe();
      }
    },
    updateWindowSize() {
      this.windowWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    },
    observe() {
      const obeserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      });

      const animate = document.querySelectorAll(".animate");
      animate.forEach((element) => obeserver.observe(element));
    },
  },
};
</script>
