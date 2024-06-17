<script setup>
import ScaffoldVuerTemplate from './components/ScaffoldVuerTemplate.vue';
</script>

<template>
  <div id="app">
    <ScaffoldVuerTemplate/>
  </div>
</template>

<script>
export default {
  name: "app",
}

</script>

<style>
#app {
  font-family: "Asap", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: absolute;
}

body {
  margin: 0px;
  overflow: hidden;
}
/* Component Styles */
</style>
