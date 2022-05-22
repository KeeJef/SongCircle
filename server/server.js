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

  socket.on("setUsername", function (data) {
    console.log(
      "User Joined Room " + data.roomname + " with name " + data.namewanted
    );

    for (let index = 0; index < roomsArray.length; index++) {
      const element = roomsArray[index];
      element.existingroom = false;

      if (element.RoomName == data.roomname) {
        userObject = {
          name: data.namewanted,
          socketid: data.socketid,
          readyStatus: false,
          isLeader: data.isLeader,
          publicKey: data.publicKey,
          signers: data.signersNumber,
          threshold: data.thresholdNumber,
          roomFullStatus: false,
        };
        element.members.push(userObject);
        return;
      }
    }
  });

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

  socket.on("setUsernameExisting", function (data) {
    console.log(
      "User Joined Room " + data.roomname + " with name " + data.pubKey
    );

    for (let index = 0; index < roomsArray.length; index++) {
      const element1 = roomsArray[index];
      element1.existingroom = true;

      if (element1.RoomName == data.roomname) {
        infoGroup = JSON.parse(data.infoGroup);

        for (let index = 0; index < infoGroup.signingKeys.length; index++) {
          element = infoGroup.signingKeys[index];

          //SocketIDS are mapped here which ingores actual socket ID's
          userObject = {
            name: data.namewanted,
            publicKey: element,
            socketid: data.socketid,
            isLeader: data.isLeader,
            signers: infoGroup.numberOfSigners,
            threshold: infoGroup.thresholdNumber,
            roomFullStatus: false,
            joinstatus: false,
          };
          if (data.pubKey == element) {
            userObject.joinstatus = true; //detects who caller is
          }
          element1.members.push(userObject);
        }

        return;
      }
    }
  });

  //move logic for creation of random room to serverside

  socket.on("createNewRoom", function () {
    roomID = Math.random().toString(36).substr(2, 7);
    console.log("a new room was created with the name " + roomID);
    socket.join(roomID);

    var roomObject = { roomID: roomID, roomSettings:{rounds:"",time:"",theme:""}, members: [] };
    roomsArray.push(roomObject);

    try {
       socket.emit("returnRoomID", roomObject)
    } catch (error) {
       console.log(error);
    }
    
  });

   socket.on("joinRoom", function (playerInfo,roomID) {
      try {
         for (let index = 0; index < roomsArray.length; index++) {
            const element = roomsArray[index];
   
            if (element.roomID == roomID) {
               element.members.push(playerInfo)
               socket.emit("returnMembers", element.members)
            }
            
         }
         
      } catch (error) {
         console.log("Failure add users to the room " + error)
      }

      console.log("Added user to room " + roomID);
   });

   socket.on("updateRoomSettings", function (roomInfo) {

      try {
         for (let index = 0; index < roomsArray.length; index++) {
            const element = roomsArray[index];
   
            if (element.roomID = roomInfo.roomID) {
               element.roomSettings = roomInfo.roomSettings;
            }
            
         }
         
      } catch (error) {
         console.log("Failure to update room " + error)
      }
      console.log("Updated Room Settings")
   });


  socket.on("getUsers", function (data) {
    for (let index = 0; index < roomsArray.length; index++) {
      const element = roomsArray[index];

      if (element.RoomName == data.roomid) {
        server.sockets
          .in(data.roomid)
          .emit("getUsers", { userlist: element.members });
        return;
      }
    }
  });

  socket.on("getExistingUsers", function (data) {
    for (let index = 0; index < roomsArray.length; index++) {
      const element = roomsArray[index];

      if (element.RoomName == data.roomid) {
        server.sockets
          .in(data.roomid)
          .emit("getLoadedUsers", { userlist: element.members });
        return;
      }
    }
  });

  socket.on("readyUp", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomname) {
        for (let index = 0; index < room.members.length; index++) {
          if (room.members[index].socketid == socket.id) {
            roomsArray[index1].members[index].readyStatus = true;
            server.sockets
              .in(data.roomname)
              .emit("getUsers", { userlist: roomsArray[index1].members }); //dont fire get users in existing group
            return;
          }
        }
      }
    }
  });

  socket.on("readyUpExisting", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomname) {
        for (let index = 0; index < room.members.length; index++) {
          if (room.members[index].socketid == socket.id) {
            roomsArray[index1].members[index].readyStatus = true;
            server.sockets
              .in(data.roomname)
              .emit("getLoadedUsers", { userlist: roomsArray[index1].members }); //dont fire get users in existing group
            return;
          }
        }
      }
    }
  });

  socket.on("roomFull", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomname) {
        for (let index = 0; index < room.members.length; index++) {
          room.members[index].roomFullStatus = true;
        }

        server.sockets
          .in(data.roomname)
          .emit("getUsers", { userlist: roomsArray[index1].members });
      }
    }
  });

  socket.on("roomFullExisting", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomname) {
        for (let index = 0; index < room.members.length; index++) {
          room.members[index].roomFullStatus = true;
        }

        server.sockets
          .in(data.roomname)
          .emit("getLoadedUsers", { userlist: roomsArray[index1].members });
      }
    }
  });

  socket.on("checkCorrectRoom", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomid) {
        for (let index = 0; index < room.members.length; index++) {
          if (data.publicKey == room.members[index].publicKey) {
            room.members[index].joinstatus = true;
            room.members[index].socketid = socket.id;
            return;
          }
        }

        server.to(socket.id).emit("wrongKeyEvent", true);
      }
    }
  });

  socket.on("checkRoom", function (data) {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      room = roomsArray[index1];

      if (room.RoomName == data.roomid) {
        for (let index = 0; index < room.members.length; index++) {
          if (room.members[index].roomFullStatus == true) {
            server.to(socket.id).emit("roomFullEvent", true);
            return;
          }
        }
        server.to(socket.id).emit("roomFullEvent", false);
      }
    }
  });

  socket.on("disconnect", function () {
    for (let index1 = 0; index1 < roomsArray.length; index1++) {
      const membersArray = roomsArray[index1].members;

      for (let index2 = 0; index2 < membersArray.length; index2++) {
        const element = membersArray[index2];

        if (element.socketid == socket.id) {
          console.log(
            "Removed User " + roomsArray[index1].members[index2].name
          );
          roomsArray[index1].members.splice(index2, 1);

          if (roomsArray[index1].members.length == 0) {
            console.log("Removed Empty Room " + roomsArray[index1].RoomName);
            roomsArray.splice(index1, 1);
            return;
          }

          if (roomsArray[index1].existingroom == true) {
            server.sockets
              .in(roomsArray[index1].RoomName)
              .emit("getLoadedUsers", { userlist: roomsArray[index1].members });
          } else {
            server.sockets
              .in(roomsArray[index1].RoomName)
              .emit("getUsers", { userlist: roomsArray[index1].members });
          }
        }
      }
    }
  });

  socket.on("msg", function (data) {
    //Send message to everyone
    server.sockets
      .in(data.roomid)
      .emit("newmsg", {
        msg: data.message,
        publicKey: data.publicKey,
        signature: data.signature,
        leaderstatus: data.leaderstatus,
        arrayPosition: data.arrayPosition,
      });
  });
});
