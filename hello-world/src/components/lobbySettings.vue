<template>
  <div
    class="container max-w-[490px] bg-white rounded flex-col justify-center sm:place-self-start px-2 py-2 m-1">
    <div class="text-4xl pb-3">Settings</div>
    <div class="text-left"><b>Rounds</b></div>
    <select
      class="form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500"
      aria-label="Default select example">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <div class="text-left"><b>Music Selection time</b></div>
    <select
      class="form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500"
      aria-label="Default select example">
      <option value="30">30 Seconds</option>
      <option value="60">1 Minute</option>
      <option value="120">2 Minutes</option>
    </select>
    <div>
      <button
        @click="$router.push('lobby')"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Start Game
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "lobbySettings",
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>
