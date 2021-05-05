/*
 * @name Synesthesia: Play the Rainbow, by Danielle Neal
 * @frame 720, 430
 * @description Play a song, play the rainbow. Explore how
 playing the colors versus playing the music impacts the music
 I wanted to allow the music to take on a synesthetic experience
 in this sketch, blurring the lines between music and art. I 
 incorporated random colors, mixed up notes to add silliness,
 and allowed notes' duration to be longer to allow users to 
 create longer songs that have visuals along with them. I also 
 made the colors flicker for as long as the mouse is pressed
 so that the visuals could be as much a part of the "song" as the 
 musical tones are.
 This Project was created using p5js example "Hello_p5: song."
 
 * You will need to include the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound
 * library</a> for this example to work in your own project.
 */
// The midi notes of a scale
 


let notes = [ 60, 65, 70, 75, 80, 85, 71];


let index = 0;
let song = [
  { note: 4, duration: 1000, display: "a" },
  { note: 0, duration: 1000, display: "c" },
  { note: 1, duration: 1000, display: "A" },
  { note: 2, duration: 1000, display: "B" },
  { note: 3, duration: 1000, display: "C" },
  { note: 4, duration: 1000, display: "D" },
  { note: 0, duration: 1000, display: "A" },
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


  osc = new p5.TriOsc();

  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,1);

  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.5);
    }, duration-50);
  }
}

function draw() {
  r=random(255);
  g=random(255);
  b=random(255);
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
  
    index ++;

  } else if (index >= song.length) {
    autoplay = false;
  }




  
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
 
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      
      if (mouseIsPressed) {
        fill(r,g,b);
      
      } else {
        fill(100);
      }
    } else {
      fill(200);
    }

    if (autoplay && i === song[index-1].note) {
      fill(r,g,b);
    }


    rect(x, 0, w-1, height-1);
  }

}


function mousePressed(event) {
  if(event.button == 0 && event.clientX < width && event.clientY < height) {
    
    let key = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[key]);
  }
}


function mouseReleased() {
  osc.fade(0,2);
}
