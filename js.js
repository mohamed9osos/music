const container = document.querySelector(".container"),
    musicImg = container.querySelector(".image-area img"),
    musicName = container.querySelector(".song-details .name"),
    musicArtist = container.querySelector(".song-details .artist"),
    playPauseBtn = container.querySelector(".play-pause"),
    prevBtn = container.querySelector("#prev"),
    nextBtn = container.querySelector("#next"),
    mainAudio = container.querySelector("#main-audio"),
    progressArea = container.querySelector(".progress-area"),
    progressBar = container.querySelector(".progress-bar");


let musicIndex = 0;
let isPlaying = false;
// load window
window.addEventListener("load", ()=>{
    loadMusic(musicIndex)
})
// the innerhtml
function loadMusic(indexNum){
    musicName.innerHTML = allMusic[indexNum].name;
    musicArtist.innerHTML = allMusic[indexNum].artist;
    musicImg.src = allMusic[indexNum].img;
    mainAudio.src = allMusic[indexNum].src;
};
// function play music
function playMusic(){
    isPlaying = true;
    playPauseBtn.querySelector("i").className = "fa-solid fa-pause" 
    mainAudio.play()
}
// function pause music
function pauseMusic(){
    isPlaying = false;
    playPauseBtn.querySelector("i").className = "fa-solid fa-play" 
    mainAudio.pause()
}
// click btn play music
playPauseBtn.addEventListener("click", ()=>{
    isPlaying ? pauseMusic() : playMusic()
})
// function next music
function nextMusic(){
    musicIndex++
    musicIndex > allMusic.length - 1  
    ? musicIndex = 0 
    : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic()
}
// click next btn
nextBtn.addEventListener("click", ()=>{
    nextMusic()
})

// function prev music
function prevMusic(){
    musicIndex--;
    musicIndex < 0 
    ? musicIndex = allMusic.length-1 
    : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic()
}

// click prev btn
prevBtn.addEventListener("click", ()=>{
    prevMusic()
})

const repeatBtn = container.querySelector("#repeat-plist")

repeatBtn.addEventListener("click", ()=>{
    let getClass = repeatBtn.className;
    switch(getClass){
        case "fa-solid fa-repeat":
            repeatBtn.className = "fa-solid fa-rotate-right"
            repeatBtn.setAttribute("title", "song loop")
            break;
        case "fa-solid fa-rotate-right":
            repeatBtn.className = "fa-solid fa-shuffle"
            repeatBtn.setAttribute("title","shuffle")
            break;
        case "fa-solid fa-shuffle":
            repeatBtn.className = "fa-solid fa-repeat"
    }
})

mainAudio.addEventListener("ended", ()=>{
    let getClass = repeatBtn.className;
    switch(getClass){
        case "fa-solid fa-repeat":
            nextMusic()
            break;
        case "fa-solid fa-rotate-right":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex)
            playMusic()
            break;
        case "fa-solid fa-shuffle":
            let randIndex = Math.floor(Math.random() * allMusic.length)
            do{
                randIndex = Math.floor(Math.random() * allMusic.length)
            }
            while(musicIndex == randIndex){
                musicIndex = randIndex;
                loadMusic(musicIndex);
                playMusic();
                break;
            }
    }
})



mainAudio.addEventListener("timeupdate", (ev)=>{
    const currentTime = ev.target.currentTime;
    const duration = ev.target.duration;
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`
    let musicCurrentTime = container.querySelector(".current-time")
    let musicDuration = container.querySelector(".max-duration")
    
    mainAudio.addEventListener("loadeddata", ()=>{
        const interval = setInterval(() => {
            const _elapsed = mainAudio.currentTime
            musicCurrentTime.innerHTML = formatTime(_elapsed)
        },1000);
        const _duration = mainAudio.duration
        musicDuration.innerHTML = formatTime(_duration)
        mainAudio.addEventListener("ended", ()=>{
            clearInterval(interval)
        })
    })
})

progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth
    let clickedOffsetX = e.offsetX
    let songDuration = mainAudio.duration
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration
    playMusic()



})




function formatTime(time){
    if(time && !isNaN(time)){
        const minutes = Math.floor(time/60) <10
        ?`0${Math.floor(time/60)}` 
        : Math.floor(time/60)

        const seconds = Math.floor(time%60) <10
        ?`0${Math.floor(time%60)}` 
        : Math.floor(time%60);

        return `${minutes}:${seconds}`
    }
    return "00:00"
}






    console.log(progressBar)