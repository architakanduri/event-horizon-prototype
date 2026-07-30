/* ============================================================
   EVENT HORIZON — Day 1 Prototype
   ============================================================ */

/* ---- SCRIPT DATA ----------------------------------------- */

const INTRO_CARDS = [
  "The universe has gotten a lot busier these days. It barely takes any time to get anywhere, as long as you’ve got the equipment for it.",
  "Unfortunately for you, you’re stuck where you are. While fifty years ago people would have fought tooth and nail to be in your research organization, it’s currently operating—in exile—in the worst of places: an abandoned space station revolving around a black hole.",
  "This is no situation any reasonable scientist wants to operate in. You don’t really have a choice, though. The gubernatorial board of your university seems to have deemed you to be, in their words, “uncooperative and a hazard to the scientific community”. It seems your only hope is to get this failing research station back to its glory days."
];

/* Node types: "dialogue", "inner", "narration", "choice", "alarm", "control" */
const SCENE_SCRIPT = [
  {id:"s1", type:"dialogue", speaker:"SAM", text:"Alright. Your name’s Ester, right? I’m your supervisor because I’m technically your senior here, but don’t come to me with complaints later because I can’t help with the higher-ups. Oh yeah, you’re technically a “visiting student” even though you’re still going to be working. Questions?", next:"s2", showSprites:["sam","ester"]},
  {id:"s2", type:"dialogue", speaker:"ESTER", text:"Yes. I’m concerned about how the terminal system is bolted in close proximity to the atmospheric monitoring devices. The venting should cause some issues, right? Do you have a fume hood anywhere?", next:"s3"},
  {id:"s3", type:"dialogue", speaker:"SAM", text:"…Yes?", next:"s4"},
  {id:"s4", type:"dialogue", speaker:"ESTER", text:"And there shouldn’t be a device containing high mercury haphazardly arranged in this room.", next:"s5"},
  {id:"s5", type:"dialogue", speaker:"SAM", text:"It’s been there eight months.", next:"s6"},
  {id:"s6", type:"dialogue", speaker:"ESTER", text:"But that doesn’t decrease the health risk, it just means you’ve been in close range to danger for longer!", next:"lab_explore"},

  {id:"lab_explore", type:"control", action:"start_lab"},

  {id:"pb1", type:"dialogue", speaker:"SAM", text:"Hey, Jerry, could you grab the— JERRY!", next:"pb2", showSprites:["sam","jerry","ester"]},
  {id:"pb2", type:"narration", text:"A crash. Glass on tile. Small pieces rolling outward in four directions.", next:"pb3"},
  {id:"pb3", type:"dialogue", speaker:"JERRY", text:"I’m sorry — it wasn’t— I turned around and my sleeve caught it, it was right on the edge, I didn’t—", next:"pb4"},
  {id:"pb4", type:"dialogue", speaker:"SAM", text:"Oh, God.", next:"alarm"},

  {id:"alarm", type:"alarm"},

  {id:"pa1", type:"narration", text:"Mercury on the floor. Small beads rolling into the grout lines, pooling where the tile dips.", next:"pa2"},
  {id:"pa2", type:"dialogue", speaker:"ESTER", text:"Everyone stop walking. Jerry — vacuum and a disposable sharps bin, the largest rigid one in the cabinet, not the bag. Sam, seal the door and kill the manifold to three and four. That unit holds about six ounces of elemental mercury and the vent is running. I’ll write the incident report. Jerry, what’s your surname? I’m putting your name down as the person responsible. And — this was an accident, correct?", next:"pa3"},
  {id:"pa3", type:"dialogue", speaker:"JERRY", text:"Of course it was an accident. That’s what I just said.", next:"pa4"},
  {id:"pa4", type:"narration", text:"He hasn’t moved. Neither has anyone else. Sam is looking at the floor.", next:"choice1_inner"},

  {id:"choice1_inner", type:"inner", text:"You asked a yes-or-no question. He said yes. But he’s frozen, and his voice went tight. People don’t react like that to answering a question correctly.", next:"choice1"},

  {id:"choice1", type:"choice", choices:[
    {label:"“What’s wrong?”", cost:"SOCIAL +6   CAREER -5   MENTAL -3", stats:{social:6,career:-5,mental:-3}, next:"ba1"},
    {label:"“Please. Six ounces of mercury, and the vent is running. We need this contained in the next four minutes.”", cost:"CAREER +6   SOCIAL -5   EMOTIONAL -3", stats:{career:6,social:-5,emotional:-3}, next:"bb1"}
  ]},

  {id:"ba1", type:"dialogue", speaker:"JERRY", text:"What’s wrong? I’ve worked here eleven years. I’ve never seen you before in my life and your first act is to put my name in an incident report in front of two witnesses. What did I ever do to you?", next:"ba2"},
  {id:"ba2", type:"dialogue", speaker:"ESTER", text:"I’ve never seen you before either. I don’t hold any vendetta against you. I don’t know you well enough to.", next:"ba3"},
  {id:"ba3", type:"dialogue", speaker:"JERRY", text:"Then why are you being so accusatory?", next:"ba4"},
  {id:"ba4", type:"dialogue", speaker:"ESTER", text:"Your sleeve caught the device. That’s the sequence of events. The form has a field labelled “person responsible” and it doesn’t have a field for anything else.", next:"ba5"},
  {id:"ba5", type:"dialogue", speaker:"JERRY", text:"We could have sorted out whose name goes where later. It’s the way you said it. “What’s your surname, I’m putting you down as responsible.” A first-week student. Like you were reading out a sentence.", next:"ba6"},
  {id:"ba6", type:"inner", text:"He’s not angry about the form. He’s angry about the way you said it. You replay the sentence in your head. You can hear the words but you can’t hear what he heard.", next:"ba7"},
  {id:"ba7", type:"narration", text:"The mercury is still on the floor. The vent is still running.", next:"choice2", applyStats:{career:-3}},

  {id:"bb1", type:"dialogue", speaker:"JERRY", text:"Right. Yes. Sorry. Sorry.", next:"bb2"},
  {id:"bb2", type:"narration", text:"He gets the bin. Works fast, works correctly, doesn’t look at anyone. The spill is contained in three minutes forty. The report is filed. Sam says “nice work” in a tone Ester can’t decode.", next:"bb3", applyStats:{emotional:-3,mental:-4}},
  {id:"bb3", type:"inner", text:"Nice work. Two words. You run them through every filter you have and none of them return a clean result. Was it genuine? Sarcastic? Relieved? All three?", next:"choice2"},

  {id:"choice2", type:"choice", choices:[
    {label:"“I wasn’t trying to sentence you. I say things in the order I think of them, and containment came first.”", cost:"SOCIAL +4   EMOTIONAL +3   CAREER -2", stats:{social:4,emotional:3,career:-2}, next:"closing"},
    {label:"“I’m sorry. I’ll amend the report to ‘contributing factors — equipment placement.’”", cost:"SOCIAL +6   CAREER -6   EMOTIONAL -4", stats:{social:6,career:-6,emotional:-4}, next:"closing"},
    {label:"Say nothing. File the report as written.", cost:"CAREER +5   SOCIAL -6   EMOTIONAL -5   MENTAL -2", stats:{career:5,social:-6,emotional:-5,mental:-2}, next:"closing"}
  ]},

  {id:"closing", type:"narration", text:"The Director arrives eleven minutes later. She reads the incident report, then looks up. “Who authorised this? This was filed by a visiting student. Visiting students do not have clearance to submit safety documentation.” Nobody answers. Ester hadn’t known she needed authorisation. The form was there, so she filled it in.", next:"end"}
];

