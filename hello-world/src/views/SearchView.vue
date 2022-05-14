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

    <audio controls="">
<source src="https://audio-ssl.itunes.apple.com/itunes-assets/Music7/v4/3a/a3/01/3aa30184-78e2-7030-c6e0-d33f3d3e21b7/mzaf_3396140578378232458.plus.aac.p.m4a">
</audio>
    
</template>

<script>
import SearchComp from "../components/searchComp.vue";
import axios from "axios";

export default {
  name: "SearchView",
  data() {
    return {};
  },
  components: {
    SearchComp,
  },
  methods: {
    async getSongs() {

      try {
        var response = await axios.get(
          "https://tools.applemediaservices.com/api/apple-media/music/US/search.json?types=songs,albums,music-videos,playlists,artists,stations&term=heart+shaped+box&limit=5&l=en-US"
        );
      } catch (error) {
        console.log(error);
      }

      console.log(response.data);
    },
  },
  async mounted(
) {
    //this.getSongs()
},
};
</script>
