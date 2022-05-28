<template>
  <div
    class="container flex sm:justify-center justify-start min-h-[80px] max-w-[935px] rounded bg-white overflow-x-scroll">
    
      <div class="py-3 ml-6">
        <div class="text-6xl pb-1 select-none">🐉</div>
        <div class="font-bold">Name <span class="text-1xl">👑</span></div>
      </div>

    </div>
</template>

<script>
import { useRoomInfo } from "@/store/index";

export default {
  name: "userDisplayHorizontal",
  setup() {
    const roomInfo = useRoomInfo();

    return { roomInfo };
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  components: {},
};
</script>
