/* ============================================================
   EVENT HORIZON — Day 1 Prototype
   ============================================================ */

/* ---- SCRIPT DATA ----------------------------------------- */

const INTRO_CARDS = [
  "The universe is getting smaller. Not slowly \u2014 measurably. Somebody is supposed to be finding out why.",
  "Your school gave up on you. So they sent you somewhere nobody would ask questions.",
  "Your lab has thirty days of funding left. Today is your first shift."
];

const LAB_OBJECTS = [
  { id:"whiteboard", x1:52, x2:130, text:"Five names on the whiteboard. Four are crossed out. One isn\u2019t.", stats:{emotional:-2} },
  { id:"window",     x1:240,x2:332, text:"The black hole. The accretion disk completes a rotation every forty-one minutes. Esther has checked twice.", stats:{mental:4} },
  { id:"terminal",   x1:360,x2:426, text:"Requisition terminal. Form 12-B requires Form 12-A, which requires a signature from someone who requires Form 12-B.", stats:{career:2} },
  { id:"monitor",    x1:534,x2:554, text:"The atmospheric monitor. A hand\u2019s width from the bench edge, cable across the walkway. It has been here eight months, apparently.", stats:{} }
];

/* Node types: "dialogue", "inner", "narration", "choice", "alarm", "control" */
const SCENE_SCRIPT = [
  {id:"s1", type:"dialogue", speaker:"SAM", text:"Shadowing rules \u2014 you observe, you don\u2019t touch, and if anyone asks you\u2019re a visiting student, not a hire, because the hiring freeze is technically still on. Any questions?", next:"s2", showSprites:["sam","esther"]},
  {id:"s2", type:"dialogue", speaker:"ESTHER", text:"Two. Is the fume hood on bench four vented to the same manifold as three?", next:"s3"},
  {id:"s3", type:"dialogue", speaker:"SAM", text:"\u2026Yes?", next:"s4"},
  {id:"s4", type:"dialogue", speaker:"ESTHER", text:"Then bench four shouldn\u2019t have a mercury-column instrument on it. And the atmospheric monitor is a hand\u2019s width from the bench edge with its cable across the walkway.", next:"s5"},
  {id:"s5", type:"dialogue", speaker:"SAM", text:"It\u2019s been there eight months.", next:"s6"},
  {id:"s6", type:"dialogue", speaker:"ESTHER", text:"That doesnt make it further from the edge.", next:"lab_explore"},

  // lab_explore is a control node — starts the lab screen
  {id:"lab_explore", type:"control", action:"start_lab"},

  // Post-bench: scene resumes here
  {id:"pb1", type:"dialogue", speaker:"SAM", text:"Hey, Jerry, could you grab the\u2014 JERRY!", next:"pb2", showSprites:["sam","jerry","esther"]},
  {id:"pb2", type:"narration", text:"A crash. Glass on tile. Small pieces rolling outward in four directions.", next:"pb3"},
  {id:"pb3", type:"dialogue", speaker:"JERRY", text:"I\u2019m sorry \u2014 it wasn\u2019t\u2014 I turned around and my sleeve caught it, it was right on the edge, I didn\u2019t\u2014", next:"pb4"},
  {id:"pb4", type:"dialogue", speaker:"SAM", text:"Oh, God.", next:"alarm"},

  {id:"alarm", type:"alarm"},

  // Post-alarm
  {id:"pa1", type:"narration", text:"Mercury on the floor. Small beads rolling into the grout lines, pooling where the tile dips.", next:"pa2"},
  {id:"pa2", type:"dialogue", speaker:"ESTHER", text:"Everyone stop walking. Jerry \u2014 vacuum and a disposable sharps bin, the largest rigid one in the cabinet, not the bag. Sam, seal the door and kill the manifold to three and four. That unit holds about six ounces of elemental mercury and the vent is running. I\u2019ll write the incident report. Jerry, what\u2019s your surname? I\u2019m putting your name down as the person responsible. And \u2014 this was an accident, correct?", next:"pa3"},
  {id:"pa3", type:"dialogue", speaker:"JERRY", text:"Of course it was an accident. That\u2019s what I just said.", next:"pa4"},
  {id:"pa4", type:"narration", text:"He hasn\u2019t moved. Neither has anyone else. Sam is looking at the floor.", next:"choice1_inner"},

  // Inner voice before choice
  {id:"choice1_inner", type:"inner", text:"You asked a yes-or-no question. He said yes. But he\u2019s frozen, and his voice went tight. People don\u2019t react like that to answering a question correctly.", next:"choice1"},

  // CHOICE 1
  {id:"choice1", type:"choice", choices:[
    {label:"\u201CWhat\u2019s wrong?\u201D", cost:"SOCIAL +6   CAREER -5   MENTAL -3", stats:{social:6,career:-5,mental:-3}, next:"ba1"},
    {label:"\u201CPlease. Six ounces of mercury, and the vent is running. We need this contained in the next four minutes.\u201D", cost:"CAREER +6   SOCIAL -5   EMOTIONAL -3", stats:{career:6,social:-5,emotional:-3}, next:"bb1"}
  ]},

  // Branch A
  {id:"ba1", type:"dialogue", speaker:"JERRY", text:"What\u2019s wrong? I\u2019ve worked here eleven years. I\u2019ve never seen you before in my life and your first act is to put my name in an incident report in front of two witnesses. What did I ever do to you?", next:"ba2"},
  {id:"ba2", type:"dialogue", speaker:"ESTHER", text:"I\u2019ve never seen you before either. I don\u2019t hold any vendetta against you. I don\u2019t know you well enough to.", next:"ba3"},
  {id:"ba3", type:"dialogue", speaker:"JERRY", text:"Then why are you being so accusatory?", next:"ba4"},
  {id:"ba4", type:"dialogue", speaker:"ESTHER", text:"Your sleeve caught the device. That\u2019s the sequence of events. The form has a field labelled \u201Cperson responsible\u201D and it doesn\u2019t have a field for anything else.", next:"ba5"},
  {id:"ba5", type:"dialogue", speaker:"JERRY", text:"We could have sorted out whose name goes where later. It\u2019s the way you said it. \u201CWhat\u2019s your surname, I\u2019m putting you down as responsible.\u201D A first-week student. Like you were reading out a sentence.", next:"ba6"},
  {id:"ba6", type:"inner", text:"He\u2019s not angry about the form. He\u2019s angry about the way you said it. You replay the sentence in your head. You can hear the words but you can\u2019t hear what he heard.", next:"ba7"},
  {id:"ba7", type:"narration", text:"The mercury is still on the floor. The vent is still running.", next:"choice2", applyStats:{career:-3}},

  // Branch B
  {id:"bb1", type:"dialogue", speaker:"JERRY", text:"Right. Yes. Sorry. Sorry.", next:"bb2"},
  {id:"bb2", type:"narration", text:"He gets the bin. Works fast, works correctly, doesn\u2019t look at anyone. The spill is contained in three minutes forty. The report is filed. Sam says \u201Cnice work\u201D in a tone Esther can\u2019t decode.", next:"bb3", applyStats:{emotional:-3,mental:-4}},
  {id:"bb3", type:"inner", text:"Nice work. Two words. You run them through every filter you have and none of them return a clean result. Was it genuine? Sarcastic? Relieved? All three?", next:"choice2"},

  // CHOICE 2
  {id:"choice2", type:"choice", choices:[
    {label:"\u201CI wasn\u2019t trying to sentence you. I say things in the order I think of them, and containment came first.\u201D", cost:"SOCIAL +4   EMOTIONAL +3   CAREER -2", stats:{social:4,emotional:3,career:-2}, next:"closing"},
    {label:"\u201CI\u2019m sorry. I\u2019ll amend the report to \u2018contributing factors \u2014 equipment placement.\u2019\u201D", cost:"SOCIAL +6   CAREER -6   EMOTIONAL -4", stats:{social:6,career:-6,emotional:-4}, next:"closing"},
    {label:"Say nothing. File the report as written.", cost:"CAREER +5   SOCIAL -6   EMOTIONAL -5   MENTAL -2", stats:{career:5,social:-6,emotional:-5,mental:-2}, next:"closing"}
  ]},

  // Closing
  {id:"closing", type:"narration", text:"The Director arrives eleven minutes later. She reads the incident report, then looks up. \u201CWho authorised this? This was filed by a visiting student. Visiting students do not have clearance to submit safety documentation.\u201D Nobody answers. Esther hadn\u2019t known she needed authorisation. The form was there, so she filled it in.", next:"end"}
];

