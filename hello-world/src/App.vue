<template>
<body class="p-2">
  

  <div id="logo" class="container flex justify-center mx-auto pb-5">
    <img
      src="./assets/songcircle.png"
      alt="SongCircle Logo"
    />
  </div>

  <div class="container max-w-[490px] bg-slate-200 rounded flex-col justify-center mx-auto px-2 py-2 m-1">
    <div class="">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your name" autocomplete="off"/>
    </div>

    <div class="flex justify-center py-10">
      <div class="text-5xl cursor-pointer select-none pr-10">&lt;</div>
    <div class="text-8xl min-w-[30%] select-none">{{ playerEmoji }}</div>
      <div @click="pickRandomEmoji" class="text-5xl cursor-pointer select-none pl-10">&gt;</div>
    </div>

    <div><button type="button" class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Play</button></div>
    
  </div>

   <div class="container max-w-[490px] bg-slate-200 rounded flex-col justify-center mx-auto px-2 py-2">
    
    <div>News</div>
    <div>About</div>
    <div>How to Play</div>
  </div>

  <hello-world></hello-world>
  </body>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { emojiList } from "./composables/externalFunctions.js";


export default {
  name: "App",
  data() {
    return {
      playerEmoji: "",
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    //function for picking random emoji
    pickRandomEmoji() {
      this.playerEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    },
  },
      async mounted() {
      this.pickRandomEmoji()
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
