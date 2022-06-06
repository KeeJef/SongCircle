<template>
  <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
    <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo" /></a>
  </div>
  <div
    class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <userDisplayHorizontal></userDisplayHorizontal>
  </div>

  <div
    class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <searchComp></searchComp>
  </div>
</template>

<script>
//todo add timer using this https://stackoverflow.com/questions/55773602/how-do-i-create-a-simple-10-seconds-countdown-in-vue-js

import SearchComp from "../components/searchComp.vue";
import userDisplayHorizontal from "../components/userDisplayHorizontal.vue";
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";

export default {
  name: "SearchView",
  setup() {
    const roomInfo = useRoomInfo();
    const socketStore = useSocket();
    const playerInfo = usePlayerInfo();
    return { roomInfo, socketStore, playerInfo };
  },
  data() {
    return {};
  },
  components: {
    SearchComp,
    userDisplayHorizontal,
  },
  methods: {},
  async mounted() {
    this.socketStore.socketObject.on("returnMembers", (membersArray) => {
      this.roomInfo.members = membersArray;
    });

    this.socketStore.socketObject.on("newSong", (playerSocketID) => {
      console.log("NewSongEvent Fired")
      for (let index = 0; index < this.roomInfo.members.length; index++) {
        const element = this.roomInfo.members[index];

        if (element.playerSocketID == playerSocketID) {
          this.roomInfo.members[index].playerSongSelected = true;
        }
        
      }
    });

        this.socketStore.socketObject.on("newVote", (playerSocketID) => {
      console.log("NewVote Fired")
      for (let index = 0; index < this.roomInfo.members.length; index++) {
        const element = this.roomInfo.members[index];

        if (element.playerSocketID == playerSocketID) {
          this.roomInfo.members[index].playerSongSelected = true;
        }
        
      }
    });

    this.socketStore.socketObject.on("startRound", (shuffledSongArray) => {
      this.roomInfo.shuffledSongs = shuffledSongArray;
      //clear the playerSongSelected so i can use the tick in other views
      this.roomInfo.members.forEach((element) => {
        element.playerSongSelected = false;
      });
      this.$router.push('vote')
    });
  },
};
</script>
