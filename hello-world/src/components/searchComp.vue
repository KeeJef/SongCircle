<template>
  <div
    class="container min-h-[150px] max-w-[935px] bg-white rounded px-2 py-2 m-1">
    <div class="text-4xl py-3">Search for a song</div>
    <div class="flex justify-center py-3 gap-1">
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
        class="basis-1/12 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
        :class="{'animate-pulse':ongoingSearch}"
        >
        Search
      </button>
    </div>
    <div v-if="this.dataFetchStatus" class="flex flex-wrap justify-center cursor-pointer">
      <searchItem
        v-for="searchResultData in searchResults"
        :key="searchResultData.id"
        :songName="searchResultData.songName"
        :artistName="searchResultData.artistName"
        :albumArt="searchResultData.albumArt"
        :url="searchResultData.songPreviewUrl"
        @click="storeSelection(searchResultData.songName,searchResultData.artistName,searchResultData.albumArt,searchResultData.songPreviewUrl)" />
    </div>

    <div v-else class="flex flex-wrap justify-center " :class="{'animate-pulse':ongoingSearch}">
    <searchPlaceholder v-for="index in 6"
    :key="index"/>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import searchItem from "../components/searchItem.vue";
import SearchPlaceholder from "../components/searchPlaceholder.vue";
export default {
  name: "SearchComp",
  data() {
    return {
      searchTerm: "",
      socket: Object,
      dataFetchStatus: false,
      ongoingSearch: false,
      searchResults: [{}],
    };
  },
  props: {},
  methods: {
    async getSongs() {
      this.ongoingSearch = true
      this.searchResults = [{}];
      var transformedSearchTerm = this.searchTerm.replace(/\s/g, "+");
      this.socket.emit("searchMusic", transformedSearchTerm);
    },
    async processSearchResults(data) {
      this.searchResults = data;
    },
    async storeSelection(songName,artistName,albumArt,songPreviewUrl) {
      //store this in state or communicate to thing or smth
      console.log(songName,artistName,albumArt,songPreviewUrl); 
    },
  },
  components: {
    searchItem,
    SearchPlaceholder
  },
  async mounted() {
    //remove this in favor of global socket

    try {
      this.socket = await io("http://localhost:8000");
    } catch (error) {
      console.log(error);
    }

    this.socket.on("searchResults", (data) => {
      this.processSearchResults(data);
      this.ongoingSearch = false
      this.dataFetchStatus = true;
    });
  },
};
</script>
