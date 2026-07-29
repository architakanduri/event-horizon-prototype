/* ============================================================
   EVENT HORIZON — Day 1 Prototype
   ============================================================ */

/* ---- SCRIPT DATA ----------------------------------------- */

const INTRO_CARDS = [
  "The universe has gotten a lot busier these days. It barely takes any time to get anywhere, as long as you've got the equipment for it.",
  "Unfortunately for you, you're stuck where you are. While fifty years ago people would have fought tooth and nail to be in your research organization, it's currently operating—in exile—in the worst of places: an abandoned space station revolving around a black hole.",
  "This is no situation any reasonable scientist wants to operate in. You don't really have a choice, though. The gubernatorial board of your university seems to have deemed you to be, in their words, \"uncooperative and a hazard to the scientific community\”. It seems your only hope is to get this failing research station back to its glory days."
];

/* Node types: "dialogue", "inner", "narration", "choice", "alarm", "control" */
const SCENE_SCRIPT = [
  {id:"s1", type:"dialogue", speaker:"SAM", text:"Alright. Your name’s Ester, right? I’m your supervisor because I’m technically your senior here, but don’t come to me with complaints later because I can’t help with the higher-ups. Oh yeah, you’re technically a \"visiting student\" even though you’re still going to be working. Questions?", next:"s2", showSprites:["sam","ester"]},
  {id:"s2", type:"dialogue", speaker:"ESTER", text:"Yes. I’m concerned about how the terminal system is bolted in close proximity to the atmospheric monitoring devices. The venting should cause some issues, right? Do you have a fume hood anywhere?", next:"s3"},
  {id:"s3", type:"dialogue", speaker:"SAM", text:"…Yes?", next:"s4"},
  {id:"s4", type:"dialogue", speaker:"ESTER", text:"And there shouldn’t be a device containing high mercury haphazardly arranged in this room.", next:"s5"},
  {id:"s5", type:"dialogue", speaker:"SAM", text:"It’s been there eight months.", next:"s6"},
  {id:"s6", type:"dialogue", speaker:"ESTER", text:"But that doesn’t decrease the health risk, it just means you’ve been in close range to danger for longer!", next:"lab_explore"},

  // lab_explore is a control node — starts the lab screen
  {id:"lab_explore", type:"control", action:"start_lab"},

  // Post-bench: scene resumes here
  {id:"pb1", type:"dialogue", speaker:"SAM", text:"Hey, Jerry, could you grab the\u2014 JERRY!", next:"pb2", showSprites:["sam","jerry","ester"]},
  {id:"pb2", type:"narration", text:"A crash. Glass on tile. Small pieces rolling outward in four directions.", next:"pb3"},
  {id:"pb3", type:"dialogue", speaker:"JERRY", text:"I\u2019m sorry \u2014 it wasn\u2019t\u2014 I turned around and my sleeve caught it, it was right on the edge, I didn\u2019t\u2014", next:"pb4"},
  {id:"pb4", type:"dialogue", speaker:"SAM", text:"Oh, God.", next:"alarm"},

  {id:"alarm", type:"alarm"},

  // Post-alarm
  {id:"pa1", type:"narration", text:"Mercury on the floor. Small beads rolling into the grout lines, pooling where the tile dips.", next:"pa2"},
  {id:"pa2", type:"dialogue", speaker:"ESTER", text:"Everyone stop walking. Jerry \u2014 vacuum and a disposable sharps bin, the largest rigid one in the cabinet, not the bag. Sam, seal the door and kill the manifold to three and four. That unit holds about six ounces of elemental mercury and the vent is running. I\u2019ll write the incident report. Jerry, what\u2019s your surname? I\u2019m putting your name down as the person responsible. And \u2014 this was an accident, correct?", next:"pa3"},
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
  {id:"ba2", type:"dialogue", speaker:"ESTER", text:"I\u2019ve never seen you before either. I don\u2019t hold any vendetta against you. I don\u2019t know you well enough to.", next:"ba3"},
  {id:"ba3", type:"dialogue", speaker:"JERRY", text:"Then why are you being so accusatory?", next:"ba4"},
  {id:"ba4", type:"dialogue", speaker:"ESTER", text:"Your sleeve caught the device. That\u2019s the sequence of events. The form has a field labelled \u201Cperson responsible\u201D and it doesn\u2019t have a field for anything else.", next:"ba5"},
  {id:"ba5", type:"dialogue", speaker:"JERRY", text:"We could have sorted out whose name goes where later. It\u2019s the way you said it. \u201CWhat\u2019s your surname, I\u2019m putting you down as responsible.\u201D A first-week student. Like you were reading out a sentence.", next:"ba6"},
  {id:"ba6", type:"inner", text:"He\u2019s not angry about the form. He\u2019s angry about the way you said it. You replay the sentence in your head. You can hear the words but you can\u2019t hear what he heard.", next:"ba7"},
  {id:"ba7", type:"narration", text:"The mercury is still on the floor. The vent is still running.", next:"choice2", applyStats:{career:-3}},

  // Branch B
  {id:"bb1", type:"dialogue", speaker:"JERRY", text:"Right. Yes. Sorry. Sorry.", next:"bb2"},
  {id:"bb2", type:"narration", text:"He gets the bin. Works fast, works correctly, doesn\u2019t look at anyone. The spill is contained in three minutes forty. The report is filed. Sam says \u201Cnice work\u201D in a tone Ester can\u2019t decode.", next:"bb3", applyStats:{emotional:-3,mental:-4}},
  {id:"bb3", type:"inner", text:"Nice work. Two words. You run them through every filter you have and none of them return a clean result. Was it genuine? Sarcastic? Relieved? All three?", next:"choice2"},

  // CHOICE 2
  {id:"choice2", type:"choice", choices:[
    {label:"\u201CI wasn\u2019t trying to sentence you. I say things in the order I think of them, and containment came first.\u201D", cost:"SOCIAL +4   EMOTIONAL +3   CAREER -2", stats:{social:4,emotional:3,career:-2}, next:"closing"},
    {label:"\u201CI\u2019m sorry. I\u2019ll amend the report to \u2018contributing factors \u2014 equipment placement.\u2019\u201D", cost:"SOCIAL +6   CAREER -6   EMOTIONAL -4", stats:{social:6,career:-6,emotional:-4}, next:"closing"},
    {label:"Say nothing. File the report as written.", cost:"CAREER +5   SOCIAL -6   EMOTIONAL -5   MENTAL -2", stats:{career:5,social:-6,emotional:-5,mental:-2}, next:"closing"}
  ]},

  // Closing
  {id:"closing", type:"narration", text:"The Director arrives eleven minutes later. She reads the incident report, then looks up. \u201CWho authorised this? This was filed by a visiting student. Visiting students do not have clearance to submit safety documentation.\u201D Nobody answers. Ester hadn\u2019t known she needed authorisation. The form was there, so she filled it in.", next:"end"}
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
    deltaEl.textContent = (delta > 0 ? "+" : "\u2212") + Math.abs(delta);
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
const ESTER_W = 24, ESTER_H = 30;
const LAB_W = 640, VIEW_W = 320, VIEW_H = 180;
const FOOTER_H = 28;
// Walkable area: top of blue floor tiles to just above the footer
// Footer top = 180 - 28 = 152. Ester bottom must be ≤ 152 → top ≤ 122.
const FLOOR_TOP = 88;
const FLOOR_BOT = 122; // Ester's feet at 152, flush above footer
const ESTER_SPEED = 60; // px/sec in world coords

// Bench collision zones matching lab_room_wide.png (640x180).
// The benches sit on the floor. Collision uses a narrow vertical band
// (y=102-114) so Ester can walk in front of the benches (y ≥ 114)
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

      // Move freely without bench collision blocking.
      S.esterX = nx;
      S.esterY = ny;
    } else {
      S.labIdleTimer += dt;
    }

    // Camera follows Ester directly to avoid jitter from easing + rounding.
    S.camX = Math.max(0, Math.min(LAB_W - VIEW_W, S.esterX - VIEW_W / 2 + ESTER_W / 2));

    // Check bench trigger — walk near far-right bench (world x~500+)
    if (!S.benchTriggered && S.esterX > 500 && S.esterX < 560) {
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
  world.style.transform = `translate3d(${-S.camX}px,0,0)`;

  const e = $("#lab-ester");
  e.style.transform = `translate3d(${S.esterX}px,${S.esterY}px,0)`;
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
    $("#scene-sprite-ester").style.left = "180px";
    $("#scene-sprite-jerry").classList.add("hidden");
  } else {
    // Post-bench: camera on right side
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

  // Idle bounce NPC sprites + portrait every 520ms
  if (!S.idlePaused && !S.settings.reduceMotion) {
    sceneIdleBounceTimer += dt;
    if (sceneIdleBounceTimer >= 520) {
      sceneIdleBounceTimer -= 520;
      S.idleBounce = 1 - S.idleBounce;
      const frameX = S.idleBounce * 24;
      // Bounce scene sprites
      $$(".scene-sprite").forEach(sp => {
        if (sp.dataset.char === "ester" || sp.dataset.char === "sam" || sp.dataset.char === "jerry") return;
        if (sp.classList.contains("hidden")) return;
        sp.style.backgroundPosition = `-${frameX}px 0`;
      });
      // Bounce the dialogue portrait (if it's an NPC, not Ester, Sam, or Jerry)
      const portrait = $("#dialogue-portrait");
      if (!portrait.classList.contains("hidden") && !portrait.classList.contains("char-ester") && !portrait.classList.contains("char-sam") && !portrait.classList.contains("char-jerry")) {
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
    $("#scene-sprite-ester").classList.toggle("hidden", !node.showSprites.includes("ester"));
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

  ensureDialogueBoxHeight();

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

/* Lock the dialogue box to a single fixed height, sized to the longest
   line in the script, so it no longer grows/shrinks per line. Measured
   from the real DOM once so it stays correct if lines are edited later. */
let dialogueBoxFixedHeight = null;

function measureMaxDialogueBoxHeight() {
  const box = $("#dialogue-box");
  const portrait = $("#dialogue-portrait");
  const textEl = $("#dialogue-text");

  const dialogueTexts = SCENE_SCRIPT.filter(n => n.type === "dialogue" && n.text).map(n => n.text);
  const captionTexts = SCENE_SCRIPT.filter(n => (n.type === "inner" || n.type === "narration") && n.text).map(n => n.text);
  const longestDialogue = dialogueTexts.reduce((a, b) => (b.length > a.length ? b : a), "");
  const longestCaption = captionTexts.reduce((a, b) => (b.length > a.length ? b : a), "");

  const prev = {
    boxHeight: box.style.height,
    boxOverflow: box.style.overflow,
    boxClass: box.className,
    portraitClass: portrait.className,
    text: textEl.textContent,
  };

  box.style.height = "auto";
  box.style.overflow = "visible";

  // Widest text, narrowest box: a speaker line (portrait eats into the width).
  box.className = "type-dialogue";
  portrait.className = "char-sam";
  textEl.textContent = longestDialogue;
  const dialogueHeight = box.scrollHeight;

  // Narration/inner: no portrait, full-width box.
  box.className = "type-narration";
  portrait.className = "hidden";
  textEl.textContent = longestCaption;
  const captionHeight = box.scrollHeight;

  box.className = prev.boxClass;
  portrait.className = prev.portraitClass;
  textEl.textContent = prev.text;
  box.style.height = prev.boxHeight;
  box.style.overflow = prev.boxOverflow;

  return Math.max(dialogueHeight, captionHeight);
}

function ensureDialogueBoxHeight() {
  if (dialogueBoxFixedHeight == null) {
    dialogueBoxFixedHeight = measureMaxDialogueBoxHeight();
  }
  $("#dialogue-box").style.height = dialogueBoxFixedHeight + "px";
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
