<template>
<div>end round</div>
<!-- Load scoreboard -->
</template>

<script>

import { useRoomInfo, useSocket, usePlayerInfo} from "@/store/index";
export default {
  name: "EndRound",
  setup() {
    const socketStore = useSocket();
    const roomInfo = useRoomInfo();
    const playerInfo = usePlayerInfo();

    return { socketStore, roomInfo, playerInfo };
  },
  data() {
    return {
    };
  },
  components: {
  },
  methods: {

  },
  async mounted() {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>