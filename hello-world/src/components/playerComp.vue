<template>
  <div class="max-w-[30%]">
    <div class="-rotate-45 text-5xl py-2 min-w-[30%] select-none">👑</div>
    <div class="text-8xl py-2 min-w-[30%] select-none">
      {{ compPlayerInfo.playerEmoji }}
    </div>
    <div class="text-base">{{ compPlayerInfo.playerName }}</div>
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