const REFLECTION_TEXT = "\u201CNobody in that room was being cruel. Two people used the same words to mean different things, in a building that punishes whoever gets blamed.\u201D";
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
  estherX: 140, estherY: 116,
  estherDir: 2, // 0=down,1=left,2=right,3=up
  estherFrame: 0,
  estherMoving: false,
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
  // center
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
  const blocks = bar.querySelectorAll(".bar-block");
  const oldFilled = statToBlocks(prev);
  const newFilled = statToBlocks(S.stats[stat]);
  const label = bar.querySelector(".bar-label");

  // Flash label
  label.classList.add("flash");
  setTimeout(() => label.classList.remove("flash"), 300);

  // Delta text
  const deltaEl = bar.querySelector(".bar-delta");
  deltaEl.textContent = (delta > 0 ? "+" : "\u2212") + Math.abs(delta);
  deltaEl.classList.remove("show");
  void deltaEl.offsetWidth;
  deltaEl.classList.add("show");
  setTimeout(() => deltaEl.classList.remove("show"), 1100);

  // Animate blocks
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

function showBars() { $("#bar-footer").classList.remove("hidden"); }

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
  // Fade in title text after a beat
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

  // Starfield scroll
  if (!S.settings.reduceMotion) {
    S.starsOffset -= 4 * dt / 1000;
    $(".title-stars").style.backgroundPosition = `${S.starsOffset}px 0`;
  }

  // Black hole animation
  bhLargeTimer += dt;
  if (bhLargeTimer >= 180) {
    bhLargeTimer -= 180;
    S.bhLargeFrame = (S.bhLargeFrame + 1) % 4;
    $("#title-blackhole").style.backgroundPosition = `-${S.bhLargeFrame * 156}px 0`;
  }

  // Station drift
  if (!S.settings.reduceMotion) {
    S.stationX += 12 * dt / 1000; // ~12px/sec -> ~26s to cross
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
const ESTHER_W = 24, ESTHER_H = 30;
const LAB_W = 640, VIEW_W = 320, VIEW_H = 180;
const FOOTER_H = 28;
// Walkable area: top of blue floor tiles to just above the footer
// Footer top = 180 - 28 = 152. Esther bottom must be ≤ 152 → top ≤ 122.
const FLOOR_TOP = 88;
const FLOOR_BOT = 122; // Esther's feet at 152, flush above footer
const ESTHER_SPEED = 60; // px/sec in world coords

// Bench collision zones matching lab_room_wide.png (640x180).
// The benches sit on the floor. Collision uses a narrow vertical band
// (y=102-114) so Esther can walk in front of the benches (y ≥ 114)
// or behind them near the wall (y < 102, navigating through gaps).
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
  S.estherX = 140;
  S.estherY = 116;
  S.estherDir = 2;
  S.estherFrame = 0;
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
}
function labKeyUp(e) { S.keys[e.key] = false; }

