<template>
  <div
    class="container flex sm:justify-center justify-start min-h-[80px] max-w-[935px] rounded bg-white overflow-x-auto">
    <div v-for="member in this.roomInfo.members" :key="member.id">
      <div class="py-3 ml-6 relative">
        <div class="flex justify-center items-center absolute cursor-pointer w-full h-[80px]" @click="this.kickButton =! this.kickButton" v-if="playerInfo.playerModStatus && playerInfo.playerID != member.playerID">
          <button class=" bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm" @click="kickPlayer(member.playerID)" v-if="kickButton">Kick</button>
        </div>
        <div class="text-6xl pb-1 select-none">{{ member.playerEmoji }}</div>
        <div class="font-bold">
          {{member.playerName}} <span v-if="member.playerModStatus & !member.playerSongSelected" class="text-1xl">👑</span> <span v-if="member.playerSongSelected" class="text-1xl">✔️</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoomInfo, usePlayerInfo, useSocket } from "@/store/index";

export default {
  name: "userDisplayHorizontal",
  setup() {
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();
    const socketStore = useSocket();
    return { roomInfo, playerInfo, socketStore };
  },
  data() {
    return {
      kickButton: false,
    };
  },
  props: {
  },
  methods: {
    kickPlayer(selectedPlayerID) {
      console.log("kicking user " + selectedPlayerID);
      this.socketStore.socketObject.emit("kickUser", this.roomInfo.roomID, selectedPlayerID);
    },
  },
  components: {},
};
</script>
