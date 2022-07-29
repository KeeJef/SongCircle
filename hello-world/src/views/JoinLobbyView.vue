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
import { useRoomInfo, useSocket, usePlayerInfo} from "@/store/index";

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
  methods: {
  },
  async mounted() {

    try {
      this.socketStore.socketObject.emit(
        "joinRoom",
        this.playerInfo.$state,
        this.roomInfo.roomID
      );
      console.log("Member "+this.playerInfo.playerName+" tried to join room " + this.roomInfo.roomID);
    } catch (error) {
      console.log("Failed to join room" + error);
    }

    this.socketStore.socketObject.on("returnMembers", (data) => {
      console.log("member " + this.playerInfo.playerName+ " Tried to join room and received this memberlist "+ data);
      this.roomInfo.members = data;
    });

    this.socketStore.socketObject.on("newSettings", (roomSettings, gameStatus) => {
      this.roomInfo.roomSettings = roomSettings;
      this.roomInfo.gameInProgress = gameStatus;

      if (this.roomInfo.gameInProgress) {
        this.$router.push("search");
      }
        
    });

    this.socketStore.socketObject.on("startGameEvent", () => {
      console.log("Game has started");
      this.$router.push('search')
    });

    this.socketStore.socketObject.on("joinRoomError", () => {
      console.log("Cannot join Game already in progress");
      alert("Cannot join Game already in progress, please ask host to start a new game");
      this.$router.push('/');
    });
  },
};
</script>
