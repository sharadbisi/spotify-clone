console.log(("welcome to spotify"));
//INITIALIZATION OF AN VARIABLS
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Hey Ishwara", filePath:"./songs/1.mp3", coverPath: "./covers/1.jpeg"},
    {songName: "Mana Khojuthila", filePath:"./songs/2.mp3", coverPath: "./covers/2.jpeg"},
    {songName: "Oda Ankhi", filePath:"./songs/3.mp3", coverPath: "./covers/3.jpeg"},
    {songName: "Bhala Je Pau", filePath:"./songs/4.mp3", coverPath: "./covers/4.jpeg"},
    {songName: "Megha Haija", filePath:"./songs/5.mp3", coverPath: "./covers/5.jpeg"},
    {songName: "Sajni Tor Muskan", filePath:"./songs/6.mp3", coverPath: "./covers/6.jpeg"},
    {songName: "O Re Piya Lofi", filePath:"./songs/7.mp3", coverPath: "./covers/7.jpeg"},
    {songName: "Tum Prem Ho Tum Preet Ho", filePath:"./songs/8.mp3", coverPath: "./covers/8.jpeg"},
    {songName: "Juda Hoke Bhi", filePath:"./songs/9.mp3", coverPath: "./covers/9.jpeg"},
    {songName: "Kahani Suno", filePath:"./songs/10.mp3", coverPath: "./covers/10.jpeg"},
]

songItems.forEach((element, i) => {
    const songData = songs[i]; // Get the corresponding song data from the songs array
    if (songData) {
        element.getElementsByTagName('img')[0].src = songData.coverPath;
        element.getElementsByClassName('songname')[0].innerHTML = songData.songName;
    }
});


//HANDLE PLAY POUSE SONG
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})

//LISTEN TO EVENTS
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `./songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})