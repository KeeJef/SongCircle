<template>
  <div
    class="container bg-white max-w-[935px] flex flex-col justify-center mt-2 rounded">
    <div class="text-2xl p-1">Scoreboard</div>
    <div class="flex justify-center">
      <div class="text-xl">
        {{ this.roomInfo.scoreboard[0].playerName}}{{ this.roomInfo.scoreboard[0].playerEmoji }}: <span class="text-green-600">+10</span></div>
    </div>
  </div>
</template>

<script>
import { useRoomInfo } from "@/store/index";
export default {
  name: "scoreboardDisplay",
  setup() {
    const roomInfo = useRoomInfo();

    return { roomInfo };
  },
  data() {
    return {};
  },
  props: {
    currentSongID: String,
  },
  methods: {},
  components: {},
  mounted() {},
};
</script>
