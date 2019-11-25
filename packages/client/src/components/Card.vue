<template>
  <vk-card>
    <vk-card-title v-show="title">{{ title }}</vk-card-title>
    <slot />
  </vk-card>
</template>

<script>
export default {
  props: {
    title: ""
  }
};
</script>

<style>
</style>