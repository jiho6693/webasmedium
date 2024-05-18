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
      var threshold = 80;

      if (average > threshold) {
        darkenFire(); // fire 클래스 어둡게 만드는 함수 호출
        setTimeout(function() {
          window.location.href = "../cms/home.php";
        }, 3000); // 3초 뒤에 페이지 이동
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

function darkenFire() {
  var initialBrightness = 100; // 초기 밝기 (0~100 범위)
  var finalBrightness = 70; // 최종 밝기 (0~100 범위)
  var duration = 3000; // 효과 지속 시간 (ms)
  var startTime = Date.now();

  function updateBackground() {
    var elapsedTime = Date.now() - startTime;
    var progress = elapsedTime / duration;
    var brightness = initialBrightness - (initialBrightness - finalBrightness) * progress;
    document.body.style.backgroundColor = "hsl(0, 0%, " + brightness + "%)";

    if (elapsedTime < duration) {
      requestAnimationFrame(updateBackground);
    }
  }

  updateBackground();
}