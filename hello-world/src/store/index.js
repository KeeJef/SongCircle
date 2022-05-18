import { defineStore } from "pinia";

export const usePlayerInfo = defineStore({
  id: "playerInfo",
  state: () => {
    return { playerEmoji: "", playerName: "", playerModStatus: "true",};
  },
  getters: {},
  actions: {},
});

export const useRoomInfo = defineStore({
  id: "roomInfo",
  state: () => {
    return {roomname: "", roomMembers: []};
  },
  getters: {},
  actions: {},
});

export const useSocket = defineStore({
  id: "socket",
  state: () => {
    return {socketObject: Object};
  },
  getters: {},
  actions: {},
});