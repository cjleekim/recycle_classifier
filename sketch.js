//https://nishanc.medium.com/image-classification-with-teachable-machine-ml5-js-and-p5-js-233fbdf48fe7
//https://github.com/nishanc/p5js-server
// use p5.js and ml5.js

let confidence ="";
let json = []; // JSON Object
let button; // log download button
var date // date
let video;
let classifier;
let modelURL = './model/';
let label;
var today = new Date();

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function modelLoaded() {
  classifier.predict(gotResults);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Store the label and classify again!
  console.log('results','today');
    if(!error){
    confidence = ('Label: ' + results[0].label+','+' '+'Confidence: '+ nf(results[0].confidence, 0, 3 ));
    classifier.predict(gotResults);
    classifyVideo();
    // JSON output format
    json.push("Date" + ":" + today + "," + "Label" + ":" + results[0].label + "," + "Confidence" + ":" + nf(results[0].confidence, 0,3 ))
    }
}

//Click to save log & file extention
function mousePressed(results) {
    if (mouseX > 10 && mouseX < 200 && mouseY > height - 50 && mouseY < height) {
      saveJSON(json, "gotResults.json");
    }
}

function draw() {
  background(0);
  image(video, 0, 0, width, width * video.height / video.width);
  fill(255);
  textSize(35);
  text(label, 10, height - 80);
  text(confidence, 10, height - 50);
  button = createButton('Download data'); // Users are able to download data
  button.position(10, 450);
}

function setup() {
  createCanvas(800, 480);  
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2.1: Start classifying
  classifyVideo();
}

// STEP 2.2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}