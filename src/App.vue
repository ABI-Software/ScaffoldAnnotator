<script setup>
import DropZone from "./app/DropZone.vue";
import ScaffoldAnnotator from './components/ScaffoldAnnotator.vue';
</script>

<template>
  <div id="app">
    <drop-zone ref="dropzone" @files-drop="onFilesDrop">
      <ScaffoldAnnotator :url="url" />
    </drop-zone>
  </div>
</template>
<script>

export default {
  name: "app",
  data: function () {
    return {
      url: "",
    }
  },
  unmounted: function () {
    this.$refs.dropzone.revokeURLs();
  },
  methods: {
    onFilesDrop: function (payload) {
      if (payload.format == "gltf") this.format = "gltf";
      else this.format = "metadata";
      this.url = payload.url;
    },
  }
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
