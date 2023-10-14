const music = document.getElementById("music");
const play_btn = document.querySelector('[data-action="play"]');
const volume = document.querySelector('[data-action="volume"]');
const progressBar = document.querySelector(".progress"); // Changed the variable name to progressBar
const seekbar = document.querySelector(".progress .played"); // Changed the variable name to progressBar
const circle = document.querySelector(".circle");
const replay = document.querySelector('[data-action="replay"]');
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const nextButton = document.querySelector(".next-button");
const prevButton = document.querySelector(".prev-button");
const coverImage = document.getElementById("coverImage");
var playButtons = document.querySelectorAll(
  '[data-action="play_another_song"]'
);
playButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    play_btn.dataset.action = "pause";

    // تغییر متن تمام دکمه‌های play_arrow به "play_arrow"
    playButtons.forEach(function (otherButton, otherIndex) {
      if (otherIndex !== index) {
        otherButton.textContent = "play_arrow";
      }
    });
 
    // تغییر متن دکمه play_arrow به "pause" یا برعکس
    if (playButtons[index].textContent === "play_arrow") {
      playButtons[index].textContent = "pause";
    } else {
      playButtons[index].textContent = "play_arrow";
    }

    play_btn.textContent = "pause";
    currentSongIndex = index;
    playSong(currentSongIndex);
  });
});

// تعریف آرایه از آهنگ‌ها
const songs = [
  {
    title: "Hello",
    artist: "Adele",
    src: "./assets/music1.mp3",
    cover: "./assets/01.jpg",
  },
  {
    title: "Californication",
    artist: "Red Hot Chili Pepers",
    src: "./assets/music2.mp3",
    cover: "./assets/02.jpg",
  },
  {
    title: "6 inchs",
    artist: "ahmad mostafa",
    src: "./assets/music3.mp3",
    cover: "./assets/03.jpg",
  },
  // ادامه آهنگ‌ها
];
// شمارنده آهنگ فعلی
let currentSongIndex = 0;

// تابعی برای پخش آهنگ
function playSong(index) {
  const music = document.getElementById("music");
  music.src = songs[index].src;
  music.play();
  // تغییر تصویر پس‌زمینه عنصر با کلاس "element-with-background" به تصویر مربوط به آهنگ جاری
  coverImage.style.backgroundImage = `url(${songs[index].cover})`;

  // به‌روزرسانی عناصر مربوط به آهنگ فعلی (عنوان و هنرمند)
  const titleElement = document.querySelector(".title h3");
  titleElement.textContent = songs[index].title;
  const artistElement = document.querySelector(".small p");
  artistElement.textContent = songs[index].artist;
}

// افزودن رویداد برای دکمه "بعدی"
nextButton.addEventListener("click", function () {
  play_btn.dataset.action = "pause";
  play_btn.textContent = "pause";

  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});
// افزودن رویداد برای دکمه "قبلی"
prevButton.addEventListener("click", function () {
  play_btn.dataset.action = "pause";
  play_btn.textContent = "pause";

  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

music.addEventListener("timeupdate", () => {
  const currentTime = music.currentTime;
  const duration = music.duration;
  const progressPercentage = (currentTime / duration) * 100; // Changed the variable name to progressPercentage
  progressBar.style.width = progressPercentage + "%"; // Updated the progress bar width
});
volume.addEventListener("click", (e) => {
  const { target } = e;
  if (target.dataset.action === "volume") {
    music.muted = true;
    target.dataset.action = "volume-mute";
    volume.textContent = "volume_off";
  } else {
    music.muted = false;
    target.dataset.action = "volume";
    volume.textContent = "volume_up";
  }
});
play_btn.addEventListener("click", (e) => {
  const { target } = e;
  if (target.dataset.action === "play") {
    music.play();
    play_btn.textContent = "pause";
    target.dataset.action = "pause";
  } else {
    music.pause();
    play_btn.textContent = "play_arrow";

    target.dataset.action = "play";
  }
});
replay.addEventListener("click", (e) => {
  music.load();
  play_btn.textContent = "pause";

  music.play();
});
//برای جلو عقب کردن نوار صدا
seekbar.addEventListener("click", (e) => {
  const { currentTarget: seekbar, pageX } = e;
  const rect = seekbar.getBoundingClientRect();
  const offsetX = pageX - rect.left;
  const seekPercentage = (offsetX * music.duration) / seekbar.offsetWidth;
  const audioDuration = music.duration;
  const seekTime = (seekPercentage / 100) * audioDuration;
  music.currentTime = seekTime;
});

// وقتی فایل صوتی آماده شود
music.addEventListener("loadedmetadata", function () {
  // نمایش مدت زمان کل موسیقی به صورت مناسب
  const durationMinutes = Math.floor(music.duration / 60);
  const durationSeconds = Math.floor(music.duration % 60);
  durationDisplay.textContent = `${durationMinutes}:${durationSeconds
    .toString()
    .padStart(2, "0")}`;
});

// وقتی پخش آغاز شود
music.addEventListener("play", function () {
  // تنظیم تایمر برای نمایش زمان جاری به طور مکرر
  setInterval(function () {
    const currentTimeMinutes = Math.floor(music.currentTime / 60);
    const currentTimeSeconds = Math.floor(music.currentTime % 60);
    currentTimeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000); // هر 1 ثانیه به روز رسانی زمان جاری
});
