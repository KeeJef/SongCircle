<template>
    <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
      <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo"/></a>
    </div>
  <div class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      <lobbySettings :isAdmin="true"></lobbySettings>
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