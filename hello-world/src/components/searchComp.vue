<template>
  <div
    class="container min-h-[342px] max-w-[980px] bg-white rounded px-2 py-2 m-1">
    <div class="text-4xl pb-3">Search for a song</div>
    <div class="flex justify-center py-3">
      <input
        class="basis-2/4 shadow appearance-none border max-w-[590px] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter your name"
        autocomplete="off"
        @keydown.enter="getSongs"
        v-model="searchTerm" />
      <button
        @click="getSongs"
        type="button"
        class="basis-1/12 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
        Search
      </button>
    </div>
    <div>
      <img :src="this.searchResults[0].albumArt" alt="Album Artwork">
      {{this.searchResults}}
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "SearchComp",
  data() {
    return {
      searchTerm: "",
      socket: Object,
      searchResults:[{
        albumArt: "",
      }]
    };
  },
  props: {},
  methods: {
    async getSongs() {
      var transformedSearchTerm = this.searchTerm.replace(/\s/g, "+");
      this.socket.emit("searchMusic", transformedSearchTerm);
    },
    async processSearchResults(data) {
      this.searchResults = data;
    }
  },
  async mounted() {
    try {
      this.socket = await io("http://localhost:8000");
    } catch (error) {
      console.log(error);
    }

    this.socket.on("searchResults", (data) => {
      this.processSearchResults(data);
    });
  },
};
</script>