const REFLECTION_TEXT = "“Nobody in that room was being cruel. Two people used the same words to mean different things, in a building that punishes whoever gets blamed.”";
const REFLECTION_SUB = "";

/* ---- NODE MAP ---- */
const NODE_MAP = {};
SCENE_SCRIPT.forEach(n => { if(n.id) NODE_MAP[n.id] = n; });

/* ---- STATE ---- */
const S = {
  stats: {social:60, career:60, emotional:60, mental:60},
  screen: "title",
  introIdx: 0,
  introTyping: false,
  introFullText: "",
  benchTriggered: false,
  currentNode: null,
  typing: false,
  fullText: "",
  settings: {quiet:false, dyslexia:false, textSize:"medium", reduceMotion:false, textSpeed:"normal"},
  // lab
  esterX: 140, esterY: 116,
  esterDir: 2, // 0=down,1=left,2=right,3=up
  esterFrame: 0,
  esterMoving: false,
  camX: 0,
  keys: {},
  labActive: false,
  labIdleTimer: 0,
  // scene
  sceneScrollX: 0,
  idleBounce: 0,
  idlePaused: false,
  // anim
  bhLargeFrame: 0,
  bhSmallFrame: 0,
  starsOffset: 0,
  stationX: -20,
  titleAnimStarted: false,
  // sensory mini-game
  sensoryNoise: 0,
  sensoryLight: 100,
  sensoryPhase: 0,
  sensoryDone: false,
  sensoryState: "idle",          // "explain" | "calibrate"
  sensoryStress: 0,
  sensoryInterjectShown: false,
  sensoryInterjectActive: false,
  sensoryHasDampeners: false,
  sensoryUiReady: false,
  sensoryItemTriggered: false,
};

/* ---- DOM ---- */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ---- SCALING ---- */
function applyScale() {
  const g = $("#game");
  const w = window.innerWidth, h = window.innerHeight;
  const sx = Math.floor(w / 320), sy = Math.floor(h / 180);
  const scale = Math.max(1, Math.min(sx, sy));
  g.style.transform = `scale(${scale})`;
  g.style.width = "320px";
  g.style.height = "180px";
  const wrapper = $("#game-wrapper");
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  g.style.transformOrigin = "center center";
}
window.addEventListener("resize", applyScale);

/* ---- STAT BARS ---- */
function initBarBlocks() {
  $$(".bar-track").forEach(track => {
    track.innerHTML = "";
    for (let i = 0; i < 14; i++) {
      const b = document.createElement("div");
      b.className = "bar-block";
      track.appendChild(b);
    }
  });
  syncBars(true);
}

function statToBlocks(val) { return Math.round(val / 100 * 14); }

function syncBars(instant) {
  $$(".bar").forEach(bar => {
    const stat = bar.dataset.stat;
    const val = S.stats[stat];
    const blocks = bar.querySelectorAll(".bar-block");
    const filled = statToBlocks(val);
    if (instant) {
      blocks.forEach((b, i) => b.classList.toggle("filled", i < filled));
    }
  });
}

function animateBar(stat, delta) {
  if (delta === 0) return;
  const prev = S.stats[stat];
  S.stats[stat] = Math.max(0, Math.min(100, prev + delta));
  const bar = $(`.bar[data-stat="${stat}"]`);
  if (!bar) return;
  const blocks = bar.querySelectorAll(".bar-block");
  const oldFilled = statToBlocks(prev);
  const newFilled = statToBlocks(S.stats[stat]);
  const label = bar.querySelector(".bar-label");
  if (label) {
    label.classList.add("flash");
    setTimeout(() => label.classList.remove("flash"), 300);
  }
  const deltaEl = bar.querySelector(".bar-delta");
  if (deltaEl) {
    deltaEl.textContent = (delta > 0 ? "+" : "−") + Math.abs(delta);
    deltaEl.classList.remove("show");
    void deltaEl.offsetWidth;
    deltaEl.classList.add("show");
    setTimeout(() => deltaEl.classList.remove("show"), 1100);
  }
  if (blocks.length === 0) return;
  if (S.settings.reduceMotion) {
    blocks.forEach((b, i) => b.classList.toggle("filled", i < newFilled));
  } else {
    const dir = newFilled > oldFilled ? 1 : -1;
    let cur = oldFilled;
    const iv = setInterval(() => {
      if (cur === newFilled) { clearInterval(iv); return; }
      cur += dir;
      blocks.forEach((b, i) => b.classList.toggle("filled", i < cur));
    }, 60);
  }
}

function applyStatBlock(obj) {
  if (!obj) return;
  Object.entries(obj).forEach(([k, v]) => animateBar(k, v));
}

function showBars() { /* persistent footer stats are hidden from the player */ }

/* ---- SCREEN MGR ---- */
function showScreen(name) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $(`#screen-${name}`).classList.add("active");
  S.screen = name;
}

/* ---- TYPEWRITER ---- */
function charsPerSec() {
  const sp = S.settings.textSpeed;
  if (sp === "slow") return 25;
  if (sp === "instant") return 99999;
  return 40;
}

