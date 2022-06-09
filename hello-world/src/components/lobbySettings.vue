<template>
  <div
    class="container max-w-[490px] min-h-[342px] bg-white rounded flex-col justify-center sm:place-self-start px-2 py-2 m-1">
    <div class="text-4xl pb-3">Settings</div>
    <div class="text-left"><b>Rounds</b></div>

    <select
      v-model="roomInfo.roomSettings.rounds"
      :disabled="!isAdmin"
      @change="updateSelection"
      :class="{
        'form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500':
          isAdmin,
        'w-full px-3 py-2 my-2 bg-slate-300 border-2 border-gray-300 rounded-lg cursor-not-allowed':
          !isAdmin||ongoingGame,
      }">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <div class="text-left"><b>Music Selection time</b></div>

    <select
      v-model="roomInfo.roomSettings.time"
      :disabled="!isAdmin"
      @change="updateSelection"
      :class="{
        'form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500':
          isAdmin,
        'w-full px-3 py-2 my-2 bg-slate-300 border-2 border-gray-300 rounded-lg cursor-not-allowed':
          !isAdmin||ongoingGame,
      }">
      <option value="15 Seconds">15 Seconds</option>
      <option value="30 Seconds">30 Seconds</option>
      <option value="60 Seconds">60 Seconds</option>
    </select>

    <div class="text-left"><b>Theme</b></div>
    <select
      v-if="!this.isCustom"
      v-model="roomInfo.roomSettings.theme"
      :disabled="!isAdmin"
      @change="updateSelection"
      :class="{
        'form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500':
          isAdmin,
        'w-full px-3 py-2 my-2 bg-slate-300 border-2 border-gray-300 rounded-lg cursor-not-allowed':
          !isAdmin,
      }">
      <option value="Rock Anthems">Rock Anthems</option>
      <option value="Pop Anthems">Pop Anthems</option>
      <option value="Rap Music">Rap Music</option>
      <option value="Country Music">Country Music</option>
      <option value="Indie Music">Indie Music</option>
      <option value="Electronic Music">Electronic Music</option>
      <option value="Classical Music">Classical Music</option>
      <option value="Musicals">Musicals</option>
      <option value="Video Game Music">Video Game Music</option>
      <option value="70s Music">70s Music</option>
      <option value="80s Music">80s Music</option>
      <option value="90s Music">90s Music</option>
      <option value="2000s Music">2000s Music</option>
      <option value="2010s Music">2010s Music</option>
      <option value="Custom">Custom</option>
    </select>
    <input v-model="roomInfo.roomSettings.theme" v-if="this.isCustom" type="text" class=" w-full px-3 py-1 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500">
    <div>
      <button v-if="isAdmin && gameNotOver()"
        @click="startGame"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Game
      </button>
    </div>
  </div>
</template>

<script>

import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";

export default {
  name: "lobbySettings",
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo };
  },
  data() {
    return {
      isCustom: false,
    };
  },
  components: {
  },
  props: {
    isAdmin: { type: Boolean },
    ongoingGame: { type: Boolean },
  },
  //refactor to use Store actions
  methods: {
    startGame() {
      try {
        if (this.ongoingGame) {
        this.socketStore.socketObject.emit("updateRoomSettings", this.roomInfo.roomSettings, this.roomInfo.roomID);
        this.socketStore.socketObject.emit("startNewRound", this.roomInfo.roomID);
        return;
      }
        
      } catch (error) {
        console.log(error);
        return
      }

      try {
        this.socketStore.socketObject.emit("updateRoomSettings", this.roomInfo.roomSettings, this.roomInfo.roomID);
        this.socketStore.socketObject.emit("startGame", this.roomInfo.roomID);
        this.roomInfo.gameInProgress = true
      } catch (error) {
        console.log(error)
        return
      }
      this.$router.push('search')
    },
    updateSelection(){
      console.log(this.roomInfo)
      if (this.roomInfo.roomSettings.theme == "Custom") {
        this.isCustom = true
        this.roomInfo.roomSettings.theme = ""
      }
      try {
        this.socketStore.socketObject.emit("updateRoomSettings", this.roomInfo.roomSettings, this.roomInfo.roomID);
      } catch (error) {
        console.log(error);
      }
    },
    gameNotOver() {
      if (this.roomInfo.currentRound > this.roomInfo.roomSettings.rounds -1) {
        return false
      }
      return true
    },
  },
  async mounted() {

    this.roomInfo.roomSettings.rounds = 3;
    this.roomInfo.roomSettings.time = "30 Seconds";
    this.roomInfo.roomSettings.theme = "Rock Anthems";

  },
};
</script>
