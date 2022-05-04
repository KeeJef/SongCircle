<template>
  <div
    class="container min-h-[264px] max-w-[490px] bg-white rounded flex flex-wrap justify-center px-2 py-2 m-1">
    <div class="h-fit text-4xl pb-3">Players</div>
    <div
      class="container max-w-[490px] bg-white rounded flex flex-wrap justify-center px-2 py-2 m-1">
      <playerComp :compPlayerInfo="playerInfo"></playerComp>
      <playerComp :compPlayerInfo="playerInfo"></playerComp>
      <playerComp :compPlayerInfo="playerInfo"></playerComp>
    </div>
  </div>
</template>

<script>
import { usePlayerInfo } from "@/store/index";
import playerComp from "./playerComp";

export default {
  name: "avatarLobbyDisplay",
  setup() {
    const playerInfo = usePlayerInfo();
    return { playerInfo };
  },
  data() {
    return {};
  },
  components: { playerComp },
  props: {},
  methods: {},
};
</script>