let typeTimer = null;
function typeText(el, text, cb) {
  clearTimeout(typeTimer);
  const cps = charsPerSec();
  if (cps >= 99999) { el.textContent = text; S.typing = false; if (cb) cb(); return; }
  S.typing = true;
  S.fullText = text;
  let i = 0;
  el.textContent = "";
  function tick() {
    i++;
    el.textContent = text.substring(0, i);
    if (i >= text.length) { S.typing = false; if (cb) cb(); return; }
    typeTimer = setTimeout(tick, 1000 / cps);
  }
  tick();
}

function completeType(el) {
  clearTimeout(typeTimer);
  el.textContent = S.fullText;
  S.typing = false;
}

/* ---- TITLE SCREEN ---- */
function initTitle() {
  $("#btn-start").addEventListener("click", startIntro);
  setTimeout(() => {
    $("#title-text").classList.add("visible");
  }, 100);
}

/* ---- TITLE ANIMATION LOOP ---- */
let lastTime = 0;
let bhLargeTimer = 0, bhSmallTimer = 0, starsTimer = 0, stationTimer = 0;

function titleLoop(ts) {
  if (S.screen !== "title") return;
  const dt = Math.min(ts - lastTime, 50);
  lastTime = ts;

  if (!S.settings.reduceMotion) {
    S.starsOffset -= 4 * dt / 1000;
    $(".title-stars").style.backgroundPosition = `${S.starsOffset}px 0`;
  }

  bhLargeTimer += dt;
  if (bhLargeTimer >= 180) {
    bhLargeTimer -= 180;
    S.bhLargeFrame = (S.bhLargeFrame + 1) % 4;
    $("#title-blackhole").style.backgroundPosition = `-${S.bhLargeFrame * 156}px 0`;
  }

  if (!S.settings.reduceMotion) {
    S.stationX += 12 * dt / 1000;
    if (S.stationX > 340) S.stationX = -20;
    $("#title-station").style.left = S.stationX + "px";
  }

  requestAnimationFrame(titleLoop);
}

/* ---- INTRO ---- */
function startIntro() {
  S.introIdx = 0;
  showScreen("intro");
  showIntroCard();
}

function showIntroCard() {
  const el = $("#intro-text");
  $("#intro-counter").textContent = `${S.introIdx + 1}/${INTRO_CARDS.length}`;
  typeText(el, INTRO_CARDS[S.introIdx]);
}

function advanceIntro() {
  const el = $("#intro-text");
  if (S.typing) { completeType(el); return; }
  S.introIdx++;
  if (S.introIdx >= INTRO_CARDS.length) {
    startSceneDialogue("s1");
  } else {
    showIntroCard();
  }
}

/* ---- LAB ---- */
const ESTER_W = 24, ESTER_H = 30;
const LAB_W = 640, VIEW_W = 320, VIEW_H = 180;
const FOOTER_H = 28;
const FLOOR_TOP = 88;
const FLOOR_BOT = 122;
const ESTER_SPEED = 60;

const BENCHES = [
  {x1:56, x2:118, y1:102, y2:114},
  {x1:182,x2:244, y1:102, y2:114},
  {x1:308,x2:370, y1:102, y2:114},
  {x1:434,x2:496, y1:102, y2:114},
  {x1:540,x2:602, y1:102, y2:114},
];

let labLastTs = 0;
let bhSmallT = 0;
let flickerTimer = 0, flickerNext = 6000;

function startLab() {
  showScreen("lab");
  showBars();
  S.labActive = true;
  S.benchTriggered = false;
  S.esterX = 140;
  S.esterY = 116;
  S.esterDir = 2;
  S.esterFrame = 0;
  S.camX = 0;
  S.keys = {};
  S.labIdleTimer = 0;
  updateLabObjective();
  renderLab();
  labLastTs = performance.now();
  document.addEventListener("keydown", labKeyDown);
  document.addEventListener("keyup", labKeyUp);
  requestAnimationFrame(labLoop);
}

