//https://teachablemachine.withgoogle.com/models/qzAL-g8Zg/
//happy: Happy and thumbs up with right hand
//sad: sad with thumbs down with left hand
//angry: angry with a fist at head level with left hand

prediction1 = ""
prediction2 = ""


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function take_snapshot(date_uri) {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">'
    })
}

// teachable machine starts here

console.log('ml5 version', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qzAL-g8Zg/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model has been Loaded')
}

function compare() {
    image_variable = document.getElementById("captured_image")
    classifier.classify(image_variable, gotResult)
}

function gotResult(error, results) {
    if(error) {
        console.error(error)
    }
    else {
        console.log(results)
        prediction1 = results[0].label
        prediction2 = results[1].label
        document.getElementById("emotion1").innerHTML = prediction1
        document.getElementById("emotion2").innerHTML = prediction2
        speak()
        
        if(prediction1 == "happy") {
            document.getElementById("emoji1").innerHTML = "&#128512;"
        }

        if(prediction1 == "sad") {
            document.getElementById("emoji1").innerHTML = "&#128532;"
        }

        if(prediction1 == "angry") {
            document.getElementById("emoji1").innerHTML = "&#128544;"
        }




        if(prediction2 == "happy") {
            document.getElementById("emoji2").innerHTML = "&#128512;"
        }

        if(prediction2 == "sad") {
            document.getElementById("emoji2").innerHTML = "&#128532;"
        }

        if(prediction2 == "angry") {
            document.getElementById("emoji2").innerHTML = "&#128544;"
        }
    }
}

function speak() {
    var synth = window.speechSynthesis
    speakData1 = "The first prediction is " + prediction1
    speakData2 = "The second prediction is " + prediction2
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2)
    synth.speak(utterThis)
}
