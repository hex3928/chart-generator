<script setup>
const toggleTheme = _ => document.documentElement.classList.toggle("dark")
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body {
  @apply font-['Roboto',_sans-serif] p-5;
}
</style>