function labKeyDown(e) {
  if (!S.labActive) return;
  const moveKeys = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","w","W","a","A","s","S","d","D"];
  if (moveKeys.includes(e.key) || e.key === " " || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
  S.keys[e.key] = true;

  // E to interact with the atmospheric controls item
  if ((e.key === "e" || e.key === "E") && !S.sensoryItemTriggered) {
    const dx = Math.abs(S.esterX - DAMPENER_ITEM_X);
    if (dx < 50) {
      S.sensoryItemTriggered = true;
      S.benchTriggered = true;
      S.labActive = false;
      S.keys = {};
      document.removeEventListener("keydown", labKeyDown);
      document.removeEventListener("keyup", labKeyUp);
      setTimeout(() => startSensoryGame(), 200);
      return;
    }
  }
}
function labKeyUp(e) { S.keys[e.key] = false; }

function labLoop(ts) {
  if (S.screen !== "lab") return;
  const dt = Math.min(ts - labLastTs, 50);
  labLastTs = ts;

  if (S.labActive) {
    let dx = 0, dy = 0;
    if (S.keys["ArrowLeft"] || S.keys["a"] || S.keys["A"]) dx = -1;
    if (S.keys["ArrowRight"] || S.keys["d"] || S.keys["D"]) dx = 1;
    if (S.keys["ArrowUp"] || S.keys["w"] || S.keys["W"]) dy = -1;
    if (S.keys["ArrowDown"] || S.keys["s"] || S.keys["S"]) dy = 1;

    S.esterMoving = dx !== 0 || dy !== 0;

    if (S.esterMoving) {
      S.labIdleTimer = 0;
      if (dx < 0) S.esterDir = 1;
      else if (dx > 0) S.esterDir = 2;
      else if (dy < 0) S.esterDir = 3;
      else if (dy > 0) S.esterDir = 0;

      let nx = S.esterX + dx * ESTER_SPEED * dt / 1000;
      let ny = S.esterY + dy * ESTER_SPEED * dt / 1000;
      nx = Math.max(4, Math.min(LAB_W - ESTER_W - 4, nx));
      ny = Math.max(FLOOR_TOP, Math.min(FLOOR_BOT, ny));

      S.esterX = nx;
      S.esterY = ny;
    } else {
      S.labIdleTimer += dt;
    }

    S.camX = Math.max(0, Math.min(LAB_W - VIEW_W, S.esterX - VIEW_W / 2 + ESTER_W / 2));

    if (!S.benchTriggered && S.esterX > 500 && S.esterX < 560) {
      S.benchTriggered = true;
      S.labActive = false;
      S.keys = {};
      document.removeEventListener("keydown", labKeyDown);
      document.removeEventListener("keyup", labKeyUp);
      setTimeout(() => startSceneDialogue("pb1"), 300);
      return;
    }
  }

  bhSmallT += dt;
  if (bhSmallT >= 180) {
    bhSmallT -= 180;
    S.bhSmallFrame = (S.bhSmallFrame + 1) % 4;
    $("#lab-blackhole-small").style.backgroundPosition = `-${S.bhSmallFrame * 72}px 0`;
  }

  updateLabPrompt();
  renderLab();
  requestAnimationFrame(labLoop);
}

function renderLab() {
  const world = $("#lab-world");
  world.style.transform = `translate3d(${-S.camX}px,0,0)`;

  const e = $("#lab-ester");
  e.style.transform = `translate3d(${S.esterX}px,${S.esterY}px,0)`;
}

const DAMPENER_ITEM_X = 340;

function updateLabPrompt() {
  const promptEl = $("#lab-prompt");
  const dx = Math.abs(S.esterX - DAMPENER_ITEM_X);
  if (!S.sensoryItemTriggered && dx < 50) {
    promptEl.style.left = (DAMPENER_ITEM_X - 24) + "px";
    promptEl.style.top  = "72px";
    promptEl.classList.remove("hidden");
  } else {
    promptEl.classList.add("hidden");
  }
  $("#lab-arrow").classList.add("hidden");
}

function tryExamine() {}

function showLabTextbox(text) {}

function dismissLabTextbox() {
  if (S.typing) { completeType($("#lab-textbox-text")); return; }
  $("#lab-textbox").classList.add("hidden");
  S.labActive = true;
}

function updateLabObjective() {
  $("#lab-objective").textContent = "Walk to the far bench.";
}

function checkLabArrow() {}

/* ---- SCENE ---- */
let sceneIdleBounceTimer = 0;

function startSceneDialogue(nodeId) {
  showScreen("scene");
  showBars();

  const sw = $("#scene-world");
  if (nodeId === "s1") {
    S.sceneScrollX = 20;
    $("#scene-sprite-sam").style.left = "140px";
    $("#scene-sprite-ester").style.left = "180px";
    $("#scene-sprite-jerry").classList.add("hidden");
  } else {
    S.sceneScrollX = 320;
    $("#scene-sprite-sam").style.left = "385px";
    $("#scene-sprite-jerry").style.left = "430px";
    $("#scene-sprite-ester").style.left = "465px";
  }
  sw.style.left = -S.sceneScrollX + "px";

  sceneIdleBounceTimer = 0;
  sceneAnimTs = performance.now();
  requestAnimationFrame(sceneAnimLoop);
  runNode(nodeId);
}

let sceneAnimTs = 0;
function sceneAnimLoop(ts) {
  if (S.screen !== "scene") return;
  const dt = ts - sceneAnimTs;
  sceneAnimTs = ts;

  if (!S.idlePaused && !S.settings.reduceMotion) {
    sceneIdleBounceTimer += dt;
    if (sceneIdleBounceTimer >= 520) {
      sceneIdleBounceTimer -= 520;
      S.idleBounce = 1 - S.idleBounce;
      const frameX = S.idleBounce * 24;
      $$(".scene-sprite").forEach(sp => {
        if (sp.dataset.char === "ester" || sp.dataset.char === "sam" || sp.dataset.char === "jerry") return;
        if (sp.classList.contains("hidden")) return;
        sp.style.backgroundPosition = `-${frameX}px 0`;
      });
      const portrait = $("#dialogue-portrait");
      if (!portrait.classList.contains("hidden") &&
          !portrait.classList.contains("char-ester") &&
          !portrait.classList.contains("char-sam") &&
          !portrait.classList.contains("char-jerry")) {
        portrait.style.backgroundPosition = `-${frameX}px 0`;
      }
    }
  }

  requestAnimationFrame(sceneAnimLoop);
}

function runNode(nodeId) {
  const node = NODE_MAP[nodeId];
  if (!node) { showEnd(); return; }
  S.currentNode = node;

  if (node.applyStats) applyStatBlock(node.applyStats);

  if (node.showSprites) {
    $("#scene-sprite-sam").classList.toggle("hidden", !node.showSprites.includes("sam"));
    $("#scene-sprite-jerry").classList.toggle("hidden", !node.showSprites.includes("jerry"));
    $("#scene-sprite-ester").classList.toggle("hidden", !node.showSprites.includes("ester"));
  }

  if (node.type === "control") {
    if (node.action === "start_lab") { startLab(); return; }
  }

  if (node.type === "alarm") { showAlarm(); return; }

  if (node.type === "choice") { showChoicePanel(node.choices); return; }

  if (node.type === "inner") {
    S.idlePaused = true;
    $$(".scene-sprite").forEach(sp => sp.classList.add("dimmed"));
  } else {
    S.idlePaused = false;
    $$(".scene-sprite").forEach(sp => sp.classList.remove("dimmed"));
  }

  const row = $("#dialogue-row");
  row.classList.remove("hidden");

  const box = $("#dialogue-box");
  box.classList.remove("type-dialogue", "type-inner", "type-narration");
  box.classList.add(`type-${node.type}`);

  const portrait = $("#dialogue-portrait");
  portrait.className = "";
  portrait.style.backgroundPosition = "0 0";
  if (node.type === "dialogue" && node.speaker) {
    const charName = node.speaker.toLowerCase();
    portrait.classList.add("char-" + charName);
    portrait.classList.remove("hidden");
  } else {
    portrait.classList.add("hidden");
  }

  const speakerEl = $("#dialogue-speaker");
  if (node.type === "dialogue" && node.speaker) {
    speakerEl.textContent = node.speaker;
    speakerEl.style.display = "";
  } else {
    speakerEl.textContent = "";
    speakerEl.style.display = "none";
  }

  typeText($("#dialogue-text"), node.text);
}

function advanceScene() {
  const node = S.currentNode;
  if (!node) return;
  if (S.typing) { completeType($("#dialogue-text")); return; }
  if (node.next) {
    runNode(node.next);
  } else {
    showEnd();
  }
}

/* ---- ALARM → triggers sensory mini-game ---- */
function showAlarm() {
  if (S.settings.quiet) {
    applyStatBlock({social:-3});
    runNode("pa1");
    return;
  }
  startSensoryGame();
}

/* ---- SENSORY OVERLOAD MINI-GAME ---- */
const SENSORY_TRACK_W = 200;
const SENSORY_STEP = 6;

const NOISE_CENTER = 65, NOISE_HALF = 15, NOISE_SWING = 24, NOISE_FREQ = 0.50;
const LIGHT_CENTER = 50, LIGHT_HALF = 10, LIGHT_SWING = 20, LIGHT_FREQ = 0.44;

const SENSORY_EXPLAIN_TEXT =
  "A device containing elemental mercury has overturned near the ventilation intake. " +
  "The atmospheric alarm triggered automatically.\n\n" +
  "Noise and light readings are approaching hazardous levels. " +
  "The environmental systems need manual calibration before conditions become unmanageable.";

const SENSORY_INTERJECT_TEXT =
  "The alarm is deafening.\n\n" +
  "Your noise-canceling dampeners are on the desk — second drawer.";

let sensoryWarningTimer = null;
let sensoryTypeTimer   = null;
let sensoryGameActive  = false;
let sensoryStartTime   = 0;
let sensoryLastTs      = 0;
let sensoryCurrentFlashDur = 3;
let sensoryCurrentNoiseMin, sensoryCurrentNoiseMax;
let sensoryCurrentLightMin, sensoryCurrentLightMax;

/* ------------------------------------------------------------------ */
function startSensoryGame() {
  // Reset all state
  S.sensoryNoise = 0; S.sensoryLight = 100;
  S.sensoryPhase = 0; S.sensoryDone = false;
  S.sensoryState = "explain";
  S.sensoryStress = 0;
  S.sensoryInterjectShown = false;
  S.sensoryInterjectActive = false;
  S.sensoryHasDampeners = false;
  S.sensoryUiReady = false;
  sensoryGameActive = false;
  sensoryCurrentFlashDur = 3;

  sensoryCurrentNoiseMin = NOISE_CENTER - NOISE_HALF;
  sensoryCurrentNoiseMax = NOISE_CENTER + NOISE_HALF;
  sensoryCurrentLightMin = LIGHT_CENTER - LIGHT_HALF;
  sensoryCurrentLightMax = LIGHT_CENTER + LIGHT_HALF;

  // Reset shake CSS vars
  sensoryResetShake();

  // Hide interject
  $("#sensory-interject").classList.add("hidden");
  $("#sensory-interject-body").textContent = "";
  $("#sensory-interject-hint").classList.remove("visible");

  // Show explain overlay, hide calibration panel
  $("#sensory-explain").classList.remove("hidden");
  $("#sensory-explain-body").textContent = "";
  $("#sensory-explain-hint").classList.remove("visible");
  $("#sensory-panel").classList.remove("visible");

  // Reset bg animation to calm intro flash
  $("#sensory-bg").style.animation = "bgFlashIntro 3s infinite";

  // Reset sliders and zones
  resetSensoryUI();

  showScreen("sensory");
  document.removeEventListener("keydown", sensoryKeyDown);
  document.addEventListener("keydown", sensoryKeyDown);

  // Typewrite the explanation text (fast)
  clearTimeout(sensoryTypeTimer);
  sensoryTypeTimer = setTimeout(() => {
    sensoryTypeText(
      $("#sensory-explain-body"),
      SENSORY_EXPLAIN_TEXT,
      () => {
        S.sensoryUiReady = true;
        $("#sensory-explain-hint").classList.add("visible");
      },
      8, 22
    );
  }, 400);
}

function startSensoryCalibration() {
  S.sensoryState = "calibrate";
  S.sensoryUiReady = false;
  $("#sensory-explain").classList.add("hidden");

  // Alarm onset — snap to full chaos
  sensoryCurrentFlashDur = 1.4;
  $("#sensory-bg").style.animation = `bgFlash ${sensoryCurrentFlashDur}s infinite`;

  setTimeout(() => { $("#sensory-panel").classList.add("visible"); }, 180);

  sensoryStartTime = performance.now();
  sensoryLastTs    = sensoryStartTime;
  sensoryGameActive = true;
  requestAnimationFrame(sensoryGameLoop);
}

function triggerSensoryInterject() {
  S.sensoryInterjectShown  = true;
  S.sensoryInterjectActive = true;
  S.sensoryUiReady = false;
  $("#sensory-interject").classList.remove("hidden");
  clearTimeout(sensoryTypeTimer);
  sensoryTypeText(
    $("#sensory-interject-body"),
    SENSORY_INTERJECT_TEXT,
    () => {
      S.sensoryUiReady = true;
      $("#sensory-interject-hint").classList.add("visible");
    }
  );
}

function equipSensoryDampeners() {
  S.sensoryHasDampeners   = true;
  S.sensoryInterjectActive = false;
  S.sensoryUiReady = false;
  S.sensoryStress  = 0;
  $("#sensory-interject").classList.add("hidden");
  $("#sensory-interject-body").textContent = "";
  $("#sensory-interject-hint").classList.remove("visible");

  sensoryCurrentFlashDur = 1.8;
  sensoryResetShake();
  sensoryShowStatus("Better. Now calibrate the environmental systems.", false);
}

/* ------------------------------------------------------------------ */
function sensoryGameLoop(ts) {
  if (!sensoryGameActive || S.screen !== "sensory") return;

  const dt      = Math.min(ts - sensoryLastTs, 50) / 1000;
  sensoryLastTs = ts;
  const elapsed = (ts - sensoryStartTime) / 1000;

  // Trigger dampener interject at 80% stress (once)
  if (S.sensoryStress >= 80 && !S.sensoryInterjectShown && !S.sensoryDone) {
    S.sensoryStress = 80;
    triggerSensoryInterject();
  }

  // Stress: frozen while interject is open; slower after dampeners
  if (!S.sensoryInterjectActive) {
    const rate = S.sensoryHasDampeners
      ? 0.8
      : (S.sensoryPhase >= 1 ? 5.5 : 9);
    const cap = S.sensoryInterjectShown ? 100 : 80;
    S.sensoryStress = Math.min(cap, S.sensoryStress + rate * dt);
  }

  // Value drift — keeps going even during interject
  const driftRate = 1.8 + S.sensoryStress * 0.09;
  if (S.sensoryPhase === 0) S.sensoryNoise = Math.max(0,   S.sensoryNoise - driftRate * dt);
  if (!S.sensoryDone)       S.sensoryLight = Math.min(100, S.sensoryLight + driftRate * dt);

  // Zone oscillation (4 s grace, then speeds with stress)
  const oscE     = Math.max(0, elapsed - 4);
  const speedMul = 1 + (S.sensoryStress / 100) * 0.9;
  const nCtr = NOISE_CENTER + Math.sin(oscE * NOISE_FREQ * speedMul) * NOISE_SWING;
  const lCtr = LIGHT_CENTER + Math.sin(oscE * LIGHT_FREQ * speedMul + 2.1) * LIGHT_SWING;
  sensoryCurrentNoiseMin = nCtr - NOISE_HALF;
  sensoryCurrentNoiseMax = nCtr + NOISE_HALF;
  sensoryCurrentLightMin = lCtr - LIGHT_HALF;
  sensoryCurrentLightMax = lCtr + LIGHT_HALF;
  updateSensoryZones();

  renderSensoryStress();
  applyStressEffects();
  renderSensory();

  if (S.sensoryStress >= 100 && !S.sensoryDone) {
    triggerSensoryFail();
    return;
  }
  requestAnimationFrame(sensoryGameLoop);
}

/* ------------------------------------------------------------------ */
function applyStressEffects() {
  const s = S.sensoryStress;
  const hasDamp = S.sensoryHasDampeners;

  const flashMin = hasDamp ? 0.55 : 0.16;
  const flashMax = hasDamp ? 2.2  : 1.40;
  sensoryCurrentFlashDur = +(flashMax - (s / 100) * (flashMax - flashMin)).toFixed(2);

  const threshold = hasDamp ? 42 : 25;
  const maxPx     = hasDamp ? 1.8 : 4.5;
  const root  = document.documentElement;
  const screen = $("#screen-sensory");
  const bg    = $("#sensory-bg");
  const anim  = hasDamp ? "bgFlashCalm" : "bgFlash";

  if (s < threshold) {
    root.style.setProperty("--sx", "0px"); root.style.setProperty("--sy", "0px");
    root.style.setProperty("--bx", "0px"); root.style.setProperty("--by", "0px");
    screen.style.animation = "none";
    bg.style.animation     = `${anim} ${sensoryCurrentFlashDur}s infinite`;
    return;
  }
  const t      = (s - threshold) / (100 - threshold);
  const totalPx = maxPx * t;
  const gamePx  = +(totalPx * 0.38).toFixed(1);
  const bgPx    = +(totalPx * 0.62).toFixed(1);
  const spd     = Math.round(500 - t * (hasDamp ? 360 : 445));

  root.style.setProperty("--sx", gamePx + "px");
  root.style.setProperty("--sy", (gamePx * 0.55).toFixed(1) + "px");
  root.style.setProperty("--bx", bgPx + "px");
  root.style.setProperty("--by", (bgPx * 0.55).toFixed(1) + "px");

  screen.style.animation = `shake ${spd}ms linear infinite`;
  bg.style.animation     = `${anim} ${sensoryCurrentFlashDur}s infinite, shake-bg ${spd}ms linear infinite`;
}

function sensoryResetShake() {
  const root = document.documentElement;
  root.style.setProperty("--sx", "0px"); root.style.setProperty("--sy", "0px");
  root.style.setProperty("--bx", "0px"); root.style.setProperty("--by", "0px");
  const screen = $("#screen-sensory");
  if (screen) screen.style.animation = "none";
  const bg = $("#sensory-bg");
  if (bg) {
    const anim = S.sensoryHasDampeners ? "bgFlashCalm" : "bgFlash";
    bg.style.animation = `${anim} ${sensoryCurrentFlashDur}s infinite`;
  }
}

/* ------------------------------------------------------------------ */
function sensoryKeyDown(e) {
  if (S.screen !== "sensory") return;
  if (["w","W","s","S"," "].includes(e.key)) e.preventDefault();

  if (e.key === " ") {
    // Phase 1: dismiss explanation → start calibration
    if (S.sensoryState === "explain" && S.sensoryUiReady) {
      startSensoryCalibration();
      return;
    }
    // Mid-game interject: equip dampeners
    if (S.sensoryInterjectActive && S.sensoryUiReady) {
      equipSensoryDampeners();
      return;
    }
    // Calibration: lock sliders
    if (S.sensoryState === "calibrate" && !S.sensoryInterjectActive && !S.sensoryDone) {
      if (S.sensoryPhase === 0) {
        if (S.sensoryNoise >= sensoryCurrentNoiseMin && S.sensoryNoise <= sensoryCurrentNoiseMax) {
          S.sensoryPhase = 1;
          sensoryShowStatus("NOISE DAMPENED — now lock the light filter", false);
        } else {
          S.sensoryStress = Math.min(100, S.sensoryStress + 7);
          sensoryShowWarning("Noise level out of range. Adjust using [W/S] first.");
        }
      } else {
        if (S.sensoryLight >= sensoryCurrentLightMin && S.sensoryLight <= sensoryCurrentLightMax) {
          triggerSensorySuccess();
        } else {
          S.sensoryStress = Math.min(100, S.sensoryStress + 7);
          sensoryShowWarning("Light level out of range. Adjust using [W/S] first.");
        }
      }
      renderSensory();
    }
    // Retry after fail
    if (S.sensoryDone && S.sensoryStress >= 100) {
      sensoryRetry();
    }
    return;
  }

  // W/S only during calibration, not while interject open
  if (S.sensoryState !== "calibrate" || S.sensoryInterjectActive || S.sensoryDone) return;
  const up = e.key === "w" || e.key === "W";
  const dn = e.key === "s" || e.key === "S";
  if (up || dn) {
    const delta = up ? SENSORY_STEP : -SENSORY_STEP;
    if (S.sensoryPhase === 0)
      S.sensoryNoise = Math.min(100, Math.max(0, S.sensoryNoise + delta));
    else
      S.sensoryLight = Math.min(100, Math.max(0, S.sensoryLight + delta));
    renderSensory();
  }
}

/* ------------------------------------------------------------------ */
function triggerSensorySuccess() {
  S.sensoryDone = true;
  sensoryGameActive = false;
  clearTimeout(sensoryWarningTimer);
  sensoryResetShake();
  sensoryCurrentFlashDur = 3;
  $("#sensory-bg").style.animation = "bgFlashCalm 3s infinite";
  sensoryShowStatus("ENVIRONMENT NORMALIZED", false);
  renderSensory();
  applyStatBlock({mental:6, emotional:5});
  setTimeout(() => {
    document.removeEventListener("keydown", sensoryKeyDown);
    showScreen("scene");
    sceneAnimTs = performance.now();
    requestAnimationFrame(sceneAnimLoop);
    runNode("pa1");
  }, 1500);
}

function triggerSensoryFail() {
  S.sensoryDone = true;
  sensoryGameActive = false;
  clearTimeout(sensoryWarningTimer);
  $("#sensory-interject").classList.add("hidden");
  // Flash at max intensity briefly
  const root = document.documentElement;
  root.style.setProperty("--sx", "2px"); root.style.setProperty("--sy", "1.1px");
  root.style.setProperty("--bx", "4px"); root.style.setProperty("--by", "2.2px");
  $("#screen-sensory").style.animation    = "shake 55ms linear infinite";
  $("#sensory-bg").style.animation = "bgFlash .1s infinite, shake-bg 55ms linear infinite";
  setTimeout(() => {
    sensoryResetShake();
    $("#sensory-bg").style.animation = "bgFlash 1.4s infinite";
    const el = $("#sensory-status");
    el.textContent = "SENSORY OVERLOAD — SPACE to retry";
    el.className = "warning";
  }, 650);
}

function sensoryRetry() {
  // Restart just the calibration phase (skip explanation)
  S.sensoryNoise = 0; S.sensoryLight = 100;
  S.sensoryPhase = 0; S.sensoryDone = false;
  S.sensoryStress = 0;
  S.sensoryInterjectShown = false;
  S.sensoryInterjectActive = false;
  S.sensoryHasDampeners = false;
  sensoryCurrentFlashDur = 1.4;
  sensoryCurrentNoiseMin = NOISE_CENTER - NOISE_HALF;
  sensoryCurrentNoiseMax = NOISE_CENTER + NOISE_HALF;
  sensoryCurrentLightMin = LIGHT_CENTER - LIGHT_HALF;
  sensoryCurrentLightMax = LIGHT_CENTER + LIGHT_HALF;
  $("#sensory-interject").classList.add("hidden");
  $("#sensory-bg").style.animation = `bgFlash ${sensoryCurrentFlashDur}s infinite`;
  resetSensoryUI();
  sensoryResetShake();
  sensoryStartTime = performance.now();
  sensoryLastTs    = sensoryStartTime;
  sensoryGameActive = true;
  requestAnimationFrame(sensoryGameLoop);
}

/* ------------------------------------------------------------------ */
function updateSensoryZones() {
  $("#noise-zone").style.left  = (sensoryCurrentNoiseMin / 100 * SENSORY_TRACK_W) + "px";
  $("#noise-zone").style.width = ((sensoryCurrentNoiseMax - sensoryCurrentNoiseMin) / 100 * SENSORY_TRACK_W) + "px";
  $("#light-zone").style.left  = (sensoryCurrentLightMin / 100 * SENSORY_TRACK_W) + "px";
  $("#light-zone").style.width = ((sensoryCurrentLightMax - sensoryCurrentLightMin) / 100 * SENSORY_TRACK_W) + "px";
}

function renderSensoryStress() {
  const pct = Math.round(S.sensoryStress);
  $("#stress-fill").style.width = pct + "%";
  $("#stress-val").textContent  = pct + "%";
  $("#sensory-db").textContent  = Math.round(76 + S.sensoryStress * 0.22) + " dB";
}

function resetSensoryUI() {
  clearTimeout(sensoryWarningTimer);
  sensoryCurrentNoiseMin = NOISE_CENTER - NOISE_HALF;
  sensoryCurrentNoiseMax = NOISE_CENTER + NOISE_HALF;
  sensoryCurrentLightMin = LIGHT_CENTER - LIGHT_HALF;
  sensoryCurrentLightMax = LIGHT_CENTER + LIGHT_HALF;
  updateSensoryZones();
  $("#sensory-status").textContent = "";
  $("#sensory-status").className = "";
  $("#ctrl-noise").className = "sensory-control";
  $("#ctrl-light").className = "sensory-control";
  $("#noise-val").textContent = "0%";
  $("#light-val").textContent = "100%";
  $("#stress-fill").style.width = "0%";
  $("#stress-val").textContent = "0%";
  $("#sensory-db").textContent = "76 dB";
  renderSensory();
}

function renderSensory() {
  $("#noise-handle").style.left = (S.sensoryNoise / 100 * SENSORY_TRACK_W - 3) + "px";
  $("#light-handle").style.left = (S.sensoryLight / 100 * SENSORY_TRACK_W - 3) + "px";

  const noiseLocked = S.sensoryPhase >= 1;
  const lightLocked = S.sensoryDone && S.sensoryStress < 100;
  $("#noise-val").textContent = noiseLocked ? "LOCKED ✓" : Math.round(S.sensoryNoise) + "%";
  $("#light-val").textContent = lightLocked ? "LOCKED ✓" : Math.round(S.sensoryLight) + "%";

  $("#ctrl-noise").classList.toggle("selected", S.sensoryPhase === 0);
  $("#ctrl-noise").classList.toggle("locked",   noiseLocked);
  $("#ctrl-light").classList.toggle("selected", S.sensoryPhase === 1 && !S.sensoryDone);
  $("#ctrl-light").classList.toggle("locked",   lightLocked);

  const noiseOk = S.sensoryNoise >= sensoryCurrentNoiseMin && S.sensoryNoise <= sensoryCurrentNoiseMax;
  const lightOk = S.sensoryLight >= sensoryCurrentLightMin && S.sensoryLight <= sensoryCurrentLightMax;
  $("#ctrl-noise").classList.toggle("in-range", noiseOk && !noiseLocked);
  $("#ctrl-light").classList.toggle("in-range", lightOk && !lightLocked);
}

function sensoryShowStatus(msg, isWarn) {
  clearTimeout(sensoryWarningTimer);
  const el = $("#sensory-status");
  el.textContent = msg;
  el.className   = isWarn ? "warning" : "";
  if (isWarn) sensoryWarningTimer = setTimeout(() => { el.textContent = ""; el.className = ""; }, 2000);
}
function sensoryShowWarning(msg) { sensoryShowStatus(msg, true); }

/* Typewriter used only by the sensory overlays (supports charMs / punctMs speeds) */
function sensoryTypeText(el, text, onDone, charMs, punctMs) {
  clearTimeout(sensoryTypeTimer);
  el.textContent = "";
  const chars = [...text];
  const cd = charMs  ?? 34;
  const pd = punctMs ?? 80;
  let i = 0;
  function tick() {
    if (i >= chars.length) { if (onDone) onDone(); return; }
    const ch = chars[i++];
    if (ch === "\n" && chars[i] === "\n") {
      el.appendChild(document.createElement("br"));
      el.appendChild(document.createElement("br"));
      i++;
    } else {
      el.appendChild(document.createTextNode(ch));
    }
    sensoryTypeTimer = setTimeout(tick, (ch === "." || ch === "," || ch === "—") ? pd : cd);
  }
  tick();
}

/* ---- CHOICES ---- */
function showChoicePanel(choices) {
  const panel = $("#choice-panel");
  $("#dialogue-row").classList.add("hidden");
  panel.innerHTML = "";
  panel.classList.remove("hidden");

  choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-purple choice-btn";
    btn.innerHTML = `<span>${c.label}</span><span class="cost">${c.cost}</span>`;
    btn.tabIndex = 0;
    btn.addEventListener("click", () => {
      panel.classList.add("hidden");
      applyStatBlock(c.stats);
      runNode(c.next);
    });
    panel.appendChild(btn);
  });
  panel.querySelector("button").focus();
}

