<template>
  <searchComp></searchComp>
  <div>Search</div>
  <!-- <iframe
    src="https://embed.music.apple.com/us/album/heart-shaped-box/1440858699?i=1440859107&amp;app=music&amp;itsct=music_box_player&amp;itscg=30200&amp;ls=1"
    height="175px"
    frameborder="0"
    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
    allow="autoplay *; encrypted-media *;"
    style="
      width: 100%;
      max-width: 660px;
      overflow: hidden;
      border-radius: 10px;
      background: transparent;
    "></iframe> -->

    <button
        @click="getSongs"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Search
      </button>

  <audio controls="">
    <source
      src="https://audio-ssl.itunes.apple.com/itunes-assets/Music7/v4/3a/a3/01/3aa30184-78e2-7030-c6e0-d33f3d3e21b7/mzaf_3396140578378232458.plus.aac.p.m4a" />
  </audio>
</template>

<script>
import SearchComp from "../components/searchComp.vue";
import io from "socket.io-client";

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

     try {
      this.socket = await io("http://localhost:8000");
    } catch (error) {
      console.log(error);
    }

    this.socket.addEventListener({
      type: 'searchResults',
      callback: (message) => {
        console.log('test' + message);
      }
    });
  },
}
</script>
