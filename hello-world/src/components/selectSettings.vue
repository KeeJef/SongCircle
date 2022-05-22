<template>
  <select v-model="selectedOption" @input="updateSelection()" :disabled="!isAdmin" :class="{ 'form-select w-full px-3 py-2 my-2 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500': isAdmin, 'w-full px-3 py-2 my-2 bg-slate-300 border-2 border-gray-300 rounded-lg cursor-not-allowed': !isAdmin }">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option">{{option}}</option>
  </select>
</template>

<script>
export default {
  name: "SelectSettings",
  data() {
    return {
      selectedOption: ""
    };
  },
  props: {
    options: { type: Array },
    presets: { type: Array },
    default: { type: String },
    isAdmin: { type: Boolean },
  },
  methods: {
    updateSelection() {
      this.$emit("input", this.selectedOption);
    },
  },
  mounted() {
    this.selectedOption = this.default;
  },
};
</script>
