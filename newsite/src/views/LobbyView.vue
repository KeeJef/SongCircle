<template>
  <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
    <a href="."><img width="520" height="109" src="../assets/songcircle.webp" alt="SongCircle Logo" /></a>
  </div>
  <div
    class="px-2 py-1 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <lobbySettings :isAdmin="true"></lobbySettings>
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
  name: "LobbyView",
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
