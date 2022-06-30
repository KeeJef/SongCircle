const axios = require("axios").default;
const io = require("socket.io")({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server = io.listen(8000);
console.log("Running on port " + 8000);

roomsArray = []; //This is all being stored in memory which is bad
server.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("searchMusic", async function (searchString) {
    console.log("Searching for " + searchString);
    packagedResponse = [];

    try {
      var response = await axios.get(
        "https://tools.applemediaservices.com/api/apple-media/music/US/search.json?types=songs,albums,music-videos,playlists,artists,stations&term=" +
          searchString +
          "&limit=6&l=en-US"
      );
    } catch (error) {
      console.log(error);
      return;
    }

    try {
      for (let index = 0; index < response.data.songs.data.length; index++) {
        const element = response.data.songs.data[index].attributes;

        albumArtTransform = element.artwork.url;
        albumArtTransform = albumArtTransform
          .replace("{w}", "400")
          .replace("{h}", "400");

        songObject = {
          id: index,
          artistName: element.artistName,
          songID: Math.floor(Math.random() * 1000000).toString().padStart(6, "0"),
          songName: element.name,
          songPreviewUrl: element.previews[0].url,
          albumArt: albumArtTransform,
        };

        packagedResponse.push(songObject);
      }

      socket.emit("searchResults", packagedResponse);
    } catch (error) {
      console.log(error);
      socket.emit("searchResults", "Could not find any results");
    }
  });

  //move logic for creation of random room to serverside

  socket.on("createNewRoom", function () {
    roomID = Math.random().toString(36).substr(2, 7);
    console.log("a new room was created with the name " + roomID);

    var roomObject = {
      roomID: roomID,
      gameInProgress: false,
      votingMode: false,
      currentVoteRound: 0,
      roomSettings: { rounds: "3", time: "30 Seconds", theme: "Rock Anthems" },
      members: [],
      selectedSongs: [],
      scoreboard: [],
    };
    roomsArray.push(roomObject);

    try {
      socket.emit("returnRoomID", roomObject);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("joinRoom", function (playerInfo, roomID) {
    try {
      socket.join(roomID);
      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];
        if (element.roomID == roomID) {
          //check if playerID is already in room 

          if (element.members.find(player => player.playerID == playerInfo.playerID)) {
            server.sockets.in(roomID).emit("returnMembers", element.members);
            server.sockets.in(roomID).emit("newSettings", element.roomSettings, element.gameInProgress);
            return;
          }

          element.members.push(playerInfo);
          element.scoreboard.push({playerName:playerInfo.playerName, playerEmoji:playerInfo.playerEmoji, playerID: playerInfo.playerID, score: 0, winArray:[]})
          //socket.emit("returnMembers", element.members)
          server.sockets.in(roomID).emit("returnMembers", element.members);
          //make sure users who join the room when the host is using default settings get current settings
          server.sockets
            .in(roomID)
            .emit("newSettings", element.roomSettings, element.gameInProgress);
          return;
        }
      }
    } catch (error) {
      console.log("Failure add users to the room " + error);
    }

    console.log("Added user to room " + roomID);
  });

  socket.on("updateRoomSettings", function (roomSettings, roomID) {
    try {
      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];
        

        if (element.roomID == roomID) {
          element.roomSettings = roomSettings;
          server.sockets.in(roomID).emit("newSettings", element.roomSettings);
          console.log("Updated Room Settings");
          return;
        }
      }
    } catch (error) {
      console.log("Failure to update room " + error);
    }
  });

  socket.on("vote", function (roomID, voteObject) {
    try {
      for (let i = 0; i < roomsArray.length; i++) {
        const room = roomsArray[i];

        if ((room.roomID = roomID)) {
          for (let j = 0; j < room.selectedSongs.length; j++) {
            const songObject = room.selectedSongs[j];

            if (songObject.selectedSong.songID == voteObject.songID) {
              songObject.voteArray.push(voteObject);
              server.sockets.in(roomID).emit("newVote", voteObject.voteBy);

              if (songObject.voteArray.length == room.members.length) {
                room.currentVoteRound ++;

                if (room.currentVoteRound >= room.selectedSongs.length) {
                  calculateScoreboard(room.selectedSongs, room.scoreboard);
                  server.sockets.in(roomID).emit("nextRound", room.scoreboard);
                }

                server.sockets.in(roomID).emit("nextVote");
              }
              return
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  });

  socket.on("startGame", function (roomID) {
    try {
      server.sockets.in(roomID).emit("startGameEvent");

      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];

        if (element.roomID == roomID) {
          element.gameInProgress = true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("nextReveal", function (roomID) {
    try {
      server.sockets.in(roomID).emit("nextRevealEvent");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("gameOver", function (roomID) {
    try {
      
      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];

        if (element.roomID == roomID) {
          element.gameInProgress = false;
          votingMode = false;
          element.currentVoteRound = 0;
          element.selectedSongs = [];
          for (let i = 0; i < element.scoreboard.length; i++) {
            element.scoreboard[i].winArray = [];
            element.scoreboard[i].score = 0;
          }
        }
      }
      server.sockets.in(roomID).emit("gameOverEvent");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("startNewRound", function (roomID) {
    // clear any info from previous round. PlayerSongSelected, ShuffledSongs, scoreboard[index].voteArray clear

    for (let index = 0; index < roomsArray.length; index++) {
      const element = roomsArray[index];

      if (element.roomID == roomID) {
        element.selectedSongs = []
        element.currentVoteRound = 0;
        //for element.scoreboard clear winArray
        for (let i = 0; i < element.scoreboard.length; i++) {
          element.scoreboard[i].winArray = [];
        }
        
      }
    }

    server.sockets.in(roomID).emit("startNewRoundEvent");
  });

  socket.on("nextGame", function (roomID) {
    try {
      server.sockets.in(roomID).emit("nextGameEvent");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("songChosen", function (selectedSong, roomID, playerID) {
    // check array for previously selected song from user, if yes replace it, if no add it to array, then check if each member has playerSongSelected = true, if yes then randomise the array and start the game

    for (let index = 0; index < roomsArray.length; index++) {
      serverRoom = roomsArray[index];
      songObject = {selectedSong:selectedSong, voteArray:[]}

      if ((serverRoom.roomID = roomID)) {
        for (
          let index2 = 0;
          index2 < serverRoom.selectedSongs.length;
          index2++
        ) {
          serverSelectedSong = serverRoom.selectedSongs[index2];
          if (serverSelectedSong.selectedSong.playerID == playerID) {
            serverRoom.selectedSongs.splice(index2, 1);
            serverRoom.selectedSongs.push(songObject);

            server.sockets.in(roomID).emit("newSong", playerID);
            return;
          }
        }
        serverRoom.selectedSongs.push(songObject);
        server.sockets.in(roomID).emit("newSong", playerID);

        if (serverRoom.members.length == serverRoom.selectedSongs.length) {
          console.log("All players have selected a song");
          serverRoom.selectedSongs = shuffleArray(serverRoom.selectedSongs);
          server.sockets
            .in(roomID)
            .emit("startRound", serverRoom.selectedSongs);
            serverRoom.votingMode = true;
          return;
        }
        return;
      }
    }
  });

    //function to check whether user is still in room or has disconnected and needs to be added back

    socket.on("kickUser", function (roomID, playerID) {   
      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];

        if (element.roomID == roomID) {
          for (let i = 0; i < element.members.length; i++) {
            const member = element.members[i];

            if (member.playerID == playerID) {
              element.members.splice(i, 1);
              server.sockets.in(roomID).emit("returnMembers", element.members);
              console.log("User has been removed from room");
              server.sockets.in(roomID).emit("kickedMember", member.playerID);
              return
            }
          }
          
          return
        }
      }
    });

    //reconnect, shiuld just socket join if local storage has existing room 

    socket.on("reconnect", function (roomID) {
      console.log("user reconnected")
      socket.join(roomID);
    });

  socket.on("disconnect", function () {
    console.log("user disconnected");
    for (let i = 0; i < roomsArray.length; i++) {
      const room = roomsArray[i];

      for (let j = 0; j < room.members.length; j++) {
        const member = room.members[j];

        if (member.playerSocketID == socket.id) {
          //Probably need to kill inactive players after like 30 mins

          // room.members.splice(j, 1);
          // server.sockets.in(roomID).emit("returnMembers", room.members);

          // if (room.members.length == 0) {
          //   roomsArray.splice(i, 1);
          //   console.log("Room Deleted");
          // }

          return;
        }
      }
    }
  });
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function calculateScoreboard(selectedSongs, scoreboard) {

  for (let i = 0; i < selectedSongs.length; i++) {
    const song = selectedSongs[i];

    for (let j = 0; j < song.voteArray.length; j++) {
      const songVote = song.voteArray[j];

      if (songVote.voteBy == songVote.voteFor) {
        //dont score votes for self
        continue
      }

      if (songVote.voteFor == song.selectedSong.playerID) {
        objIndex = scoreboard.findIndex((obj => obj.playerID == songVote.voteBy));
        scoreboard[objIndex].winArray.push(song.selectedSong.songID);
        scoreboard[objIndex].score += 10;
      }
        
      }
      
    }

}

