<template>
    <div id="logo" class="px-2 container flex justify-center mx-auto pb-5">
      <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo"/></a>
    </div>
      <div class="p-2 flex flex-col sm:flex-row sm:flex items-center justify-center">
    <searchComp></searchComp>
  </div>


</template>

<script>
import SearchComp from "../components/searchComp.vue";
import io from "socket.io-client";
import {url, socketsServerPort} from "@/store/index";

export default {
  name: "SearchView",
  data() {
    return { 
      socket: Object 
      };
  },
  components: {
    SearchComp,
  },
  methods: {
    async getSongs() {
      this.socket.emit("searchMusic", "heart+shaped+box");
    },
  },
  async mounted() {
//fix this by passing active socket, do not create new socket
     try {
      this.socket = await io(url+":"+socketsServerPort);
    } catch (error) {
      console.log(error);
    }

   this.socket.on('searchResults', (data) => {
      console.log(data)
  })
  },
}
</script>