/* ---- END SCREEN ---- */
function showEnd() {
  if (S.screen === "end") return;
  showScreen("end");
  $("#dialogue-row").classList.add("hidden");
  S.idlePaused = false;

  const barsDiv = $("#end-bars");
  barsDiv.innerHTML = "";
  const labels = {social:"SOCIAL", career:"CAREER", emotional:"EMOTIONAL", mental:"MENTAL"};
  Object.entries(labels).forEach(([k, label]) => {
    const col = document.createElement("div");
    col.className = "end-bar";
    col.innerHTML = `
      <div class="end-bar-val">${S.stats[k]}</div>
      <div class="end-bar-track"><div class="end-bar-fill" data-stat="${k}"></div></div>
      <div class="end-bar-label">${label}</div>`;
    barsDiv.appendChild(col);
  });

  setTimeout(() => {
    $$(".end-bar-fill").forEach(f => {
      const stat = f.dataset.stat;
      f.style.height = (S.stats[stat] / 100 * 60) + "px";
    });
  }, 100);

  setTimeout(() => {
    const ref = $("#end-reflection");
    ref.textContent = REFLECTION_TEXT;
    ref.classList.remove("hidden");
    ref.classList.add("visible");
    $("#end-buttons").classList.remove("hidden");
  }, 1800);
}

