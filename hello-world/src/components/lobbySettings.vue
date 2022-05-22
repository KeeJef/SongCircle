<template>
  <div
    class="container max-w-[490px] bg-white rounded flex-col justify-center sm:place-self-start px-2 py-2 m-1">
    <div class="text-4xl pb-3">Settings</div>
    <div class="text-left"><b>Rounds</b></div>
    <selectSettings
      v-model="roomInfo.roomSettings.rounds"
      :options="[1, 2, 3, 4, 5]"
      default="3"
      :isAdmin="this.isAdmin"></selectSettings>
    <div class="text-left"><b>Music Selection time</b></div>
    <selectSettings
      v-model="roomInfo.roomSettings.time"
      :options="['30 Seconds', '60 Seconds', '120 Seconds']"
      default="30 Seconds"
      :isAdmin="this.isAdmin"></selectSettings>
    <div class="text-left"><b>Theme</b></div>
    <selectSettings
      v-model="roomInfo.roomSettings.theme"
      :options="[
        'None',
        'Rock Anthems',
        'Pop Anthems',
        'Rap Music',
        'Electronic Music',
        'Classical Music',
        'Indie Music',
        'Country Music',
        'Musicals',
        'Video Game Music',
        '70s Music',
        '80s Music',
        '90s Music',
        '00s Music',
        '10s Music',
      ]"
      default="None"
      :isAdmin="this.isAdmin"></selectSettings>
    <div>
      <button
        @click="startGame"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Game
      </button>
    </div>
  </div>
</template>

<script>
import selectSettings from "./selectSettings";
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";

export default {
  name: "lobbySettings",
  setup() {

    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();
    return{roomInfo, playerInfo};
  },
  data() {
    return {};
  },
  components: {
    selectSettings,
  },
  props: {
    isAdmin: { type: Boolean },
  },

  //refactor to use Store actions
  methods: {
    startGame() {
      const socketStore = useSocket()

      try {
        socketStore.socketObject.emit("updateRoomSettings", this.roomInfo);
      } catch (error) {
        console.log(error)
      }
        
    },
  },
  async mounted() {
    this.roomInfo.roomSettings.rounds = 3;
    this.roomInfo.roomSettings.time = "60 Seconds";
    this.roomInfo.roomSettings.theme = "None";

    //     try {
    //   this.socketObject = await io("http://localhost:8000");
    // } catch (error) {
    //   console.log("Failed to connect to SongCircle server" + error);
    // }

    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        this.startGame();
      }
    });
  },
};
</script>
