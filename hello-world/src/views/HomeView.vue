<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."><img src="../assets/songcirclealt.png" alt="SongCircle Logo"/></a>
    </div>
    <gatherUserInfo buttonName="Create New Room" nextRoute="lobby" :modStatus="true"></gatherUserInfo>
    <footer class="mt-3">
      <div class="flex flex-row justify-center gap-2">
        <a href="https://twitter.com/jefferyskee" class="contents underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
      <img src="../assets/twitter.png" alt="Twitter logo"/>Made by @keejef
      </a>
      </div>
      <div class="flex flex-row justify-center gap-3">
        <div>
          <a class="contents underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://github.com/KeeJef/MessengerMeta/blob/master/MessengerKey.md">Contact</a>
        </div>
        <div>|</div>
        <div>
          <a class="contents underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://github.com/KeeJef/SongCircle">Github</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import gatherUserInfo from "../components/gatherUserInfo";

export default {
  name: "HomeView",
  data() {
    return {
    };
  },
  components: {
    gatherUserInfo,
  },
  methods: {

  },
  async mounted() {
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