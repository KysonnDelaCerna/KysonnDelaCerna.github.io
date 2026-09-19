<template>
  <Card class="image-card">
    <img
      :src="src"
      :alt="alt"
      width="150"
      height="150"
    />
  </Card>
</template>

<script lang="ts">
import Card from "./Card.vue";

export default {
  name: "RepositoryCard", 
  props: [
    "src",
    "alt"
  ],
  components: { Card },
};
</script>

<style scoped>
@reference "tailwindcss";

.image-card {
  @apply flex items-center justify-center;
}
</style>
