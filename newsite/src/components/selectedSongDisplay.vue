<template>
  <div
    class="container max-w-[935px] flex justify-center mt-2 rounded overflow-hidden relative">
    <img
      v-if="this.windowSize > 430"
      class="opacity-50 absolute w-full left-0 top-0 min-h-[466px]"
      :src="this.albumArt"
      alt="" />

    <div class="sm:p-1 sm:m-4 w-fit rounded relative">
      <img
        :src="this.albumArt"
        @click="playSong()"
        alt="Album artwork not found/loading"
        class="inline-flex select-none rounded" />

      <audio ref="audioPreview" class="w-full" controls>
        <source v-bind:src="this.url" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div class="bg-white rounded p-3">
        <div class="text-lg break-words">{{ songName }}</div>
        <div class="text-md text-gray-400">
          {{ artistName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectedSongDisplay",
  data() {
    return {
      playStatus: false,
      windowSize: "",
    };
  },
  props: {
    albumArt: String,
    songName: String,
    artistName: String,
    url: String,
  },
  watch: {
    url: {
      handler() {
        this.$refs.audioPreview.load()
      },
    },
  },
  methods: {
    playSong() {
      if (this.playStatus == false) {
        this.playStatus = true;
        this.$refs.audioPreview.play();
      } else {
        this.$refs.audioPreview.pause();
        this.playStatus = false;
      }
    },
  },
  components: {},
  mounted() {
    this.windowSize = window.innerWidth;
  },
};
</script>