function labLoop(ts) {
  if (S.screen !== "lab") return;
  const dt = Math.min(ts - labLastTs, 50);
  labLastTs = ts;

  if (S.labActive) {
    // Movement
    let dx = 0, dy = 0;
    if (S.keys["ArrowLeft"] || S.keys["a"] || S.keys["A"]) dx = -1;
    if (S.keys["ArrowRight"] || S.keys["d"] || S.keys["D"]) dx = 1;
    if (S.keys["ArrowUp"] || S.keys["w"] || S.keys["W"]) dy = -1;
    if (S.keys["ArrowDown"] || S.keys["s"] || S.keys["S"]) dy = 1;

    S.estherMoving = dx !== 0 || dy !== 0;

    if (S.estherMoving) {
      S.labIdleTimer = 0;
      if (dx < 0) S.estherDir = 1;
      else if (dx > 0) S.estherDir = 2;
      else if (dy < 0) S.estherDir = 3;
      else if (dy > 0) S.estherDir = 0;

      let nx = S.estherX + dx * ESTHER_SPEED * dt / 1000;
      let ny = S.estherY + dy * ESTHER_SPEED * dt / 1000;
      nx = Math.max(4, Math.min(LAB_W - ESTHER_W - 4, nx));
      ny = Math.max(FLOOR_TOP, Math.min(FLOOR_BOT, ny));

      // Move freely without bench collision blocking.
      S.estherX = nx;
      S.estherY = ny;
    } else {
      S.labIdleTimer += dt;
    }

    // Camera
    const targetCam = Math.max(0, Math.min(LAB_W - VIEW_W, S.estherX - VIEW_W / 2 + ESTHER_W / 2));
    S.camX += (targetCam - S.camX) * 0.08;
    S.camX = Math.max(0, Math.min(LAB_W - VIEW_W, S.camX));

    // Check bench trigger — walk near far-right bench (world x~500+)
    if (!S.benchTriggered && S.estherX > 500 && S.estherX < 560) {
      S.benchTriggered = true;
      S.labActive = false;
      S.keys = {};
      document.removeEventListener("keydown", labKeyDown);
      document.removeEventListener("keyup", labKeyUp);
      setTimeout(() => startSceneDialogue("pb1"), 300);
      return;
    }

    // No object interactions in this simplified lab.
  }

  // Black hole small anim
  bhSmallT += dt;
  if (bhSmallT >= 180) {
    bhSmallT -= 180;
    S.bhSmallFrame = (S.bhSmallFrame + 1) % 4;
    $("#lab-blackhole-small").style.backgroundPosition = `-${S.bhSmallFrame * 72}px 0`;
  }

  // Proximity check
  updateLabPrompt();

  // Render
  renderLab();
  requestAnimationFrame(labLoop);
}

