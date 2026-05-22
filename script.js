const revealItems = document.querySelectorAll(".reveal");
const weddingDate = new Date("2026-07-24T16:00:00+05:00");
const countdownFields = {
  days: document.querySelector("[data-countdown-days]"),
  hours: document.querySelector("[data-countdown-hours]"),
  minutes: document.querySelector("[data-countdown-minutes]"),
  seconds: document.querySelector("[data-countdown-seconds]"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const diff = Math.max(0, weddingDate.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownFields.days.textContent = pad(days);
  countdownFields.hours.textContent = pad(hours);
  countdownFields.minutes.textContent = pad(minutes);
  countdownFields.seconds.textContent = pad(seconds);
}

if (countdownFields.days) {
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("load", () => {
  document.querySelectorAll(".map-embed script").forEach((script) => {
    script.addEventListener("error", () => {
      script.closest(".map-embed")?.classList.add("is-map-fallback");
    });
  });
});
