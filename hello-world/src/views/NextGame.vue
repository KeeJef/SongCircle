<template>
  <div class="p-2">
    <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
      <a href="."
        ><img width="520" height="109" src="../assets/songcircle.webp" alt="SongCircle Logo"
      /></a>
    </div>
    <div
      class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      <lobbySettings
        :ongoingGame="true"
        :isAdmin="this.playerInfo.playerModStatus"></lobbySettings>
      <div
        class="container min-h-[342px] max-h-[342px] max-w-[490px] bg-white rounded flex flex-col justify-start px-2 py-2 m-1 overflow-y-auto">
        <div class="text-4xl pb-3">Scoreboard</div>
        <div
          class="text-xl p-1"
          v-for="scoreboardItem in this.roomInfo.scoreboard"
          :key="scoreboardItem.id">
          <div>
            {{ scoreboardItem.playerName }}{{ scoreboardItem.playerEmoji }}:
            <span>{{ scoreboardItem.score }}</span>
          </div>
        </div>
        <div class="text-4xl pt-3">
          Current Round: {{ this.roomInfo.currentRound }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        class="container rounded bg-white max-w-[490px] px-2 py-2"
        v-if="!gameNotOver()">
        <button
          @click="pushUser"
          type="button"
          class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          End Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import lobbySettings from "../components/lobbySettings.vue";
import { usePlayerInfo, useRoomInfo, useSocket } from "@/store/index";

export default {
  name: "NextGame",
  setup() {
    const playerInfo = usePlayerInfo();
    const roomInfo = useRoomInfo();
    const socketStore = useSocket();
    return { playerInfo, roomInfo, socketStore };
  },
  data() {
    return {};
  },
  components: {
    lobbySettings,
  },
  mounted() {
    this.roomInfo.currentRound++;
    this.socketStore.socketObject.on("startNewRoundEvent", () => {
      // clear any info from previous round. PlayerSongSelected, ShuffledSongs, scoreboard[index].voteArray clear
      this.playerInfo.playerSongSelected = false;

      //for roominfo.members set playersongSelected to false
      for (let i = 0; i < this.roomInfo.members.length; i++) {
        this.roomInfo.members[i].playerSongSelected = false;
      }

      this.roomInfo.scoreboard.forEach((scoreboardItem) => {
        scoreboardItem.voteArray = [];
      });
      this.roomInfo.shuffledSongs = [];

      this.$router.push("search");
    });

    this.socketStore.socketObject.on("gameOverEvent", () => {
      for (let i = 0; i < this.roomInfo.members.length; i++) {
        this.roomInfo.members[i].playerSongSelected = false;
      }

      this.roomInfo.scoreboard.forEach((scoreboardItem) => {
        scoreboardItem.voteArray = [];
        scoreboardItem.score = 0;
      });

      this.roomInfo.shuffledSongs = [];
      this.roomInfo.currentRound = 0;

      if (this.playerInfo.playerModStatus == false) {
        this.$router.push("joinLobby");
      } else {
        this.$router.push("lobby");
      }
    });
  },
  methods: {
    gameNotOver() {
      if (this.roomInfo.currentRound > this.roomInfo.roomSettings.rounds - 1) {
        return false;
      }
      return true;
    },
    pushUser() {
      //if user is non admin push to joinlobbyview if admin push to lobbyview
      try {
        this.socketStore.socketObject.emit("gameOver", this.roomInfo.roomID);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
