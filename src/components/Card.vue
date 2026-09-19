<template>
    <div class="card">
      <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
  name: "Card",
};
</script>

<style scoped>
@reference "tailwindcss";

.card {
  @apply rounded-md drop-shadow-lg overflow-hidden;
  width: 400px;
  height: 300px;
}
</style>
