<template>
  <div>
    <button
      @click="toggleAccordion()"
      class="flex items-center space-x-3"
      :aria-expanded="isOpen"
      >
      <slot name="title" />
    </button>

    <div v-show="isOpen">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
    name: "basicAccordion",
  data() {
    return {
      isOpen: this.isOpenInit,
    };
  },
props: {
  isOpenInit: {
    type: Boolean,
  },
},
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
