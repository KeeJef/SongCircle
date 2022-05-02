<template>
  <div
    class="container max-w-[490px] bg-white rounded flex-col justify-center px-2 py-2 m-1">
    <div class="">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter your name"
        autocomplete="off" />
    </div>

    <div class="flex justify-center py-10">
      <div class="text-5xl cursor-pointer select-none pr-10">&lt;</div>
      <div class="text-8xl min-w-[30%] select-none"></div>
      <div
        @click="pickRandomEmoji"
        class="text-5xl cursor-pointer select-none pl-10">
        &gt;
      </div>
    </div>

    <div>
      <button
        @click="$router.push('lobby')"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create New Room
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: "lobbySettings",
  data() {
    return {

    };
  },
props: {

},
  methods: {
  },
};
</script>
