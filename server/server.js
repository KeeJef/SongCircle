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

    for (let index = 0; index < response.data.songs.data.length; index++) {
      const element = response.data.songs.data[index].attributes;

      albumArtTransform = element.artwork.url;
      albumArtTransform = albumArtTransform
        .replace("{w}", "230")
        .replace("{h}", "230");

      songObject = {
        id: index,
        artistName: element.artistName,
        songName: element.name,
        songPreviewUrl: element.previews[0].url,
        albumArt: albumArtTransform,
      };

      packagedResponse.push(songObject);
    }

    socket.emit("searchResults", packagedResponse);
  });

  //move logic for creation of random room to serverside

  socket.on("createNewRoom", function () {
    roomID = Math.random().toString(36).substr(2, 7);
    console.log("a new room was created with the name " + roomID);

    var roomObject = {
      roomID: roomID,
      roomSettings: { rounds: "3", time: "30 Seconds", theme: "None" },
      members: [],
      selectedSongs: [],
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
          playerInfo.playerSocketID = socket.id;
          element.members.push(playerInfo);
          //socket.emit("returnMembers", element.members)
          server.sockets.in(roomID).emit("returnMembers", element.members);
          //make sure users who join the room when the host is using default settings get current settings
          server.sockets.in(roomID).emit("newSettings", element.roomSettings);
        }
      }
    } catch (error) {
      console.log("Failure add users to the room " + error);
    }

    console.log("Added user to room " + roomID);
  });

  socket.on("updateRoomSettings", function (roomInfo) {
    try {
      for (let index = 0; index < roomsArray.length; index++) {
        const element = roomsArray[index];
        console.log(socket.id);

        if ((element.roomID = roomInfo.roomID)) {
          element.roomSettings = roomInfo.roomSettings;
          server.sockets
            .in(roomInfo.roomID)
            .emit("newSettings", element.roomSettings);
          console.log("Updated Room Settings");
        }
      }
    } catch (error) {
      console.log("Failure to update room " + error);
    }
  });

  socket.on("startGame", function (roomInfo) {
    try {
      server.sockets.in(roomInfo.roomID).emit("startGameEvent");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("songChosen", function (selectedSong, roomInfo, playerSocketID) {
    // check array for previously selected song from user, if yes replace it, if no add it to array, then check if each member has playerSongSelected = true, if yes then randomise the array and start the game

    for (let index = 0; index < roomsArray.length; index++) {
      const element = roomsArray[index];

      if ((element.roomID = roomInfo.roomID)) {

        for (let index2 = 0; index2 < element.selectedSongs.length; index2++) {
          element = element.selectedSongs[index2];
          if (element.playerSocketID == playerSocketID) {
            element.selectedSongs.push(selectedSong);

            server.sockets.in(roomInfo.roomID).emit("newSong", playerSocketID);
            return
          }
            
          }
          element.selectedSongs.push(selectedSong);
          server.sockets.in(roomInfo.roomID).emit("newSong", playerSocketID);

          if (element.members.length == element.selectedSongs.length) {
            console.log("All players have selected a song");
             element.selectedSongs = shuffleArray(element.selectedSongs);
            
            server.sockets.in(roomInfo.roomID).emit("StartRound", selectedSongs);
          }

        }


      }
    }
  );

  socket.on("disconnect", function () {
    for (let i = 0; i < roomsArray.length; i++) {
      const room = roomsArray[i];

      for (let j = 0; j < room.members.length; j++) {
        const member = room.members[j];

        if (member.playerSocketID == socket.id) {
          room.members.splice(j, 1);
          server.sockets.in(roomID).emit("returnMembers", room.members);

          if (room.members.length == 0) {
            roomsArray.splice(i, 1);
            console.log("Room Deleted");
          }

          return;
        }
      }
    }
  });
});

function shuffleArray (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}