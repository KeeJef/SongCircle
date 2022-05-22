<template>
  <div
    class="container min-h-[342px] max-w-[490px] bg-white rounded flex flex-wrap justify-center px-2 py-2 m-1">
    <div class="h-fit text-4xl pb-3">Players</div>
    <div
      class="container max-w-[490px] bg-white rounded flex flex-wrap justify-center px-2 py-2 m-1">
      <playerComp
      v-for="(member, index) in roomInfo.members"
      :key="index"
      :compPlayerInfo="member"></playerComp>

    </div>
  </div>
</template>

<script>
import { useRoomInfo } from "@/store/index";
import playerComp from "./playerComp";

export default {
  name: "avatarLobbyDisplay",
  setup() {
    const roomInfo = useRoomInfo();
    return { roomInfo };
  },
  data() {
    return {};
  },
  components: { playerComp },
  props: {},
  methods: {},
};
</script>
