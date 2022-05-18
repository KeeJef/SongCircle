<template>
  <div
    class="container max-w-[490px] bg-white rounded flex-col justify-center sm:place-self-start px-2 py-2 m-1">
    <div class="text-4xl pb-3">Settings</div>
    <div class="text-left"><b>Rounds</b></div>
    <selectSettings :options=[1,2,3,4,5] :isAdmin="this.isAdmin"></selectSettings>
    <div class="text-left"><b>Music Selection time</b></div>
    <selectSettings :options="['30 Seconds', '60 Seconds', '120 Seconds']" :isAdmin="this.isAdmin"></selectSettings>
    <div class="text-left"><b>Theme</b></div>
    <selectSettings :options="['None','Rock Anthems','Pop Anthems','Rap Music','Electronic Music','Classical Music','Indie Music','Country Music','Musicals','Video Game Music','70s Music','80s Music','90s Music','00s Music','10s Music']" :isAdmin="this.isAdmin"></selectSettings>
    <div>
      <button
        @click="$router.push('lobby')"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Game
      </button>
    </div>
  </div>
</template>

<script>
import selectSettings from "./selectSettings";

export default {
  name: "lobbySettings",
  data() {
    return {
      
    };
  },
  components: {
    selectSettings,
  },
  props: {
    isAdmin: { type: Boolean },
  },
  methods: {},
};
</script>
