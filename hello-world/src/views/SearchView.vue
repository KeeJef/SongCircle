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

    this.socketStore.socketObject.on("startRound", (shuffledSongArray) => {
      this.roomInfo.shuffledSongs = shuffledSongArray;
      this.$router.push('vote')
    });
  },
};
</script>
