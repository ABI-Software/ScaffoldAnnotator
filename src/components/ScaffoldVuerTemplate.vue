<template>
  <div class="component-container">
    <ScaffoldVuer
      v-if="url"
      ref="scaffold"
      :display-u-i="displayUI"
      :url="url"
      :help-mode="helpMode"
      :helpModeDialog="useHelpModeDialog"
      :helpModeActiveItem="helpModeActiveItem"
      @help-mode-last-item="onHelpModeLastItem"
      @shown-tooltip="onTooltipShown"
      @shown-map-tooltip="onMapTooltipShown"
      :display-latest-changes="false"
      :display-minimap="false"
      :display-markers="false"
      :enableOpenMapUI="false"
      :marker-cluster="false"
      :show-colour-picker="showColourPicker"
      :render="true"
      @on-ready="onReady"
      @scaffold-selected="onSelected"
      @zinc-object-added="objectAdded"
      @vue:mounted="viewerMounted"
    />
  </div>
</template>


<script>
/* eslint-disable no-alert, no-console */
import { shallowRef } from 'vue';
import { ScaffoldVuer } from "@abi-software/scaffoldvuer";
import "@abi-software/scaffoldvuer/dist/style.css";

export default {
  name: "ScaffoldVuerTemplate",
  components: {
    ScaffoldVuer,
  },
  data: function () {
    return {
      consoleOn: false,
      displayUI: true,
      helpMode: false,
      helpMode: false,
      helpModeActiveItem: 0,
      helpModeLastItem: false,
      useHelpModeDialog: false,
      coordinatesClicked: [],
    };
  },
  props: {
    url: {
      type: String,
      default: "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/29_Jan_2020/heartICN_metadata.json",
    },
  },
  watch: {
    helpMode: function (newVal) {
      if (!newVal) {
        this.helpModeActiveItem = 0;
      }
    },
  },
  mounted: function () {
    this._objects = [];
  },
  unmounted: function () {
    this.$refs.dropzone.revokeURLs();
  },
  methods: {
    objectAdded: function (zincObject) {
      if (this.consoleOn) {
        console.log(zincObject)
        console.log(this.$refs.scaffold.$module.scene.getBoundingBox())
      }
      if (this._objects.length === 0) {
        zincObject.setMarkerMode("on");
      }
      this._objects.push(zincObject);
    },
    screenCapture: function () {
      this.$refs.scaffold.captureScreenshot("capture.png");
    },
    onReady: function () {
      if (this.consoleOn) console.log(this.$refs.scaffold)
    },
    addLines: function (coord) {
      if (this.coordinatesClicked.length === 1) {
        const returned = this.$refs.scaffold.$module.scene.createLines(
            "test",
            "lines",
            [this.coordinatesClicked[0], coord],
            0x00ee22,
          );
          this.coordinatesClicked.length = 0;
          if (this.consoleOn) console.log(returned);
      } else {
        this.coordinatesClicked.push(coord);
      }
    },
    onSelected: function (data) {
      if (data && data.length > 0 && data[0].data.group) {
        if (this.consoleOn) console.log(data[0]);
        if (this.createPoints && data[0].extraData.worldCoords) {
          const returned = this.$refs.scaffold.$module.scene.createPoints(
            "test",
            "points",
            [data[0].extraData.worldCoords],
            undefined,
            0x0022ee,
          );
        }
        this.$refs.scaffold.showRegionTooltipWithAnnotations(data, false, true);
      }
    },
    onHelpModeShowNext: function () {
      this.helpModeActiveItem += 1;
    },
    onHelpModeLastItem: function (isLastItem) {
      if (isLastItem) {
        this.helpModeLastItem = true;
      }
    },
    onFinishHelpMode: function () {
      this.helpMode = false;
      // reset help mode to default values
      this.helpModeActiveItem = 0;
      this.helpModeLastItem = false;
    },
    onTooltipShown: function () {
      if (this.$refs.scaffold && this.$refs.scaffoldHelp) {
        this.$refs.scaffoldHelp.toggleTooltipHighlight();
      }
    },
    onMapTooltipShown: function () {
      if (this.$refs.scaffold && this.$refs.scaffoldHelp) {
        this.$refs.scaffoldHelp.toggleTooltipPinHighlight();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.component-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
/* Component Styles */
</style>
