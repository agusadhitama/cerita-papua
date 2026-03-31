// ===============================
// GLOBAL SELECTOR
// ===============================
const sections = document.querySelectorAll(".section");
const audio = document.getElementById("bg-audio");
const soundBtn = document.getElementById("sound-btn");

// ===============================
// SCROLL ANIMATION (INTERSECTION)
// ===============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => observer.observe(section));

// ===============================
// TYPEWRITER EFFECT
// ===============================
function typeWriter(element, speed = 30) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// apply to all h2
function typeWriter(element, speed = 30) {
  const text = element.textContent;
  element.textContent = "";

  let i = 0;

  function typing() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

// ===============================
// PARALLAX EFFECT (SMOOTH)
// ===============================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".bg").forEach((bg, index, arr) => {
  // skip section terakhir
  if (index === arr.length - 1) return;

  bg.style.transform = `translateY(${scrollY * 0.2}px)`;
});
});

// ===============================
// DYNAMIC BACKGROUND COLOR SHIFT
// ===============================
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const hue = scroll * 0.05;

  document.body.style.background = `
    radial-gradient(circle at top, 
    hsl(${hue}, 40%, 15%), 
    #020617)
  `;
});

// ===============================
// PARTICLE GENERATOR
// ===============================
function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.animationDuration = 5 + Math.random() * 5 + "s";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 10000);
}

setInterval(createParticle, 300);

// ===============================
// SOUND CONTROL
// ===============================
let isPlaying = false;

soundBtn.addEventListener("click", () => {
  if (!audio) return;

  if (!isPlaying) {
    audio.play();
    soundBtn.innerText = "🔊";
    isPlaying = true;
  } else {
    audio.pause();
    soundBtn.innerText = "🔇";
    isPlaying = false;
  }
});

// ===============================
// AUTO PLAY (USER INTERACTION)
// ===============================
document.addEventListener("click", () => {
  if (audio && !isPlaying) {
    audio.play().catch(() => {});
    isPlaying = true;
    soundBtn.innerText = "🔊";
  }
}, { once: true });

// ===============================
// TEXT FADE-IN PER PARAGRAPH
// ===============================
const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const paragraphs = entry.target.querySelectorAll("p");

        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".content").forEach((el) => {
  textObserver.observe(el);
});

// ===============================
// MOUSE LIGHT EFFECT
// ===============================
const light = document.createElement("div");
light.style.position = "fixed";
light.style.width = "200px";
light.style.height = "200px";
light.style.borderRadius = "50%";
light.style.pointerEvents = "none";
light.style.background = "radial-gradient(circle, rgba(34,211,238,0.2), transparent)";
light.style.mixBlendMode = "screen";
light.style.zIndex = "9999";

document.body.appendChild(light);

window.addEventListener("mousemove", (e) => {
  light.style.left = e.clientX - 100 + "px";
  light.style.top = e.clientY - 100 + "px";
});

// ===============================
// SCROLL PROGRESS BAR
// ===============================
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.background = "linear-gradient(90deg, #22d3ee, #4ade80)";
progressBar.style.zIndex = "9999";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / height) * 100;
  progressBar.style.width = progress + "%";
});

// ===============================
// SMOOTH SCROLL (ANCHOR)
// ===============================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
// RANDOM BACKGROUND MOTION
// ===============================
setInterval(() => {
  document.querySelectorAll(".bg").forEach((bg) => {
    const x = Math.random() * 10 - 5;
    const y = Math.random() * 10 - 5;

    bg.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
}, 3000);

// ===============================
// KEYBOARD INTERACTION (SECRET)
// ===============================
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.body.style.filter = "invert(1)";
    setTimeout(() => {
      document.body.style.filter = "invert(0)";
    }, 500);
  }
});

// ===============================
// PERFORMANCE GUARD (ANTI LAG)
// ===============================
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

document.querySelectorAll(".parallax").forEach((bg) => {
  bg.style.transform = `translateY(${scrollY * 0.2}px)`;
});