function renderLab() {
  const world = $("#lab-world");
  world.style.left = -Math.round(S.camX) + "px";

  const e = $("#lab-esther");
  e.style.left = Math.round(S.estherX) + "px";
  e.style.top = Math.round(S.estherY) + "px";
}

function updateLabPrompt() {
  $("#lab-prompt").classList.add("hidden");
  $("#lab-arrow").classList.add("hidden");
}

function tryExamine() {
  // No object interactions in the simplified lab.
}

function showLabTextbox(text) {
  // Interaction removed; this should never be called.
}

function dismissLabTextbox() {
  if (S.typing) { completeType($("#lab-textbox-text")); return; }
  $("#lab-textbox").classList.add("hidden");
  S.labActive = true;
}

function updateLabObjective() {
  $("#lab-objective").textContent = "Walk to the far bench.";
}

function checkLabArrow() {
  // Arrow not used in the simplified lab.
}

/* ---- SCENE ---- */
let sceneIdleBounceTimer = 0;

function startSceneDialogue(nodeId) {
  showScreen("scene");
  showBars();

  const sw = $("#scene-world");
  if (nodeId === "s1") {
    // Opening: camera on left side, sprites near first bench
    S.sceneScrollX = 20;
    $("#scene-sprite-sam").style.left = "140px";
    $("#scene-sprite-esther").style.left = "180px";
    $("#scene-sprite-jerry").classList.add("hidden");
  } else {
    // Post-bench: camera on right side
    S.sceneScrollX = 320;
    $("#scene-sprite-sam").style.left = "385px";
    $("#scene-sprite-jerry").style.left = "430px";
    $("#scene-sprite-esther").style.left = "465px";
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

  // Idle bounce NPC sprites + portrait every 520ms
  if (!S.idlePaused && !S.settings.reduceMotion) {
    sceneIdleBounceTimer += dt;
    if (sceneIdleBounceTimer >= 520) {
      sceneIdleBounceTimer -= 520;
      S.idleBounce = 1 - S.idleBounce;
      const frameX = S.idleBounce * 24;
      // Bounce scene sprites
      $$(".scene-sprite").forEach(sp => {
        if (sp.dataset.char === "esther") return;
        if (sp.classList.contains("hidden")) return;
        sp.style.backgroundPosition = `-${frameX}px 0`;
      });
      // Bounce the dialogue portrait (if it's an NPC, not Esther)
      const portrait = $("#dialogue-portrait");
      if (!portrait.classList.contains("hidden") && !portrait.classList.contains("char-esther")) {
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

  // Show/hide sprites
  if (node.showSprites) {
    $("#scene-sprite-sam").classList.toggle("hidden", !node.showSprites.includes("sam"));
    $("#scene-sprite-jerry").classList.toggle("hidden", !node.showSprites.includes("jerry"));
    $("#scene-sprite-esther").classList.toggle("hidden", !node.showSprites.includes("esther"));
  }

  // Control nodes
  if (node.type === "control") {
    if (node.action === "start_lab") { startLab(); return; }
  }

  // Alarm
  if (node.type === "alarm") { showAlarm(); return; }

  // Choices
  if (node.type === "choice") { showChoicePanel(node.choices); return; }

  // Inner voice — dim sprites
  if (node.type === "inner") {
    S.idlePaused = true;
    $$(".scene-sprite").forEach(sp => sp.classList.add("dimmed"));
  } else {
    S.idlePaused = false;
    $$(".scene-sprite").forEach(sp => sp.classList.remove("dimmed"));
  }

  // Show the dialogue row
  const row = $("#dialogue-row");
  row.classList.remove("hidden");

  // Dialogue / inner / narration
  const box = $("#dialogue-box");
  box.classList.remove("type-dialogue", "type-inner", "type-narration");
  box.classList.add(`type-${node.type}`);

  // Portrait — show the speaker's sprite with idle bounce
  const portrait = $("#dialogue-portrait");
  portrait.className = ""; // reset classes
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

/* ---- ALARM ---- */
function showAlarm() {
  const overlay = $("#alarm-overlay");
  if (S.settings.quiet) {
    applyStatBlock({social:-3});
    runNode("pa1");
    return;
  }
  overlay.classList.remove("hidden");
  if (!S.settings.reduceMotion) overlay.classList.add("pulse");
  overlay.querySelectorAll(".choice-btn").forEach(btn => {
    btn.addEventListener("click", handleAlarm, {once:true});
  });
}

function handleAlarm(e) {
  const choice = e.currentTarget.dataset.alarm;
  if (choice === "ears") applyStatBlock({mental:-8});
  else applyStatBlock({social:-3});
  const overlay = $("#alarm-overlay");
  overlay.classList.add("hidden");
  overlay.classList.remove("pulse");
  runNode("pa1");
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

  // Animate bars up from zero
  setTimeout(() => {
    $$(".end-bar-fill").forEach(f => {
      const stat = f.dataset.stat;
      f.style.height = (S.stats[stat] / 100 * 60) + "px";
    });
  }, 100);

  // Show reflection + restart after bars animate
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
    syncBars(true);
    $("#bar-footer").classList.add("hidden");
    $("#gear-btn").classList.add("hidden");
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
  // Intro
  document.addEventListener("click", e => {
    if (S.screen === "intro") advanceIntro();
  });
  document.addEventListener("keydown", e => {
    if (S.screen === "intro" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      advanceIntro();
    }
    // Scene advance
    if (S.screen === "scene" && (e.key === " " || e.key === "Enter")) {
      e.preventDefault();
      if (!$("#choice-panel").classList.contains("hidden")) return; // choices visible
      advanceScene();
    }
    // Lab textbox dismiss
    if (S.screen === "lab" && !$("#lab-textbox").classList.contains("hidden")) {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        dismissLabTextbox();
      }
    }
  });
  // Scene click — on the whole dialogue row (portrait + text box)
  $("#dialogue-row").addEventListener("click", () => {
    if (S.screen === "scene") advanceScene();
  });
  // Lab textbox click
  $("#lab-textbox").addEventListener("click", () => dismissLabTextbox());
}

/* ---- INIT ---- */
function init() {
  applyScale();
  initTitle();
  initBarBlocks();
  initRestart();
  initInput();

  // Start title animation
  lastTime = performance.now();
  requestAnimationFrame(titleLoop);
}

document.addEventListener("DOMContentLoaded", init);
