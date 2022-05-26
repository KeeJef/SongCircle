<template>
  <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
    <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo" /></a>
  </div>
  <div
    class="px-2 py-1 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <lobbySettings :isAdmin="false"></lobbySettings>
    <avatarLobbyDisplay></avatarLobbyDisplay>
  </div>
  <!-- Move room details, left align -->
  <div
    class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <roomDetails :roomID="this.roomInfo.roomID"></roomDetails>
  </div>
</template>

<script>
import lobbySettings from "../components/lobbySettings.vue";
import avatarLobbyDisplay from "../components/avatarLobbyDisplay.vue";
import roomDetails from "../components/roomDetails.vue";
import io from "socket.io-client";
import { useRoomInfo, useSocket, usePlayerInfo, url} from "@/store/index";

export default {
  name: "JoinLobbyView",
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo };
  },
  data() {
    return {};
  },
  components: {
    lobbySettings,
    avatarLobbyDisplay,
    roomDetails,
  },
  methods: {},
  async mounted() {
    //try connecting to the server

    try {
      this.socketStore.socketObject = await io(url);

      this.socketStore.socketObject.on("connect", () => {
        this.playerInfo.playerSocketID = this.socketStore.socketObject.id
      });

    } catch (error) {
      console.log("Failed to connect to SongCircle server" + error);
    }

    try {
      this.socketStore.socketObject.emit(
        "joinRoom",
        this.playerInfo.$state,
        this.roomInfo.roomID
      );
    } catch (error) {
      console.log("Failed to join room" + error);
    }

    this.socketStore.socketObject.on("returnMembers", (data) => {
      this.roomInfo.members = data;
    });
  },
};
</script>
