<template>
  <div class="container bg-white max-w-[935px] flex justify-center mt-2 rounded">
    <div class="text-2xl">Who added this song?</div>
    <div>
      
    </div>

  </div>
</template>

<script>
import {useRoomInfo} from "@/store/index";
export default {
  name: "voteSelector",
  setup() {
    const roomInfo = useRoomInfo();
    return { roomInfo };
  },
  data() {
    return {

    };
  },
  props: {
  },
  methods: {
  },
  components: {
  },
};
</script>
