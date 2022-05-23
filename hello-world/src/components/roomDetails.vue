<template>
  <div class="container rounded bg-white max-w-[490px] px-2 py-2">
    <div class="text-4xl pb-3">Room Info</div>
    <div class="flex-col">
      <div class="bg-slate-100 rounded w-fit p-2 m-auto">
        <div class="sm:text-2xl text-lg flex justify-center">
          <div class="select-all">{{ baseURLLink }}{{roomID}}</div>
          <span class="pl-2"
            ><svg
              class="h-8 w-8 text-slate-400 hover:bg-slate-200 rounded"
              @click="copyToClipboard"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path
                d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg
          ></span>
        </div>
      </div>
      <qrCodeVue
        class="mt-4 mb-3 inline-flex hover:bg-slate-50"
        @click="qrSizeToggle"
        :value="baseURL + roomID"
        :size="qrSize"
        render-as="svg"
        level="H" />
    </div>
  </div>
</template>

<script>
import qrCodeVue from "qrcode.vue";

export default {
  name: "QR Code Display",
  data() {
    return {
      fadeIn: false,
      qrSize: 280,
      baseURL: "localhost:8080/#/join?",
      // baseURLLink: "https://" + baseURL,
      baseURLLink: "localhost:8080/#/join?",
    };
  },
  components: {
    qrCodeVue,
  },
  props: {
    roomID: { type: String },
  },
  methods: {
    qrSizeToggle() {
      this.qrSize = this.qrSize === 100 ? 280 : 100;
    },
    copyToClipboard() {
      const clipboardData =
    event.clipboardData ||
    window.clipboardData ||
    event.originalEvent?.clipboardData ||
    navigator.clipboard;

      clipboardData.writeText(this.baseURL+this.roomID);
      this.fadeIn = !this.fadeIn
    },
  },
};
</script>
