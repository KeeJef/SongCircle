<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."
        ><img width="520" height="109" src="../assets/songcircle.webp" alt="SongCircle Logo"
      /></a>
    </div>
    <div
      class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      <userDisplayHorizontal></userDisplayHorizontal>
    </div>
    <div class="px-2 flex-col flex items-center justify-center">
      <selectedSongDisplay :albumArt="this.currentAlbumArt" :artistName="this.currentArtistName" :songName="this.currentSongName" :url="this.currentUrl"></selectedSongDisplay>
      <voteSelector :currentSongID="this.currentSongID"></voteSelector>
    </div>
  </div>
</template>

<script>
import selectedSongDisplay from "../components/selectedSongDisplay.vue";
import voteSelector from "../components/voteSelector.vue";
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";
import userDisplayHorizontal from "../components/userDisplayHorizontal.vue";

export default {
  name: "voteView",
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
      currentSongID: "",
      index: 0,
    };
  },
  components: {
    userDisplayHorizontal,
    voteSelector,
    selectedSongDisplay,
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
    } catch (error) {
      console.log(error)
    }

    this.socketStore.socketObject.on("nextVote", () => {
      this.index ++;

      if (this.index >= this.roomInfo.shuffledSongs.length) {
        return
      }

      try {

              for (let index = 0; index < this.roomInfo.members.length; index++) {
        const element = this.roomInfo.members[index];
        element.playerSongSelected = false;
      }

      this.currentAlbumArt = this.roomInfo.shuffledSongs[this.index].selectedSong.albumArt;
      this.currentSongName = this.roomInfo.shuffledSongs[this.index].selectedSong.songName;
      this.currentArtistName = this.roomInfo.shuffledSongs[this.index].selectedSong.artistName;
      this.currentUrl = this.roomInfo.shuffledSongs[this.index].selectedSong.url;
      this.currentSongID = this.roomInfo.shuffledSongs[this.index].selectedSong.songID;

      } catch (error) {
        console.log(error)
        console.log("Probably played with 1 player")
      }


    });

    this.socketStore.socketObject.on("nextRound", (scoreboard) => {
        this.roomInfo.scoreboard = scoreboard;
        this.$router.push('endRound');
    });

      
  },
};
</script>
