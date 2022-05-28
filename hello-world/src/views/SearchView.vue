<template>
  <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
    <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo" /></a>
  </div>
  <div
    class="px-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <userDisplayHorizontal></userDisplayHorizontal>
  </div>

  <div
    class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <searchComp></searchComp>
  </div>
</template>

<script>
import SearchComp from "../components/searchComp.vue";
import userDisplayHorizontal from "../components/userDisplayHorizontal.vue";
import { useRoomInfo, useSocket } from "@/store/index";

export default {
  name: "SearchView",
  setup() {
    const roomInfo = useRoomInfo();
    const socketStore = useSocket();
    return { roomInfo, socketStore };
  },
  data() {
    return {};
  },
  components: {
    SearchComp,
    userDisplayHorizontal,
  },
  methods: {},
  async mounted() {
    this.socketStore.socketObject.on("returnMembers", (data) => {
      this.roomInfo.members = data;
    });
  },
};
</script>
