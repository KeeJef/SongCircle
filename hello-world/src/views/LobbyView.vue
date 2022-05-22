<template>
  <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
    <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo" /></a>
  </div>
  <div
    class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <lobbySettings :isAdmin="true"></lobbySettings>
    <avatarLobbyDisplay></avatarLobbyDisplay>
    <!-- display properly -->
    songcircle.fun/join?{{this.roomInfo.roomID}}
  </div>
</template>

<script>
import lobbySettings from "../components/lobbySettings.vue";
import avatarLobbyDisplay from "../components/avatarLobbyDisplay.vue";
import io from "socket.io-client";
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";

export default {
  name: "LobbyView",
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo};
  },
  data() {
    return {

    };
  },
  components: {
    lobbySettings,
    avatarLobbyDisplay,
  },
  methods: {
    async joinRoom() {
      try {
        this.socketStore.socketObject.emit(
          "joinRoom",
          this.playerInfo.$state,
          this.roomInfo.roomID
        );
      } catch (error) {
        console.log("Failed to join room" + error);
      }
    },

  },

// refactor Store to use actions

  async mounted() {
    try {
      this.socketStore.socketObject = await io("http://localhost:8000");
    } catch (error) {
      console.log("Failed to connect to SongCircle server" + error);
    }

    try {
      this.socketStore.socketObject.emit("createNewRoom");
    } catch (error) {
      console.log("Failed to create room" + error);
    }

    this.socketStore.socketObject.on("returnRoomID", (data) => {
      this.roomInfo.roomID = data.roomID;
      this.roomInfo.members = data.members;
      this.joinRoom();
    });

    this.socketStore.socketObject.on("returnMembers", (data) => {
      this.roomInfo.members = data;
    });
  },
};
</script>
