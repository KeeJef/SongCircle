<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."
        ><img src="../assets/songcircle.png" alt="SongCircle Logo"
      /></a>
    </div>
    <gatherUserInfo
      buttonName="Join Room"
      nextRoute="joinLobby"
      :modStatus="false"></gatherUserInfo>
  </div>
</template>

<script>
import gatherUserInfo from "../components/gatherUserInfo";
import { useRoomInfo } from "@/store/index";

export default {
  name: "JoinView",
  setup() {
    const roomInfo = useRoomInfo();
    return { roomInfo };
  },
  data() {
    return {};
  },
  components: {
    gatherUserInfo,
  },
  methods: {},
  async mounted() {
    try {
      this.roomInfo.roomID = this.$route.fullPath.split("?")[1];
    } catch (error) {
      console.log(error);
    }
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
