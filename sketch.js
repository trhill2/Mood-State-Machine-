/*******************************************************************************************************************
    Moods Example
    by Tyisha Hill 

    Uses the p5.SimpleStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.simpleStateManager.js"></script>
*********************************************************************************************************************/

var simpleStateMachine;           // the SimpleStateManager class
var selectedTransitionNum = 0;    // index into the array of transitions
var transitions = [];
var moodImage;


function preload() {
  simpleStateMachine = new SimpleStateManager("assets/moodStates.csv");
}

// Setup code goes here
function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

  // setup the state machine with callbacks
  simpleStateMachine.setup(setImage, setTransitionNames);
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawUI();
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
} 

// this is a callback, which we use to diplay next state labels
function setTransitionNames(transitionArray) {
  transitions = transitionArray;
}

//==== KEYPRESSED ====/
function keyPressed() {
  // forward one, check for overflow
  if (keyCode === RIGHT_ARROW) {
    selectedTransitionNum++;
    if( selectedTransitionNum === transitions.length ) {
      selectedTransitionNum = 0;
    }
  }
  
  // back one, check for underflow
  if (keyCode === LEFT_ARROW ) {
    selectedTransitionNum--;
    if( selectedTransitionNum === -1 ) {
      selectedTransitionNum = transitions.length -1;
      if( selectedTransitionNum === -1 ) {
        console.log("error: transition array probably empty");
      }
    }
  }

  // Space or ENTER or RETURN will activate a sections
  if( key === ' ' || keyCode === RETURN || keyCode === ENTER ) {
    simpleStateMachine.newState(transitions[selectedTransitionNum]);
  }
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(205, 241, 229);
}

function drawImage() {
  if( moodImage !== undefined ) {
    image(moodImage, width/2, height/2);
  }  
}

function drawUI() {
  push();
  textAlign(LEFT);
  textSize(50);

  for( let i = 0; i < transitions.length; i++ ) {
    fill(255, 160, 130);

    if( selectedTransitionNum === i ) {
      fill(254, 121, 130);
    }
    text( transitions[i], 200, (height - 200) + (i*60)  );
  }

  pop();
}
