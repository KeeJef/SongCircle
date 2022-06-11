<template>
  <router-view />
</template>

<script>
import io from "socket.io-client";
import { useSocket, useRoomInfo, usePlayerInfo, url } from "@/store/index";
export default {
  name: "App",
  data() {
    return {};
  },
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo };
  },
  methods: {
    async visibilityChange() {
      switch (document.visibilityState) {
        case "visible":
          if (this.roomInfo.roomID) {
            this.socketStore.socketObject.emit(
              "reconnect",
              this.roomInfo.roomID
            );
          } else {
            try {
              this.socketStore.socketObject = await io(url);
              this.socketStore.socketObject.on("connect", () => {
                this.playerInfo.playerSocketID =
                  this.socketStore.socketObject.id;
              });
            } catch (error) {
              console.log("Failed to connect to SongCircle server" + error);
            }
          }
          console.log("visible");
          break;
        case "hidden":
          console.log("hidden");
          break;
        default:
          console.log("default");
          break;
      }
    },
  },
  mounted() {
    document.addEventListener("visibilitychange", this.visibilityChange);
    document.addEventListener("pagehide", this.visibilityChange);
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
}
</style>
