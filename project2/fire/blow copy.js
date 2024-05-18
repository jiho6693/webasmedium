// microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    var audioContext = new AudioContext();
    var analyser = audioContext.createAnalyser();
    var microphone = audioContext.createMediaStreamSource(stream);
    var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = function() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var average = getAverageVolume(array);

      //sound 
      var threshold = 90;

      if (average > threshold) {
       
        setTimeout(function() {
          window.location.href = "../cms/home.php";
        }, 1000); 
      }
    }
  })
  .catch(function(err) {
    console.log('failed to bring your audio data: ' + err);
  });

function getAverageVolume(array) {
  var values = 0;
  var average;

  var length = array.length;

  for (var i = 0; i < length; i++) {
    values += array[i];
  }

  average = values / length;
  return average;
}
