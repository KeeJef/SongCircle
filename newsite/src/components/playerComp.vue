<template>
  <div class="w-fit p-3">
    <!-- <div
      v-if="compPlayerInfo.playerModStatus"
      class="w-fit -translate-x-5 translate-y-5 -rotate-45 text-5xl select-none">
      👑
    </div> -->
    <!-- Fix this throwing off non admin positioning -->
    <div class="w-fit text-8xl pb-2 select-none">
      {{ compPlayerInfo.playerEmoji }}
    </div>
     <div class="text-base font-bold min-h-[32px] flex justify-center items-center">{{ compPlayerInfo.playerName }}<span class="text-2xl pl-2" v-if="compPlayerInfo.playerModStatus">👑</span></div>
  </div>
</template>

<script>
export default {
  name: "playerComp",
  data() {
    return {};
  },
  props: { compPlayerInfo: { type: Object } },
  methods: {},
};
</script>
