<template>
  <div
    class="container min-h-[150px] max-w-[935px] bg-white rounded px-2 py-2">
    <div class="text-4xl py-3 select-none">Search for a song</div>
    <div class="flex justify-center py-3 gap-1">
      <input
        class="basis-2/4 shadow appearance-none border max-w-[590px] rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        @keyup.enter="getSongs"
        placeholder="Enter your name"
        autocomplete="off"
        v-model="searchTerm" />
      <button
        @click="getSongs"
        type="button"
        class="basis-1/12 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
        :class="{ 'animate-pulse': ongoingSearch }">
        Search
      </button>
    </div>
    <div
      v-if="this.dataFetchStatus"
      class="flex flex-wrap justify-center cursor-pointer">
      <searchItem
        v-for="searchResultData in searchResults"
        :key="searchResultData.id"
        :songName="searchResultData.songName"
        :artistName="searchResultData.artistName"
        :albumArt="searchResultData.albumArt"
        :url="searchResultData.songPreviewUrl"
         />
    </div>

    <div
      v-else
      class="flex flex-wrap justify-center"
      :class="{ 'animate-pulse': ongoingSearch }">
      <searchPlaceholder v-for="index in 6" :key="index" />
    </div>
  </div>
</template>

<script>
import searchItem from "../components/searchItem.vue";
import SearchPlaceholder from "../components/searchPlaceholder.vue";
import { useSocket } from "@/store/index";

export default {
  name: "SearchComp",
  setup() {
    const socketStore = useSocket();
    return { socketStore };
  },
  data() {
    return {
      searchTerm: "",
      dataFetchStatus: false,
      ongoingSearch: false,
      searchResults: [{}],
    };
  },
  props: {},
  methods: {
    async getSongs() {
      this.ongoingSearch = true;
      this.dataFetchStatus = false;
      this.searchResults = [{}];
      var transformedSearchTerm = this.searchTerm.replace(/\s/g, "+");
      try {
        this.socketStore.socketObject.emit(
          "searchMusic",
          transformedSearchTerm
        );
      } catch (error) {
        console.log("Failed to search for songs" + error);
      }
    },
    async processSearchResults(data) {
      this.searchResults = data;
    },

  },
  components: {
    searchItem,
    SearchPlaceholder,
  },
  async mounted() {
    //remove this in favor of global socket

    this.socketStore.socketObject.on("searchResults", (data) => {
      this.processSearchResults(data);
      this.ongoingSearch = false;
      this.dataFetchStatus = true;
    });
  },
};
</script>
