/* ============================================================
   EVENT HORIZON — Day 1 Prototype
   ============================================================ */

/* ---- SCRIPT DATA ----------------------------------------- */

const INTRO_CARDS = [
  "The universe has gotten a lot busier these days. It barely takes any time to get anywhere, as long as you've got the equipment for it.",
  "Unfortunately for you, you're stuck where you are. While fifty years ago people would have fought tooth and nail to be in your research organization, it's currently operating—in exile—in the worst of places: an abandoned space station revolving around a black hole.",
  "This is no situation any reasonable scientist wants to operate in. You don't really have a choice, though. The gubernatorial board of your university seems to have deemed you to be, in their words, \"uncooperative and a hazard to the scientific community\”. It seems your only hope is to get this failing research station back to its glory days."
];

/* Node types: "dialogue", "inner", "narration", "choice", "control" */
const SCENE_SCRIPT = [
  {id:"s1", type:"dialogue", speaker:"SAM", text:"Alright. Your name’s Ester? I’m your supervisor because I’m technically your senior here, but don’t come to me with complaints later because I can’t help with the higher-ups. Oh yeah, you’re technically a “visiting student” even though you’re still going to be working. Questions?", next:"s2", showSprites:["sam","ester"]},
  {id:"s2", type:"dialogue", speaker:"ESTER", text:"Yes. I’m concerned about how the terminal system is bolted in close proximity to the atmospheric monitoring devices. The venting should cause some issues, right? Do you have a fume hood anywhere?", next:"s3"},
  {id:"s3", type:"dialogue", speaker:"SAM", text:"…Yes?", next:"s4"},
  {id:"s4", type:"dialogue", speaker:"ESTER", text:"And there shouldn’t be a device containing high mercury haphazardly arranged in this room.", next:"s5"},
  {id:"s5", type:"dialogue", speaker:"SAM", text:"It’s been there for eight months.", next:"s6"},
  {id:"s6", type:"dialogue", speaker:"ESTER", text:"But that doesn’t decrease the health risk, it just means you’ve been in close range to danger for longer!", next:"crash_cut"},

  // crash_cut is a control node — pans the camera to the crash before pb1 shows
  {id:"crash_cut", type:"control", action:"pan_to_crash", next:"pb1"},

  {id:"pb1", type:"dialogue", speaker:"SAM", text:"I promise you it’s fine, Ester. Oh, Jerry’s here. Hey, Jerry, can you grab the—JERRY!", next:"pb2", showSprites:["sam","jerry","ester"]},
  {id:"pb2", type:"inner", text:"I’ve heard accidents like that before when I was still in my old lab. No matter how many times I happen, I flinch like a rabbit being chased.", next:"pb3"},
  {id:"pb3", type:"dialogue", speaker:"JERRY", text:"I’m sorry — it wasn’t— I turned around and my sleeve caught it, it was right on the edge, I didn’t—", next:"pb4"},
  {id:"pb4", type:"dialogue", speaker:"SAM", text:"Oh, God.", next:"pa1"},

  // Post-crash
  {id:"pa1", type:"inner", text:"It’s just like the samples I used to see a lot in the chemistry lab at school. The only metal to be liquid under room temperature, highly toxic, boiling point at 357°C. And it’s currently making a mess—a highly toxic mess!—on the lab floor.", next:"pa2"},
  {id:"pa2", type:"dialogue", speaker:"ESTER", text:"Everyone stop walking. Jerry — vacuum and a disposable sharps bin, the largest rigid one in the cabinet, not the bag. Could you seal the door, Sam? That unit holds about six ounces of elemental mercury and the vent is running! In ten minutes, the mercury you guys were testing will cause irreversible damage. . .", next:"pa2b"},
  {id:"pa2b", type:"dialogue", speaker:"ESTER", text:"I’ll write the incident report. Jerry, what’s your surname? I’m putting your name down as the person responsible. I didn’t spend 4 years in college and 2 years in grad school learning nuclear physics to end up in a lab-turned-suicide chamber. And — this was an accident, correct?", next:"pa3"},
  {id:"pa3", type:"dialogue", speaker:"JERRY", text:"Of course it was an accident. That’s what I just said.", next:"pa4"},
  {id:"pa4", type:"inner", text:"Nobody has moved. Sam is looking at the floor.", next:"choice1_inner"},

  // Inner voice before choice
  {id:"choice1_inner", type:"inner", text:"You asked a yes-or-no question. He said yes. But he froze, and his voice went tight. People don’t react like that to answering a question correctly.", next:"choice1"},

  {id:"choice1", type:"choice", choices:[
    {label:"“What’s wrong?”", cost:"SOCIAL +6   CAREER -5   MENTAL -3", stats:{social:6,career:-5,mental:-3}, next:"ba1"},
    {label:"“Please, six ounces of mercury, and the vent is running. We need this contained as soon as possible..”", cost:"CAREER +6   SOCIAL -5   EMOTIONAL -3", stats:{career:6,social:-5,emotional:-3}, next:"bb1"}
  ]},

  // Branch A — "What's wrong?"
  {id:"ba1", type:"dialogue", speaker:"JERRY", text:"“What’s wrong”? I barely even know who you are, and all you want to do is accuse me and get me in trouble by writing me down on the incident report!", next:"ba2"},
  {id:"ba2", type:"dialogue", speaker:"ESTER", text:"I don’t know you very well either, and I’m not trying to get you in trouble.", next:"ba3"},
  {id:"ba3", type:"dialogue", speaker:"JERRY", text:"Then why are you singling me out??", next:"ba4"},
  {id:"ba4", type:"dialogue", speaker:"ESTER", text:"Your sleeve got caught on the device. That’s the truth. The incident form has a field labelled “person responsible” and it doesn’t have a field for anything else.", next:"ba5"},
  {id:"ba5", type:"dialogue", speaker:"JERRY", text:"We could have sorted out whose name goes where later. It’s the way you said it. “What’s your surname, I’m putting you down as responsible.” You’ve barely even been here for a week. It’s like you were reading out a prison sentence! God!", next:"ba6"},
  {id:"ba6", type:"inner", text:"Oh—he was angry about the form. I stare down at the liquid from the machine, pooling on the floor, then back at him. Jerry was as clearly frustrated as he could have possibly been; he was making some complicated wringing motions with his hands, blinking away tears. . .", next:"ba7"},
  {id:"ba7", type:"dialogue", speaker:"ESTER", text:"I wasn’t trying to sentence you. I say things in the order I think of them, and when I saw the mercury that was the only thing I could think about.", next:"ba8", applyStats:{social:4,emotional:3,career:-2}},
  {id:"ba8", type:"dialogue", speaker:"JERRY", text:"Makes sense. I shouldn’t have lost my temper. Sorry.", next:"ba9"},
  {id:"ba9", type:"dialogue", speaker:"ESTER", text:"I’m sorry too. But—again about the mercury, can we all get this cleaned up together? Quickly!", next:"ba10"},
  {id:"ba10", type:"dialogue", speaker:"JERRY", text:"OK, OK. Sam! Done with the door? Come here!", next:"ba11"},
  {id:"ba11", type:"inner", text:"In the end, it still took too long to clean up the mercury. I completed the report, in the end, only with a dash in the place where “Person Responsible” was supposed to be. The room had to be sealed off though. Objectively a disaster for our resources, but Jerry dodged the consequences.", next:"end"},

  // Branch B — "Please, six ounces of mercury..."
  {id:"bb1", type:"dialogue", speaker:"JERRY", text:"Right. Yes. Sorry, sorry. . .", next:"bb2"},
  {id:"bb2", type:"inner", text:"He went for the bin, as fast as possible, and I still couldn’t tell what that expression on his face was supposed to mean. It was the correct decision, no? “I’m putting your name down as the person responsible,” was that too harsh? I could never tell. This sort of mistake, the one only I couldn’t see, was happening again.", next:"bb3"},
  {id:"bb3", type:"dialogue", speaker:"SAM", text:"I, uh— nice work, Ester. Quick thinking. Yeah.", next:"bb4"},
  {id:"bb4", type:"inner", text:"The words make sense, but what Sam means doesn't. Sam’s making the same face as Jerry. But no matter what they think of me, I still go ahead and fill in the form.", next:"end"}
];

