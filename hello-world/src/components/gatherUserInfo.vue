<template>
  <div
    class="container max-w-[490px] bg-white rounded flex-col justify-center mx-auto px-2 py-2 m-1">
    <div class="">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :placeholder=this.placeHolderInfo :class="{ 'border border-rose-500': failedNameCheck }"
        id="username"
        type="text"
        autocomplete="off"
        v-model="playerInfo.playerName" />
    </div>

    <div class="flex justify-center py-10">
      <div
        class="text-5xl cursor-pointer select-none pr-10"
        @click="pickEmoji(false)">
        &lt;
      </div>
      <div class="text-8xl min-w-[30%] select-none">
        {{ playerInfo.playerEmoji }}
      </div>
      <div
        @click="pickEmoji(true)"
        class="text-5xl cursor-pointer select-none pl-10">
        &gt;
      </div>
    </div>

    <div>
      <button
        @click="validateName"
        type="button"
        class="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        {{this.buttonName}}
      </button>
    </div>
  </div>

  <div
    class="container max-w-[490px] bg-white rounded text-left flex-col justify-center mx-auto px-2 py-2">
    <basicAccordion :isOpenInit="true" class="">
      <template v-slot:title>
        <span class="text-2xl mt-0 mb-2 font-bold hover:underline">News</span>
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
        <span class="text-2xl mt-0 mb-2 font-bold hover:underline">About</span>
      </template>
      <template v-slot:content>
        <div>About info</div>
      </template>
    </basicAccordion>

    <basicAccordion :isOpenInit="false" class="">
      <template v-slot:title>
        <span class="text-2xl mt-0 mb-2 font-bold hover:underline"
          >How to play</span
        >
      </template>
      <template v-slot:content>
        <div>How to play info</div>
      </template>
    </basicAccordion>
  </div>
</template>

<script>
import { emojiList } from "../composables/externalFunctions.js";
import { usePlayerInfo } from "@/store/index";
import basicAccordion from "./basicAccordion";

export default {
  name: "gatherUserInfo",
  setup() {
    const playerInfo = usePlayerInfo();
    return { playerInfo };
  },
  data() {
    return {
      failedNameCheck: false,
      emojiArrayPosition: 0,
      shuffledEmojiList: [],
      placeHolderInfo: "Enter your name"
    };
  },
  components: {
    basicAccordion,
  },
  props: {
    buttonName: String,
    nextRoute: String,
    modStatus: Boolean,
  },
  methods: {
    //function for picking random emoji
    pickEmoji(direction) {
      if (
        direction &&
        this.emojiArrayPosition < this.shuffledEmojiList.length
      ) {
        this.emojiArrayPosition++;
        this.playerInfo.playerEmoji =
          this.shuffledEmojiList[this.emojiArrayPosition];
      } else if ((direction == false) & (this.emojiArrayPosition > 0)) {
        this.emojiArrayPosition--;
        this.playerInfo.playerEmoji =
          this.shuffledEmojiList[this.emojiArrayPosition];
      }
    },
    validateName() {
      if (this.playerInfo.playerName) {
        if (this.playerInfo.playerName.length <10) {
          this.$router.push(this.nextRoute);
        }
        else{
          this.playerInfo.playerName = ""
          this.placeHolderInfo = "Name must be less than 10 characters";
          this.failedNameCheck = true;
        }
        
      } else {
        this.failedNameCheck = true;
      }
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
  },
  async mounted() {
    this.shuffledEmojiList = await this.shuffleArray(emojiList);
    this.playerInfo.playerModStatus = this.modStatus;
    this.playerInfo.playerEmoji =
    this.shuffledEmojiList[this.emojiArrayPosition];

    window.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        this.validateName();
      }
    });
  },
};
</script>
