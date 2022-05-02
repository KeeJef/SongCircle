import { defineStore } from "pinia";

export const usePlayerInfo = defineStore({
  id: "playerInfo",
  state: () => {
    return { playerEmoji: "", playerName: "", playerModStatus: "true" };
  },
  getters: {},
  actions: {},
});
