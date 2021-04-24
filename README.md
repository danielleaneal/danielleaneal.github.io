## Welcome to my Creative Project 3 Page

I chose to make a audio/visual Processing Sketch where you play a song that randomly shows you colors. 
This way, I thought you could play music as much as you could play colors. The notes are just musical
notes, but they take on more than that when they're associated with a color. You could either play 
music in the traditional sense (sound based goals) or you could play music in a non-traditional way, 
focusing on the aesthetics of the colors that are displaying as you're playing the music. Maybe there 
are pieces which look pretty and sound ugly, or sound pretty and look silly. I just wanted to make sure
there were audio and visuals in this project. 



### The Code


let notes = [ 60, 62, 64, 65, 67, 69, 71];

// For automatically playing the song
let index = 0;
let song = [
  { note: 4, duration: 1000, display: "D" },
  { note: 0, duration: 1000, display: "G" },
  { note: 1, duration: 1000, display: "A" },
  { note: 2, duration: 1000, display: "B" },
  { note: 3, duration: 1000, display: "C" },
  { note: 4, duration: 1000, display: "D" },
  { note: 0, duration: 1000, display: "G" },
  { note: 0, duration: 1000, display: "G" }
];
let trigger = 0;
let autoplay = false;
let osc;

function setup() {
  createCanvas(720, 400);
  let div = createDiv("Click to play notes or ")
  div.id("instructions");
  let button = createButton("play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }


  // Draw a keyboard

  // The width for each key
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(r,g,b);
      // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    rect(x, 0, w-1, height-1);
  }

}

// When we click
function mousePressed(event) {
    r = random(255);
    g = random(255);
    b = random(255);
  if(event.button == 0 && event.clientX < width && event.clientY < height) {
    // Map mouse to the key index
    let key = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}

### The Documentation

<iframe width="560" height="315" src="https://www.youtube.com/embed/8Rol6LgS0m0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
