<template>
  <div
    class="container max-w-[490px] bg-slate-200 rounded flex-col justify-center mx-auto px-2 py-2 m-1">
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
      <div class="text-8xl min-w-[30%] select-none">{{ playerEmoji }}</div>
      <div
        @click="pickRandomEmoji"
        class="text-5xl cursor-pointer select-none pl-10">
        &gt;
      </div>
    </div>

    <div>
      <button @click="$router.push ('lobby')"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create New Room
      </button>
    </div>
  </div>

  <div
    class="container max-w-[490px] bg-slate-200 rounded text-left flex-col justify-center mx-auto px-2 py-2">
    <basicAccordion :isOpenInit="true" class="">
      <template v-slot:title>
        <span class="text-2xl mt-0 mb-2 font-bold">News</span>
      </template>
      <template v-slot:content>
        <div
          class="container bg-green-200 rounded flex-col text-left mx-auto px-2 py-2 m-1">
          <div class="pb-3">Hello</div>
          We added:
          <ul class="list-disc list-inside pl-3 pb-3">
            <li>
              <b>New Languages:</b> Italian, Estonian, Korean, Hungarian and
              Tagalog.
            </li>
            <li>
              More player support with up to <b>12</b> players in private rooms!
            </li>
            <li><b>Custom words</b> in private rooms.</li>
            <li><b>Custom drawing</b> time in private rooms</li>
          </ul>
          Please check out the new languages and report any spelling issues if
          you like!
        </div>
      </template>
    </basicAccordion>

    <basicAccordion :isOpenInit="false" class="">
      <template v-slot:title>
        <span class="text-2xl mt-0 mb-2 font-bold">About</span>
      </template>
      <template v-slot:content>
        <div>About info</div>
      </template>
    </basicAccordion>

    <basicAccordion :isOpenInit="false" class="">
      <template v-slot:title>
        <span class="text-2xl mt-0 mb-2 font-bold">How to play</span>
      </template>
      <template v-slot:content>
        <div>How to play info</div>
      </template>
    </basicAccordion>
  </div>
</template>

<script>
import { emojiList } from "../composables/externalFunctions.js";
import basicAccordion from "./basicAccordion";

export default {
  name: "gatherUserInfo",
  data() {
    return {
      playerEmoji: "",
    };
  },
  components: {
    basicAccordion,
  },
  methods: {
    //function for picking random emoji
    pickRandomEmoji() {
      this.playerEmoji =
        emojiList[Math.floor(Math.random() * emojiList.length)];
    },
  },
  async mounted() {
    this.pickRandomEmoji();
  },
};
</script>
