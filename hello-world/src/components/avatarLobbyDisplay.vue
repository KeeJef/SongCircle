<template>
  <div
    class="container max-w-[490px] min-h-[222px] bg-slate-200 rounded flex-col justify-center px-2 py-2 m-1">
    <div class="">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter your name"
        autocomplete="off" />
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
    name: "avatarLobbyDisplay",
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
