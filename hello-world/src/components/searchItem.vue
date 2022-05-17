<template>
  <div class="p-3 w-fit max-w-[230px] hover:bg-slate-100 rounded">
    <img :src="albumArt" alt="Album artwork not found" class="inline-flex"/>
    <div class="text-lg break-words">{{songName}}</div>
    <div class="text-md text-gray-400">{{artistName }}</div>
  </div>
</template>

<script>

export default {
  name: "SearchItem",
  data() {
    return {

    };
  },
  props: {
    songName: String,
    artistName: String,
    albumArt: String,
    url: String,
  },
  methods: {
  },
  components: {
  },
};
</script>
