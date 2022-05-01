<template>
  <div>
    <button
      @click="toggleAccordion()"
      class="flex items-center space-x-3"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`">
      <slot name="title" />
    </button>

    <div v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: this.isOpenInit
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
