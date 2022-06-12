<template>
  <router-view />
</template>

<script>
import io from "socket.io-client";
import { useSocket, useRoomInfo, usePlayerInfo, url } from "@/store/index";
export default {
  name: "App",
  data() {
    return {
      lastSocketID: ""
    };
  },
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo };
  },
  methods: {

    async reconnect(){
      console.log("reconnected client side")
      await this.socketStore.socketObject.emit("reconnect", this.roomInfo.roomID);
    }

  },
  async mounted() {

    try {
      console.log("client trying to connect")
      this.socketStore.socketObject = await io(url);
      this.socketStore.socketObject.on("connect", () => {
        this.playerInfo.playerSocketID = this.socketStore.socketObject.id;
      });
    } catch (error) {
      console.log("Failed to connect to SongCircle server" + error);
    }

    setInterval(() => {
      //this is messy but watch wasnt working on iOS for some reason
		try {
      console.log(this.socketStore.socketObject.id)
      if (this.lastSocketID != this.socketStore.socketObject.id) {
        this.reconnect()
      }
    } catch (error) {
      console.log("No socketID yet")
      return
    }

    this.lastSocketID = this.socketStore.socketObject.id

	}, 2000)

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
