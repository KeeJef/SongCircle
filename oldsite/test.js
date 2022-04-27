const axios = require('axios').default;


//axios get request async

getSongs()

async function getSongs() {
    //axios get request
    try {
        var response = await axios.get("https://tools.applemediaservices.com/api/apple-media/music/US/search.json?types=songs,albums,music-videos,playlists,artists,stations&term=heart+shaped+box&limit=5&l=en-US");
    } catch (error) {
        console.log(error);
    }
    
    console.log(response.data);
}