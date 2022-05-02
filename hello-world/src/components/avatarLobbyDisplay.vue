<template>
  <div
    class="container max-w-[490px] bg-white rounded flex justify-center px-2 py-2 m-1">
    <playerComp :compPlayerInfo="playerInfo"></playerComp>
        <playerComp :compPlayerInfo="playerInfo"></playerComp>
    
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
  components:{playerComp},
  props: {},
  methods: {},
};
</script>
