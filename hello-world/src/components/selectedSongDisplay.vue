<template>
<div
    class="p-3 w-fit max-w-[230px] hover:bg-slate-200 rounded">
    <img
      :src="this.albumArt"
      alt="Album artwork not found/loading"
      class="inline-flex select-none" />
    <div v-if="!isClicked">
      <div class="text-lg break-words">{{ songName }}</div>
      <div class="text-md text-gray-400" :class="{ 'text-black': isClicked }">
        {{ artistName }}
      </div>
    </div>
    <button class=" bg-white hover:bg-slate-200 text-black font-bold mt-3 px-6 py-2 rounded" v-if="isClicked" @click="selectSong">Select</button>  
  </div>
</template>

<script>

// {"songName":"Don't Let Me Down (feat. Daya) [Illenium Remix]","artistName":"The Chainsmokers","albumArt":"https://is3-ssl.mzstatic.com/image/thumb/Music20/v4/40/1d/0a/401d0a4f-6afe-1548-f4c8-6e8de3ff1e2b/886446009742.jpg/230x230bb.jpg","url":"https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fc/fe/b4/fcfeb430-d9ee-66a2-7682-15d5c1d5eeb9/mzaf_11017620517018788367.plus.aac.p.m4a","playerSocketID":"6GSUHwVRQTHaeSdWAAAP"}

export default {
  name: "voteSelector",
  data() {
    return {
        albumArt: "https://is3-ssl.mzstatic.com/image/thumb/Music20/v4/40/1d/0a/401d0a4f-6afe-1548-f4c8-6e8de3ff1e2b/886446009742.jpg/230x230bb.jpg",
        songName: "Don't Let Me Down (feat. Daya) [Illenium Remix]",
        artistName: "The Chainsmokers",
        url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fc/fe/b4/fcfeb430-d9ee-66a2-7682-15d5c1d5eeb9/mzaf_11017620517018788367.plus.aac.p.m4a",
    };
  },
  props: {
  },
  methods: {
  },
  components: {
  },
};
</script>
