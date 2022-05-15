<template>
    <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
      <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo"/></a>
    </div>
  <div class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
      JOIN LOBBY
      <lobbySettings :isAdmin="false"></lobbySettings>
      <avatarLobbyDisplay></avatarLobbyDisplay>
  </div>
</template>

<script>
import lobbySettings from "../components/lobbySettings.vue";
import avatarLobbyDisplay from "../components/avatarLobbyDisplay.vue";
import io from 'socket.io-client'

export default {
  name: "JoinLobbyView",
  data() {
    return {
      socket: Object
    };
  },
  components: {
    lobbySettings,
    avatarLobbyDisplay,
  },
  methods: {

  },
  async mounted() {
      //try connecting to the server 
      try {
        this.socket = await io('http://localhost:8000');
      } catch (error) {
        console.log(error);
      }
      
  },

  
};
</script>