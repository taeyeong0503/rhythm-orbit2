let angle = 0;
let radius = 120;
let centerX, centerY;
let speed = 0.05;

let beatTimes = [];
let beatIndex = 0;

let score = 0;
let combo = 0;
let feedback = '';

let bgm;

function preload() {
  soundFormats('mp3');
  bgm = loadSound('assets/music.mp3');
}

function setup() {
  createCanvas(400, 400);
  centerX = width / 2;
  centerY = height / 2;
  frameRate(60);

  for (let i = 60; i < 1800; i += 60) {
    beatTimes.push(i);
  }
}

function draw() {
  background(20);

  stroke(255, 50);
  noFill();
  ellipse(centerX, centerY, radius * 2);

  let x = centerX + radius * cos(angle);
  let y = centerY + radius * sin(angle);
  fill(255);
  noStroke();
  ellipse(x, y, 30, 30);
  angle += speed;

  if (beatIndex < beatTimes.length && frameCount === beatTimes[beatIndex]) {
    feedback = '🎵 Beat!';
    beatIndex++;
  }

  fill(255);
  textSize(16);
  text("점수: " + score, 20, 30);
  text("콤보: " + combo, 20, 50);
  text(feedback, 20, 80);
}

function keyPressed() {
  if (!bgm.isPlaying()) {
    bgm.loop();
    return;
  }

  if (key === ' ') {
    let diff = abs(frameCount - beatTimes[beatIndex - 1]);
    if (diff < 6) {
      score += 100;
      combo += 1;
      feedback = '💯 Perfect!';
    } else if (diff < 12) {
      score += 50;
      combo = 0;
      feedback = '👍 Good';
    } else {
      combo = 0;
      feedback = '❌ Miss';
    }
  }
}