const REFLECTION_TEXT = "END OF SCENARIO";
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
  currentNode: null,
  typing: false,
  fullText: "",
  settings: {dyslexia:false, textSize:"medium", reduceMotion:false, textSpeed:"normal"},
  // scene
  sceneScrollX: 0,
  idleBounce: 0,
  idlePaused: false,
  // anim
  bhLargeFrame: 0,
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
let bhLargeTimer = 0, starsTimer = 0, stationTimer = 0;

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

/* ---- SCENE ---- */
let sceneIdleBounceTimer = 0;

function startSceneDialogue(nodeId) {
  showScreen("scene");
  showBars();

  // Opening: camera on left side, sprites near first bench
  S.sceneScrollX = 20;
  $("#scene-sprite-sam").style.left = "140px";
  $("#scene-sprite-ester").style.left = "180px";
  $("#scene-sprite-jerry").classList.add("hidden");
  $("#scene-world").style.left = -S.sceneScrollX + "px";

  sceneIdleBounceTimer = 0;
  sceneAnimTs = performance.now();
  requestAnimationFrame(sceneAnimLoop);
  runNode(nodeId);
}

function panToCrash() {
  // Cut the camera to the right side of the room where Jerry is, right
  // before his dialogue starts.
  S.sceneScrollX = 320;
  $("#scene-sprite-sam").style.left = "385px";
  $("#scene-sprite-jerry").style.left = "430px";
  $("#scene-sprite-ester").style.left = "465px";
  $("#scene-world").style.left = -S.sceneScrollX + "px";
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

  if (node.showSprites) {
    $("#scene-sprite-sam").classList.toggle("hidden", !node.showSprites.includes("sam"));
    $("#scene-sprite-jerry").classList.toggle("hidden", !node.showSprites.includes("jerry"));
    $("#scene-sprite-ester").classList.toggle("hidden", !node.showSprites.includes("ester"));
  }

  if (node.type === "control") {
    if (node.action === "pan_to_crash") { panToCrash(); runNode(node.next); return; }
  }

  // Choices
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

  ensureDialogueBoxHeight();

  // Dialogue / inner / narration
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

const DIALOGUE_BOX_EXTRA_HEIGHT = 12; // headroom above the tightest fit, added upward

function ensureDialogueBoxHeight() {
  if (dialogueBoxFixedHeight == null) {
    dialogueBoxFixedHeight = measureMaxDialogueBoxHeight() + DIALOGUE_BOX_EXTRA_HEIGHT;
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
    S.currentNode = null;
    S.typing = false;
    S.bhLargeFrame = 0;
    S.starsOffset = 0;
    S.stationX = -20;
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
    $("#choice-panel").classList.add("hidden");
    $("#dialogue-row").classList.add("hidden");
    $("#end-reflection").classList.remove("visible");
    $("#end-reflection").classList.add("hidden");
    $("#end-buttons").classList.add("hidden");
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
  });
  $("#dialogue-row").addEventListener("click", () => {
    if (S.screen === "scene") advanceScene();
  });
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
