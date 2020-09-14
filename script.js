//adapted from https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    
//the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/vSPIkbf23/';
    
let model;

let maxPredictions;

const video = document.getElementById("webcam");

const button = document.getElementById("button");

button.addEventListener("click", init);

//load camera

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(
      {
        video: true,
        video: {
          facingMode: "user" //See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
          //facingMode: { exact: "environment" }
        }
      }
      )
    .then(
      function (stream) {
        video.srcObject = stream;
      }
    )
    .catch(
      function (error) {
        console.log("Something is wrong!")
      }
    )
  };
    
//load the image model and make a prediction

async function init() {

    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    
    //load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
            
    const prediction = await model.predict(video);

    //console.log(prediction) to see class names
            
    let predictionOutput;

    if (prediction[0].className === "myFace" && prediction[0].probability > 0.9) {predictionOutput = "I SEE A FACE"}
    else if (prediction[1].className === "notMyFace" && prediction[1].probability > 0.9) {predictionOutput = "I DON'T SEE A FACE"}
    else if (prediction[2].className === "yerMug" && prediction[2].probability > 0.9) {predictionOutput = "I SEE A MUG"}
    else {predictionOutput = "I'M UNSURE..."};
   
    //document.getElementById("prediction").innerHTML = predictionOutput;
    document.getElementById("button").innerHTML = predictionOutput;

    //remove button
    //document.getElementById("button").style.display = "none";

    //remove cursor pointer
    document.getElementById("button").style.pointerEvents = "none"

    //loop init function:
    init()
};


