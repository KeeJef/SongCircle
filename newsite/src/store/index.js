import { defineStore } from "pinia";

export const url = "https://songcircle.xyz";
//export const url = "http://localhost:8000";

export const usePlayerInfo = defineStore({
  id: "playerInfo",
  state: () => {
    return { playerEmoji: "", playerName: "", playerID:"", playerSocketID:null, playerModStatus: false, playerSongSelected:false};
  },
  getters: {},
  actions: {},
});

export const useRoomInfo = defineStore({
  id: "roomInfo",
  state: () => {
    return {roomID: "", currentRound:0, gameInProgress:false, roomSettings:{rounds:"",time:"",theme:""}, members: [], shuffledSongs:[], scoreboard:[]};
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