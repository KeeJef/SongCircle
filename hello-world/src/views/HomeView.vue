<template>
  <div class="p-2">
    <div id="logo" class="container flex justify-center mx-auto pb-5">
      <a href="."><img src="../assets/songcircle.png" alt="SongCircle Logo"/></a>
    </div>
    <gatherUserInfo buttonName="Create New Room" nextRoute="lobby" :modStatus="true"></gatherUserInfo>
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