/* =========================================
   LIVE CLOCK
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const currentTimeElement =
    document.getElementById("currentTime");

  function updateClock() {

    if (!currentTimeElement) {
      return;
    }

    const now = new Date();

    const hours =
      now.getHours();

    const minutes =
      String(now.getMinutes()).padStart(2, "0");

    const hour12 =
      hours % 12 || 12;

    const ampm =
      hours >= 12 ? "pm" : "am";

    currentTimeElement.textContent =
      `${hour12}:${minutes} ${ampm}`;
  }

  updateClock();

  setInterval(updateClock, 1000);


  /* =========================================
     ONLINE COUNT
  ========================================= */

  const onlineCount =
    document.getElementById("onlineCount");

  if (onlineCount) {

    function updateOnlineCount() {

      const randomOnline =
        Math.floor(Math.random() * 15) + 25;

      onlineCount.textContent =
        randomOnline;
    }

    updateOnlineCount();

    setInterval(
      updateOnlineCount,
      15000
    );
  }


  /* =========================================
     SONG PLAYLIST
  ========================================= */

  const playlist = [
    {
        title: "Mujhse Mohabbat Ka Izhaar Karta",
        artist: "Kumar Sanu & Alka Yagnik",
        audio: "./assets/songs/01.mp3",
        cover: "./assets/covers/01.jpg"
    },

    {
        title: "Tumsa Koi Pyaara",
        artist: "Kumar Sanu & Alka Yagnik",
        audio: "./assets/songs/02.mp3",
        cover: "./assets/covers/02.jpg"
    },

    {
        title: "Woh Meri Neend Mera Chain",
        artist: "Alka Yagnik",
        audio: "./assets/songs/03.mp3",
        cover: "./assets/covers/03.jpg"
    },

    {
        title: "Saaton Janam Main Tere",
        artist: "Kumar Sanu & Alka Yagnik",
        audio: "./assets/songs/04.mp3",
        cover: "./assets/covers/04.jpg"
    },

    {
        title: "Bahut Pyar Karte Hain",
        artist: "Anuradha Paudwal",
        audio: "./assets/songs/05.mp3",
        cover: "./assets/covers/05.jpg"
    },

    {
        title: "Jeeta Tha Jiske Liye",
        artist: "Kumar Sanu & Alka Yagnik",
        audio: "./assets/songs/06.mp3",
        cover: "./assets/covers/06.jpg"
    },

    {
        title: "Teri Umeed Tera Intezaar",
        artist: "Kumar Sanu & Sadhana Sargam",
        audio: "./assets/songs/07.mp3",
        cover: "./assets/covers/07.jpg"
    },

    {
        title: "Ek Sanam Chahiye Aashiqui Ke Liye",
        artist: "Kumar Sanu",
        audio: "./assets/songs/08.mp3",
        cover: "./assets/covers/08.jpg"
    },

    {
        title: "Tu Pyaar Hai Kisi Aur Ka",
        artist: "Kumar Sanu & Anuradha Paudwal",
        audio: "./assets/songs/09.mp3",
        cover: "./assets/covers/09.jpg"
    },

    {
        title: "Raah Mein Unse Mulaqat Ho Gayi",
        artist: "Kumar Sanu & Alka Yagnik",
        audio: "./assets/songs/10.mp3",
        cover: "./assets/covers/10.jpg"
    }

  ];


  /* =========================================
     PLAYER ELEMENTS
  ========================================= */

  const audio =
    document.getElementById("audio");

  const album =
    document.getElementById("album");

  const songTitle =
    document.getElementById("songTitle");

  const songArtist =
    document.getElementById("songArtist");

  const playBtn =
    document.getElementById("playBtn");

  const prevBtn =
    document.getElementById("prevBtn");

  const nextBtn =
    document.getElementById("nextBtn");

  const playIcon =
    document.getElementById("playIcon");

  const progress =
    document.getElementById("progress");

  const progressThumb =
    document.getElementById("progressThumb");

  const progressContainer =
    document.getElementById("progressContainer");

  const currentSongTime =
    document.getElementById("currentSongTime");

  const duration =
    document.getElementById("duration");


  /* =========================================
     PLAYER STATE
  ========================================= */

  let currentSongIndex = 0;

  let isDragging = false;


  /* =========================================
     FORMAT TIME
  ========================================= */

  function formatTime(seconds) {

    if (
      !Number.isFinite(seconds) ||
      seconds < 0
    ) {
      return "0:00";
    }

    const mins =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60);

    return `${mins}:${String(secs).padStart(2, "0")}`;
  }


  /* =========================================
     LOAD SONG
  ========================================= */

  function loadSong(index) {

    const song =
      playlist[index];

    songTitle.textContent =
      song.title;

    songArtist.textContent =
      song.artist;

    album.src =
      song.cover;

    audio.src =
      song.audio;

    progress.style.width =
      "0%";

    progressThumb.style.left =
      "0%";

    currentSongTime.textContent =
      "0:00";

    duration.textContent =
      "0:00";

    album.classList.remove("playing");
  }


  /* =========================================
     PLAY SONG
  ========================================= */

  async function playSong() {

    try {

      await audio.play();

      album.classList.add("playing");

      playIcon.innerHTML = `
        <path d="M7 5h3v14H7V5zm7 0h3v14h-3V5z"/>
      `;

      playBtn.setAttribute(
        "aria-label",
        "Pause song"
      );

    } catch (error) {

      console.log(
        "Audio could not play:",
        error
      );
    }
  }


  /* =========================================
     PAUSE SONG
  ========================================= */

  function pauseSong() {

    audio.pause();

    album.classList.remove("playing");

    playIcon.innerHTML = `
      <path d="M8 5v14l11-7z"/>
    `;

    playBtn.setAttribute(
      "aria-label",
      "Play song"
    );
  }


  /* =========================================
     PLAY / PAUSE
  ========================================= */

  playBtn.addEventListener(
    "click",
    () => {

      if (audio.paused) {
        playSong();
      } else {
        pauseSong();
      }

    }
  );


  /* =========================================
     NEXT SONG
  ========================================= */

  nextBtn.addEventListener(
    "click",
    () => {

      currentSongIndex =
        (currentSongIndex + 1) %
        playlist.length;

      loadSong(currentSongIndex);

      playSong();

    }
  );


  /* =========================================
     PREVIOUS SONG
  ========================================= */

  prevBtn.addEventListener(
    "click",
    () => {

      if (audio.currentTime > 3) {

        audio.currentTime = 0;
        return;

      }

      currentSongIndex =
        (currentSongIndex - 1 +
          playlist.length) %
        playlist.length;

      loadSong(currentSongIndex);

      playSong();

    }
  );


  /* =========================================
     METADATA / DURATION
  ========================================= */

  audio.addEventListener(
    "loadedmetadata",
    () => {

      duration.textContent =
        formatTime(audio.duration);

    }
  );


  /* =========================================
     UPDATE PROGRESS
  ========================================= */

  audio.addEventListener(
    "timeupdate",
    () => {

      if (isDragging) {
        return;
      }

      if (
        !Number.isFinite(audio.duration) ||
        audio.duration <= 0
      ) {
        return;
      }

      const percent =
        (audio.currentTime /
          audio.duration) * 100;

      progress.style.width =
        `${percent}%`;

      progressThumb.style.left =
        `${percent}%`;

      currentSongTime.textContent =
        formatTime(audio.currentTime);

    }
  );


  /* =========================================
     SEEK FUNCTION
  ========================================= */

  function seekSong(event) {

    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    const rect =
      progressContainer
        .getBoundingClientRect();

    let position =
      (event.clientX - rect.left) /
      rect.width;

    position =
      Math.max(
        0,
        Math.min(1, position)
      );

    const percent =
      position * 100;

    progress.style.width =
      `${percent}%`;

    progressThumb.style.left =
      `${percent}%`;

    currentSongTime.textContent =
      formatTime(
        audio.duration * position
      );

    audio.currentTime =
      audio.duration * position;
  }


  /* =========================================
     PROGRESS CLICK
  ========================================= */

  progressContainer.addEventListener(
    "pointerdown",
    (event) => {

      isDragging = true;

      progressContainer
        .classList.add("dragging");

      seekSong(event);

      progressContainer
        .setPointerCapture(
          event.pointerId
        );

    }
  );


  progressContainer.addEventListener(
    "pointermove",
    (event) => {

      if (!isDragging) {
        return;
      }

      seekSong(event);

    }
  );


  function stopDragging() {

    isDragging = false;

    progressContainer
      .classList.remove("dragging");

  }


  progressContainer.addEventListener(
    "pointerup",
    stopDragging
  );

  progressContainer.addEventListener(
    "pointercancel",
    stopDragging
  );


  /* =========================================
     KEYBOARD SEEK
  ========================================= */

  progressContainer.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowRight"
      ) {

        audio.currentTime =
          Math.min(
            audio.duration,
            audio.currentTime + 5
          );

      }

      if (
        event.key === "ArrowLeft"
      ) {

        audio.currentTime =
          Math.max(
            0,
            audio.currentTime - 5
          );

      }

    }
  );


  /* =========================================
     AUTO NEXT
  ========================================= */

  audio.addEventListener(
    "ended",
    () => {

      currentSongIndex =
        (currentSongIndex + 1) %
        playlist.length;

      loadSong(currentSongIndex);

      playSong();

    }
  );


  /* =========================================
     AUDIO ERROR
  ========================================= */

  audio.addEventListener(
    "error",
    () => {

      console.error(
        "Audio file not found:",
        playlist[currentSongIndex].audio
      );

    }
  );


  /* =========================================
     INITIAL SONG
  ========================================= */

  loadSong(currentSongIndex);

});