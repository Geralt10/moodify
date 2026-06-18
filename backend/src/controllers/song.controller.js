const songModel = require("../models/song.model");
const id3 = require("node-id3");
const {uploadFile} = require("../services/storage.service");


async function uploadSong(req,res){
    const songBuffer =req.file.buffer;
    const {mood}=req.body;
    const tags =id3.read(songBuffer);
    const [songFile, posterFile]= await Promise.all([
        uploadFile({
        buffer:songBuffer,
        fileName:tags.title + ".mp3",
        folder:"/moodify/songs"
    }),
        uploadFile({
        buffer:tags.image.imageBuffer,
        fileName:tags.title + ".jpeg",
        folder:"/moodify/posters"
    })
    ])

    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        postUrl:posterFile.url,
        mood
    })

    res.status(201).json({
        message:"song uploaded successfully",
        song
    })
}

async function getSong(req, res) {
    const { mood } = req.query;

    const songs = await songModel.find({ mood });

    if (songs.length === 0) {
        return res.status(404).json({
            message: "No songs found"
        });
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    res.status(200).json({
        message: "Random song fetched successfully",
        song: randomSong
    });
}



module.exports={uploadSong,getSong}
