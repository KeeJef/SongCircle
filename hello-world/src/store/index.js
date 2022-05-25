import { defineStore } from "pinia";

//export const url = "https://songcircle.xyz";
export const url = "http://localhost";
export const socketsServerPort = 8000;
export const webServerPort = 8080;

export const usePlayerInfo = defineStore({
  id: "playerInfo",
  state: () => {
    return { playerEmoji: "", playerName: "", playerSocketID:null, playerModStatus: Boolean,};
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