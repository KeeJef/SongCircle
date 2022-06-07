<template>
  <div class="container max-w-[935px] flex flex-row justify-center">
    <div
      class="container bg-white max-w-[935px] flex flex-col justify-center mr-1 mt-2 pb-2 rounded">
      <div class="text-2xl p-1">Who added this song?</div>
      <div class="flex justify-center">
        <button
          v-if="!this.reveal"
          @click="revealFunct()"
          class="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-2 my-3 rounded">
          Reveal
        </button>
        <div v-if="this.reveal">
          <div class="text-3xl p-1">
            {{ currentUsername }}
          </div>
          <button
            @click="nextReveal()"
            class="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-2 my-3 rounded"
            v-if="this.playerInfo.playerModStatus">
            {{this.buttonText}}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="this.reveal"
      class="container bg-white max-w-[935px] flex flex-col justify-start ml-1 mt-2 pb-2 rounded">
      <div class="text-2xl p-1">Scoreboard</div>
      <div class="flex flex-col justify-center">
        <div
          class="text-xl"
          v-for="scoreboardItem in this.roomInfo.scoreboard"
          :key="scoreboardItem.id">
          <div>
            {{ scoreboardItem.playerName }}{{ scoreboardItem.playerEmoji }}:
            <span v-if="checkWinArray(scoreboardItem)" class="text-green-600"
              >+10</span
            >
            <span v-if="!checkWinArray(scoreboardItem)">0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoomInfo, usePlayerInfo, useSocket } from "@/store/index";
export default {
  name: "scoreboardDisplay",
  setup() {
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();
    const socketStore = useSocket();
    return { roomInfo, playerInfo, socketStore };
  },
  data() {
    return {
      reveal: false,
      currentUsername: "",
      buttonText: "Next song",
      index: 0
    };
  },
  props: {
    currentSongID: String,
    currentPlayerSelectedSong: String,
  },
  methods: {
    checkWinArray(scoreboardItem) {
      if (scoreboardItem.winArray.includes(this.currentSongID)) {
        return true;
      }
    },
    revealFunct() {
      for (let index = 0; index < this.roomInfo.members.length; index++) {
        const element = this.roomInfo.members[index];

        if (element.playerSocketID == this.currentPlayerSelectedSong) {
          this.currentUsername = element.playerName + element.playerEmoji;
        }
      }
      this.reveal = true;
    },
    nextReveal() {
      this.index++;

      if (this.index == this.roomInfo.shuffledSongs.length) {
        this.socketStore.socketObject.emit("nextGame",this.roomInfo)
        return
      }

      if(this.index == this.roomInfo.shuffledSongs.length -1){
        this.buttonText = "Next round"
      }

        this.socketStore.socketObject.emit("nextReveal",this.roomInfo);
        
    },
  },
  components: {},
  mounted() {},
};
</script>
