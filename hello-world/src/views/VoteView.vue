<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."
        ><img src="../assets/songcircle.png" alt="SongCircle Logo"
      /></a>
    </div>
    <div
      class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      <userDisplayHorizontal></userDisplayHorizontal>
    </div>
    <div class="px-2 flex-col flex items-center justify-center">
      <selectedSongDisplay :albumArt="this.currentAlbumArt" :artistName="this.currentArtistName" :songName="this.currentSongName" :url="this.currentUrl"></selectedSongDisplay>
      <voteSelector></voteSelector>
    </div>
  </div>
</template>

<script>
import selectedSongDisplay from "../components/selectedSongDisplay.vue";
import voteSelector from "../components/voteSelector.vue";
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";
import userDisplayHorizontal from "../components/userDisplayHorizontal.vue";

export default {
  name: "SearchView",
  setup() {
    const roomInfo = useRoomInfo();
    const socketStore = useSocket();
    const playerInfo = usePlayerInfo();
    return { roomInfo, socketStore, playerInfo };
  },
  data() {
    return {
      currentAlbumArt: "",
      currentSongName: "",
      currentArtistName: "",
      currentUrl: "",
    };
  },
  components: {
    userDisplayHorizontal,
    voteSelector,
    selectedSongDisplay,
  },
  methods: {},
  async mounted() {
    try {
      this.currentAlbumArt = this.roomInfo.shuffledSongs[0].albumArt;
      this.currentSongName = this.roomInfo.shuffledSongs[0].songName;
      this.currentArtistName = this.roomInfo.shuffledSongs[0].artistName;
      this.currentUrl = this.roomInfo.shuffledSongs[0].url;
    } catch (error) {
      console.log(error)
    }
      
  },
};
</script>
