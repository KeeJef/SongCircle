<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."
        ><img src="../assets/songcircle.png" alt="SongCircle Logo"
      /></a>
    </div>
    <div>vote view</div>
    <div
      class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      <userDisplayHorizontal></userDisplayHorizontal>
    </div>
    <div class="px-2 flex flex-row sm:flex-col sm:flex items-center justify-center">
      <selectedSongDisplay></selectedSongDisplay>
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
    return {};
  },
  components: {
    userDisplayHorizontal,
    voteSelector,
    selectedSongDisplay,
  },
  methods: {},
  async mounted() {},
};
</script>
