$(document).ready(function() {
    const audio = $('#bckgrd-music')[0]; // Get the audio element
    let isTransitioning = false; // Flag to prevent overlapping transitions

    // Function to smoothly fade audio volume
    function fadeAudio(targetVolume, duration, callback) {
      const step = 0.1; // Volume change per interval
      const interval = duration / (1 / step); // Calculate interval duration
      const currentVolume = audio.volume; // Get current volume
      const fadeInterval = setInterval(() => {
        if (Math.abs(audio.volume - targetVolume) < step) {
          audio.volume = targetVolume; // Set final volume
          clearInterval(fadeInterval); // Stop the interval
          if (callback) callback(); // Trigger callback if provided
        } else {
          audio.volume += targetVolume > currentVolume ? step : -step; // Adjust volume
        }
      }, interval);
    }
 // Play Music 1 with transition
  //when hovering over geography section
 $('#geo-zik').hover(function() {
    $("body").css("background-image","url(../images2/globe.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/04 Imagine Dragons - Demons.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }
);
 // Play Music 2 with transition
 //when hovering over history section
 $('#histo-zik').hover(function() {
    $("body").css("background-image","url(../images2/History1.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/Naza - Une histoire.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }
);

   //when hovering over music section
  $('#music-zik').hover(function() {
    $("body").css("background-image","url(../images2/download4.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/Naza - Une histoire.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }
);
  $('#football-zik').hover(function() {
    $("body").css("background-image","url(../images2/download5.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/Naza - Une histoire.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
            });
            });
        }
    );
  $('#cs-zik').hover(function() {
    $("body").css("background-image","url(../images2/Bigdata_artificial_intelligence.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/Naza - Une histoire.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
                });
            });
        }
    );
  $('#eco-zik').hover(function() {
    $("body").css("background-image","url(../images2/azerty_eco.jpg)");
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/Naza - Une histoire.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
      });
    });
  }, //when out-hovering over section
  function(){
    if (isTransitioning) return;
    isTransitioning = true;
    fadeAudio(0, 1000, () => { // Fade out current track
      audio.src = "../musics/01 LunchMoney Lewis - Bills.mp3"; // Change audio source
      audio.play(); // Start playing
      fadeAudio(1, 1000, () => { // Fade in new track
        isTransitioning = false;
                });
            });
        }
    );
});