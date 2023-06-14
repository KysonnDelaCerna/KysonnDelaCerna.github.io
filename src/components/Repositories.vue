<template>
  <div class="relative bg-gray-900 w-full pb-16">
    <Showcase
      class="showcase"
      title="Github Repositories"
      :projects="repositories"
    />

    <Showcase class="showcase" title="Contributing" :projects="forks" />
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
};
</script>
