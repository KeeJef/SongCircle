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
      <scoreboardDisplay :currentSongID="this.currentSongID" :currentPlayerSelectedSong="this.currentSongPlayerID"></scoreboardDisplay>
    </div>
  </div>
</template>

<script>
import selectedSongDisplay from "../components/selectedSongDisplay.vue";
import userDisplayHorizontal from "../components/userDisplayHorizontal.vue";
import scoreboardDisplay from "../components/scoreboardDisplay.vue";
import { useRoomInfo, useSocket, usePlayerInfo} from "@/store/index";

export default {
  name: "EndRound",
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();
    return { socketStore, roomInfo, playerInfo };
  },
  data() {
    return {
      currentAlbumArt: "",
      currentSongName: "",
      currentArtistName: "",
      currentUrl: "",
      currentSongID: "",
      currentSongPlayerID: "",
      index: 0,
    };
  },
  components: {
    selectedSongDisplay,
    userDisplayHorizontal,
    scoreboardDisplay,
  },
  methods: {

  },
  async mounted() {
        try {
      this.currentAlbumArt = this.roomInfo.shuffledSongs[this.index].selectedSong.albumArt;
      this.currentSongName = this.roomInfo.shuffledSongs[this.index].selectedSong.songName;
      this.currentArtistName = this.roomInfo.shuffledSongs[this.index].selectedSong.artistName;
      this.currentUrl = this.roomInfo.shuffledSongs[this.index].selectedSong.url;
      this.currentSongID = this.roomInfo.shuffledSongs[this.index].selectedSong.songID;
      this.currentSongPlayerID = this.roomInfo.shuffledSongs[this.index].selectedSong.playerID;
    } catch (error) {
      console.log(error)
    }
 
    this.socketStore.socketObject.on("nextRevealEvent", () => {
      this.index ++;

      try {

      this.currentAlbumArt = this.roomInfo.shuffledSongs[this.index].selectedSong.albumArt;
      this.currentSongName = this.roomInfo.shuffledSongs[this.index].selectedSong.songName;
      this.currentArtistName = this.roomInfo.shuffledSongs[this.index].selectedSong.artistName;
      this.currentUrl = this.roomInfo.shuffledSongs[this.index].selectedSong.url;
      this.currentSongID = this.roomInfo.shuffledSongs[this.index].selectedSong.songID;
      this.currentSongPlayerID = this.roomInfo.shuffledSongs[this.index].selectedSong.playerID;

      } catch (error) {
        console.log(error)
        console.log("Probably played with 1 player")
      }
    });

    this.socketStore.socketObject.on("nextGameEvent", () => {
      this.$router.push('nextGame');
    });
 
 },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>