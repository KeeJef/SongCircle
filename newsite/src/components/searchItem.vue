<template>
  <div
    class="p-3 w-fit max-w-[300px] hover:bg-slate-200 rounded"
    :class="{ 'bg-green-500 hover:bg-green-500': isClicked }"
    @click="isClicked = !isClicked">
    <img
      :src="albumArt"
      alt="Album artwork not found/loading"
      class="inline-flex select-none" />
    <div v-if="!isClicked">
      <div class="text-lg break-words">{{ songName }}</div>
      <div class="text-md text-gray-400" :class="{ 'text-black': isClicked }">
        {{ artistName }}
      </div>
    </div>
    <button class=" bg-white hover:bg-slate-200 text-black font-bold mt-3 px-6 py-2 rounded" v-if="isClicked" @click="selectSong">{{buttonName}}</button>  
  </div>
</template>

<script>
import { useSocket, useRoomInfo, usePlayerInfo } from "@/store/index";
export default {
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();
    return { socketStore, roomInfo , playerInfo};
  },
  name: "SearchItem",
  data() {
    return {
      isClicked: false,
      buttonName: "Select",
    };
  },
  props: {
    songName: String,
    artistName: String,
    albumArt: String,
    url: String,
    songID: String
  },
  methods: {
    async selectSong() {
      this.socketStore.socketObject.emit("songChosen", {
        songName: this.songName,
        artistName: this.artistName,
        albumArt: this.albumArt,
        url: this.url,
        playerID:this.playerInfo.playerID,
        songID:this.songID
      }, this.roomInfo.roomID , this.playerInfo.playerID);
      this.isClicked = false;
      this.buttonName = "Selected";
    }
    },

  components: {},
};
</script>
