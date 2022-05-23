import { defineStore } from "pinia";

export const usePlayerInfo = defineStore({
  id: "playerInfo",
  state: () => {
    return { playerEmoji: "", playerName: "", playerID:"", playerModStatus: Boolean,};
  },
  getters: {},
  actions: {},
});

export const useRoomInfo = defineStore({
  id: "roomInfo",
  state: () => {
    return {roomID: "", roomSettings:{rounds:"",time:"",theme:""}, members: []};
  },
  getters: {},
  actions: {},
});

export const useSocket = defineStore({
  id: "socketObject",
  state: () => {
    return {socketObject: null};
  },
  getters: {},
  actions: {},
});