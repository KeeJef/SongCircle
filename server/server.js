const axios = require('axios').default;
const io = require("socket.io")({
   cors: {
      origin: "*",
      methods: ["GET", "POST"]
   }
});


server = io.listen(8000);
console.log("Running on port " + 8000);

userArrays = []; //This is all being stored in memory which is bad
server.on('connection', function (socket) {
   console.log('A user connected');

   socket.on('setUsername', function (data) {
      console.log("User Joined Room " + data.roomname + " with name " + data.namewanted);

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];
         element.existingroom = false

         if (element.RoomName == data.roomname) {

            userObject = { name: data.namewanted, socketid: data.socketid, readyStatus: false, isLeader: data.isLeader, publicKey: data.publicKey, signers: data.signersNumber, threshold: data.thresholdNumber, roomFullStatus: false }
            element.members.push(userObject);
            return
         }

      }



   });

   socket.on('searchMusic', async function (searchString) {
      console.log("Searching for " + searchString);
      packagedResponse = []

      var response = await axios.get("https://tools.applemediaservices.com/api/apple-media/music/US/search.json?types=songs,albums,music-videos,playlists,artists,stations&term=" + searchString + "&limit=5&l=en-US");

      for (let index = 0; index < response.data.songs.data.length; index++) {
         const element = response.data.songs.data[index].attributes;
         
         albumArtTransform = element.artwork.url
         albumArtTransform = albumArtTransform.replace("{w}", "230").replace("{h}", "230")

         songObject = {
            artistName: element.artistName,
            songName: element.name,
            songPreviewUrl: element.previews[0].url,
            albumArt : albumArtTransform,
         }
         
         packagedResponse.push(songObject)
      }

      socket.emit('searchResults', packagedResponse)
   });

   socket.on('setUsernameExisting', function (data) {
      console.log("User Joined Room " + data.roomname + " with name " + data.pubKey);

      for (let index = 0; index < userArrays.length; index++) {
         const element1 = userArrays[index];
         element1.existingroom = true

         if (element1.RoomName == data.roomname) {

            infoGroup = JSON.parse(data.infoGroup)

            for (let index = 0; index < infoGroup.signingKeys.length; index++) {
               element = infoGroup.signingKeys[index];

               //SocketIDS are mapped here which ingores actual socket ID's 
               userObject = { name: data.namewanted, publicKey: element, socketid: data.socketid, isLeader: data.isLeader, signers: infoGroup.numberOfSigners, threshold: infoGroup.thresholdNumber, roomFullStatus: false, joinstatus: false }
               if (data.pubKey == element) {
                  userObject.joinstatus = true //detects who caller is 
               }
               element1.members.push(userObject);

            }

            return
         }

      }



   });


   socket.on('create', function (room) {
      console.log("a new room was created with the name " + room)
      socket.join(room);

      if (userArrays.length <= 0) {
         var roomObject = { RoomName: room, members: [] };
         userArrays.push(roomObject)
      }

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index].RoomName;

         if (room == element) {//dont recreate already created rooms
            return
         } else {
            var roomObject = { RoomName: room, members: [] };
            userArrays.push(roomObject)
         }

      }

   });

   socket.on('getUsers', function (data) {

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];

         if (element.RoomName == data.roomid) {
            server.sockets.in(data.roomid).emit('getUsers', { userlist: element.members });
            return
         }

      }

   });

   socket.on('getExistingUsers', function (data) {

      for (let index = 0; index < userArrays.length; index++) {
         const element = userArrays[index];

         if (element.RoomName == data.roomid) {
            server.sockets.in(data.roomid).emit('getLoadedUsers', { userlist: element.members });
            return
         }

      }

   });

   socket.on('readyUp', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

            for (let index = 0; index < room.members.length; index++) {

               if (room.members[index].socketid == socket.id) {
                  userArrays[index1].members[index].readyStatus = true
                  server.sockets.in(data.roomname).emit('getUsers', { userlist: userArrays[index1].members }); //dont fire get users in existing group
                  return
               }

            }

         }


      }

   });

   socket.on('readyUpExisting', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

            for (let index = 0; index < room.members.length; index++) {

               if (room.members[index].socketid == socket.id) {
                  userArrays[index1].members[index].readyStatus = true
                  server.sockets.in(data.roomname).emit('getLoadedUsers', { userlist: userArrays[index1].members }); //dont fire get users in existing group
                  return
               }

            }

         }


      }

   });

   socket.on('roomFull', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

            for (let index = 0; index < room.members.length; index++) {

               room.members[index].roomFullStatus = true

            }

            server.sockets.in(data.roomname).emit('getUsers', { userlist: userArrays[index1].members });

         }

      }

   });

   socket.on('roomFullExisting', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomname) {

            for (let index = 0; index < room.members.length; index++) {

               room.members[index].roomFullStatus = true

            }

            server.sockets.in(data.roomname).emit('getLoadedUsers', { userlist: userArrays[index1].members });

         }

      }

   });

   socket.on('checkCorrectRoom', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomid) {

            for (let index = 0; index < room.members.length; index++) {

               if (data.publicKey == room.members[index].publicKey) {
                  room.members[index].joinstatus = true
                  room.members[index].socketid = socket.id
                  return
               }

            }

            server.to(socket.id).emit('wrongKeyEvent', true);

         }

      }

   });

   socket.on('checkRoom', function (data) {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         room = userArrays[index1];

         if (room.RoomName == data.roomid) {

            for (let index = 0; index < room.members.length; index++) {

               if (room.members[index].roomFullStatus == true) {
                  server.to(socket.id).emit('roomFullEvent', true);
                  return
               }

            }
            server.to(socket.id).emit('roomFullEvent', false);

         }

      }

   });


   socket.on('disconnect', function () {

      for (let index1 = 0; index1 < userArrays.length; index1++) {
         const membersArray = userArrays[index1].members;

         for (let index2 = 0; index2 < membersArray.length; index2++) {
            const element = membersArray[index2];

            if (element.socketid == socket.id) {
               console.log("Removed User " + userArrays[index1].members[index2].name)
               userArrays[index1].members.splice(index2, 1);

               if (userArrays[index1].members.length == 0) {
                  console.log("Removed Empty Room " + userArrays[index1].RoomName)
                  userArrays.splice(index1, 1)
                  return
               }

               if (userArrays[index1].existingroom == true) {
                  server.sockets.in(userArrays[index1].RoomName).emit('getLoadedUsers', { userlist: userArrays[index1].members });
               } else {
                  server.sockets.in(userArrays[index1].RoomName).emit('getUsers', { userlist: userArrays[index1].members });
               }



            }


         }

      }

   });

   socket.on('msg', function (data) {
      //Send message to everyone
      server.sockets.in(data.roomid).emit('newmsg', { msg: data.message, publicKey: data.publicKey, signature: data.signature, leaderstatus: data.leaderstatus, arrayPosition: data.arrayPosition });
   })
});