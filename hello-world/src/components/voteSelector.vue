<template>
  <div
    class="container bg-white max-w-[935px] flex flex-col justify-center mt-2 rounded">
    <div class="text-2xl p-1">Who added this song?</div>
    <div class="flex justify-center">
      <button v-for="member in this.roomInfo.members" :key="member.id" @click="vote(member.playerSocketID)"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 mb-4 mx-2 rounded" :class="{ 'pointer-events-none cursor-not-allowed': votedStatus }">
        {{ member.playerName }} {{member.playerEmoji}}
      </button>
    </div>
  </div>
</template>

<script>
import { useRoomInfo, useSocket, usePlayerInfo } from "@/store/index";
export default {
  name: "voteSelector",
  setup() {
    const roomInfo = useRoomInfo();
    const socketStore = useSocket();
    const playerInfo = usePlayerInfo();
    return { roomInfo, socketStore, playerInfo };
  },
  data() {
    return {
      votedStatus: false,
    };
  },
  props: {
    currentSongID: String
  },
  methods: {
    vote(playerSocketID){
      try {
        var voteObject = {songID:this.currentSongID, voteFor: playerSocketID, voteBy: this.playerInfo.playerSocketID};

        this.socketStore.socketObject.emit("vote",this.roomInfo, voteObject);
        this.votedStatus = true;
      } catch (error) {
        console.log(error)
      }
        
    }
  },
  components: {},
  mounted(){
        this.socketStore.socketObject.on("nextVote", () => {
          this.votedStatus = false;
    });
  }
  
};
</script>
