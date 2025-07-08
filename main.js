const DEFAULT_KEYS = {
  jump: "W",
  left: "A",
  right: "D",
  crouch: "S"
};

let keyBindings = { ...DEFAULT_KEYS };
let waitingForKey = null;

function loadSettings() {
  const saved = localStorage.getItem("keyBindings");
  if (saved) keyBindings = JSON.parse(saved);
  updateRebindButtons();
}

function saveSettings() {
  localStorage.setItem("keyBindings", JSON.stringify(keyBindings));
}

function updateRebindButtons() {
  document.querySelectorAll("#key-rebind-ui button[data-action]").forEach(btn => {
    const action = btn.getAttribute("data-action");
    btn.textContent = keyBindings[action];
  });
}

document.querySelectorAll("#key-rebind-ui button[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    waitingForKey = btn.getAttribute("data-action");
    btn.textContent = "...";
  });
});

document.addEventListener("keydown", (e) => {
  if (waitingForKey) {
    const key = e.key.toUpperCase();

    if (Object.values(keyBindings).includes(key)) {
      alert("Key already bound!");
      updateRebindButtons();
      waitingForKey = null;
      return;
    }

    keyBindings[waitingForKey] = key;
    saveSettings();
    updateRebindButtons();
    waitingForKey = null;
  }
});

function toggleVisibility(id, show) {
  const el = document.getElementById(id);
  if (show) el.classList.remove("hidden");
  else el.classList.add("hidden");
}

document.getElementById("start-game-btn").addEventListener("click", () => {
  toggleVisibility("start-screen", false);
  fadeToGame();
});

function fadeToGame() {
  const fade = document.getElementById("fade-overlay");
  fade.classList.remove("fade-out");
  setTimeout(() => {
    fade.classList.add("fade-out");
    startGame();
  }, 100);
}

document.getElementById("settings-btn").addEventListener("click", () => {
  toggleVisibility("settings-panel", true);
});

document.getElementById("close-settings").addEventListener("click", () => {
  toggleVisibility("settings-panel", false);
});

document.getElementById("rebind-controls").addEventListener("click", () => {
  toggleVisibility("key-rebind-ui", true);
});

document.getElementById("close-rebind-ui").addEventListener("click", () => {
  toggleVisibility("key-rebind-ui", false);
});

loadSettings();

