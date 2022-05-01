<template>
  <div class="p-2 flex flex-col sm:flex-row justify-center items-center">
      <lobbySettings></lobbySettings>
      <avatarLobbyDisplay></avatarLobbyDisplay>
  </div>
</template>

<script>
import lobbySettings from "../components/lobbySettings.vue";
import avatarLobbyDisplay from "../components/avatarLobbyDisplay.vue";

export default {
  name: "LobbyView",
  data() {
    return {
    };
  },
  components: {
    lobbySettings,
    avatarLobbyDisplay,
  },
  methods: {

  },
  async mounted() {


  },
};
</script>

<style>

</style>