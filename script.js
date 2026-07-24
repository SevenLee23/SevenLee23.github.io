/* ========= PAGE ========= */
function show(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  setTimeout(() => document.getElementById(id).classList.add("active"), 200);
}

/* ========= TYPE ========= */
function type(el, text, speed = 40, callback) {
  el.innerHTML = "";
  let i = 0;
  function t() {
    if (i < text.length) {
      el.innerHTML += text[i++];
      setTimeout(t, speed);
    } else if (callback) callback();
  }
  t();
}

/* ========= START ========= */
function startStory() {
  show("intro");

  const introSound = document.getElementById("introSound");
  introSound.volume = 0.8;
  introSound.play();

  type(
    document.getElementById("introText"),
    "3...2...1...",
    50,
    () => setTimeout(() => show("namePage"), 3000)
  );
}

/* ========= NAME ========= */
const valid = ["tu", "nguyen tu", "tu nguyen", "atus", "anh tu atus", "nguyen anh tu"];
function normalize(s) {
  return s.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim().replace(/\s+/g, " ");
}

function checkName() {
  if (valid.includes(normalize(nameInput.value))) {
    memoryFlow();
  } else {
    alert("Có chịu nhập đúng tên không đâyyyy?");
  }
}

/* ========= MEMORY ========= */
function memoryFlow() {
  show("memory");
  const mem = document.getElementById("memory");
  const lines = [
    "Em còn nhớ lần đầu chúng mình nói chuyện không? Và rồi từ đó anh biết mình đã gặp được một người rất đặc biệt.",
    "Em còn nhớ lần đầu mình giận nhau vì điều nhỏ nhặt? Và rồi từ đó anh biết mình không thể thiếu em.",
    "Em còn nhớ những khoảnh khắc mà ta cùng nhau trải qua và cảm thấy thật hạnh phúc? Và rồi từ đó anh biết mình đã yêu em rất nhiều."
  ];
  let i = 0;
  function next() {
    if (i < lines.length) {
      type(mem, lines[i], 40, () => setTimeout(next, 2500));
      i++;
    } else {
      mem.innerHTML += "<br><br><button onclick='timelineFlow()'>Tiếp nè 💕</button>";
    }
  }
  next();
}

/* ========= TIMELINE ========= */
function timelineFlow() {
  show("timeline");
  const t = document.getElementById("timeline");
  type(t, "5 tháng...", 50, () => {
    setTimeout(() => type(t, "152 ngày...", 50, () => {
      setTimeout(() => type(t, "3640 giờ...", 50, sceneFlow), 2000);
    }), 2000);
  });
}

/* ========= SCENE ========= */
function sceneFlow() {
  show("scene");
  scene.classList.add("zoom");

  music.play();
  music.volume = 0;
  let v = 0;
  const fade = setInterval(() => {
    if (v < 0.5) {
      v += 0.01;
      music.volume = v;
    } else clearInterval(fade);
  }, 100);

  setTimeout(() => {
    const box = document.createElement("div");
    box.className = "big-box";
    type(box,
      "Trùng hợp ha, Valentine năm nay cũng là năm đầu tiên mình đón trực tiếp cùng nhau mà ngày này cũng là ngày định mệnh ấy ha. Cũng được 5 tháng rồi ấy béo ạ. Buồn không? Có. Rất buồn. Cực kì buồn. Vô cùng buồn. Thời gian không quá ngắn cũng chẳng quá dài thế nhưng trong quãng thời gian ấy chúng ta cùng tạo ra biết bao nhiêu là kỉ niệm đáng nhớ, mình cùng nhau cố gắng trong suốt khoảng thời gian đó lận. Anh hạnh phúc cực luôn, nếu mà biểu diễn qua ngôn ngữ hình thể thì trông anh phải như con loăng quăng béo ạ. Anh note ngày 14/2/2029 lại rồi ấy nhé, chún mìn mà cứ khôn đi cùn nha đượ tớ ngà đấ thì liệ hồ vớ an đấ. Anh yêu em rất nhiều, Valentine hạnh phúc và vui vẻ nhéeeeee.",
      35,
      () => box.innerHTML += "<br><br><button onclick='silenceFlow()'>Em đồng ýyyy</button>"
    );
    scene.appendChild(box);
  }, 4000);
}

/* ========= SILENCE ========= */
function silenceFlow() {
  music.pause();
  show("silence");
  type(silence, "Vậy thì...", 50, () =>
    setTimeout(() => type(silence, "Nghe này", 50, loveFlow), 2000)
  );
}

/* ========= LOVE ========= */
function loveFlow() {
  show("love");
  spawnLove();
}

/* ========= HEART ENGINE ========= */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speed = Math.random() * 50 + 40;
    this.alpha = 1;
  }
  update(dt) {
    this.y -= this.speed * dt;
    this.alpha -= 0.3 * dt;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff4da6";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

let parts = [], last = 0;
function animate(t) {
  const dt = (t - last) / 1000; last = t;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  parts.push(new Particle());
  parts.forEach((p, i) => {
    p.update(dt); p.draw();
    if (p.alpha <= 0) parts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

/* ========= LOVE POP ========= */
function spawnLove() {
  for (let i = 0; i < 200; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      p.className = "popup";
      p.innerText = "Anh yêu em rất nhiều 💗";
      p.style.left = Math.random() * innerWidth + "px";
      p.style.top = Math.random() * innerHeight + "px";
      document.body.appendChild(p);
      p.addEventListener("animationend", () => p.remove());
    }, i * 60);
  }
}