/* ---- RESTART ---- */
function initRestart() {
  $("#btn-restart").addEventListener("click", () => {
    S.stats = {social:60, career:60, emotional:60, mental:60};
    S.introIdx = 0;
    S.labSeen = {};
    S.benchTriggered = false;
    S.currentNode = null;
    S.typing = false;
    S.keys = {};
    S.labActive = false;
    S.allExamined = false;
    S.bhLargeFrame = 0;
    S.bhSmallFrame = 0;
    S.starsOffset = 0;
    S.stationX = -20;
    S.labIdleTimer = 0;
    S.idlePaused = false;
    // sensory mini-game reset
    document.removeEventListener("keydown", sensoryKeyDown);
    sensoryGameActive = false;
    sensoryResetShake();
    clearTimeout(sensoryTypeTimer);
    clearTimeout(sensoryWarningTimer);
    S.sensoryNoise = 0; S.sensoryLight = 100;
    S.sensoryPhase = 0; S.sensoryDone = false;
    S.sensoryState = "idle";
    S.sensoryStress = 0;
    S.sensoryInterjectShown = false;
    S.sensoryInterjectActive = false;
    S.sensoryHasDampeners = false;
    S.sensoryUiReady = false;
    S.sensoryItemTriggered = false;
    $("#sensory-interject").classList.add("hidden");
    $("#sensory-explain").classList.remove("hidden");
    $("#sensory-explain-body").textContent = "";
    $("#sensory-explain-hint").classList.remove("visible");
    $("#sensory-panel").classList.remove("visible");
    resetSensoryUI();
    syncBars(true);
    $("#alarm-overlay").classList.add("hidden");
    $("#alarm-overlay").classList.remove("pulse");
    $("#choice-panel").classList.add("hidden");
    $("#dialogue-row").classList.add("hidden");
    $("#end-reflection").classList.remove("visible");
    $("#end-reflection").classList.add("hidden");
    $("#end-buttons").classList.add("hidden");
    $("#lab-textbox").classList.add("hidden");
    $("#lab-arrow").classList.add("hidden");
    showScreen("title");
    lastTime = performance.now();
    requestAnimationFrame(titleLoop);
  });
}

/* ---- GLOBAL INPUT ---- */
function initInput() {
  document.addEventListener("click", e => {
    if (S.screen === "intro") advanceIntro();
  });
  document.addEventListener("keydown", e => {
    if (S.screen === "intro" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      advanceIntro();
    }
    if (S.screen === "scene" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      if (!$("#choice-panel").classList.contains("hidden")) return;
      advanceScene();
    }
    if (S.screen === "lab" && !$("#lab-textbox").classList.contains("hidden")) {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        dismissLabTextbox();
      }
    }
  });
  $("#dialogue-row").addEventListener("click", () => {
    if (S.screen === "scene") advanceScene();
  });
  $("#lab-textbox").addEventListener("click", () => dismissLabTextbox());
}

/* ---- INIT ---- */
function init() {
  applyScale();
  initTitle();
  initBarBlocks();
  initRestart();
  initInput();

  lastTime = performance.now();
  requestAnimationFrame(titleLoop);
}

document.addEventListener("DOMContentLoaded", init);
