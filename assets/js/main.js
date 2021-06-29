/* - - - - SCRIPT TO VIDEO LESSON №21 - - S_L_I_D_E_R - - - */
(function(){
  

  const containerSwipe = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slider-item');
  const indicatorsContainer = document.querySelector('.indicators-container');
  const indicators = document.querySelectorAll('.indicator');
  const pauseBtn = document.querySelector('#pause-btn');
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const altPrevBtn = document.querySelector('.slider__btn.r-right-17vw');
  const altNextBtn = document.querySelector('.slider__btn.l-left-17vw');
  
  
  
  let startSlider = false;
  let effects = document.querySelector('.effects');
  let enterBtn = document.querySelector('.effects-form__btn');
  let elementClick = null;
  
  let soundClick = document.querySelector('#sound-сlick');
  let soundClickRightIndicator = document.querySelector('#sound-сlick-right-indicator');
  let soundClickLeftIndicator = document.querySelector('#sound-сlick-left-indicator');
  let soundClickPause = document.querySelector('#sound-сlick-pause');
  let soundClickPlay = document.querySelector('#sound-сlick-play');
  let soundMusic = document.querySelector('#sound-music');
  let musicOnOff = document.querySelector('.group');
  
  
  
  let userChoiceSound = musicOnOff.querySelectorAll('label.radio-button');
  let temp = null;
  
  let inputRadio = musicOnOff.getElementsByTagName('input');
  let userSelectAudio = 'false';
  let backstage = document.querySelector('div.is-backstage-yes');
  
  let shadowFront = document.querySelector('.btn-3d-item.front');
  let shadowBack = document.querySelector('.btn-3d-item.back');
  let currentSlide = 0; // counter
  let interval = 4000; // 4000 miliseconds
  let interval1 = 1000;
  let interval15 = 1500;
  let interval25 = 2500;
  let slidesCount = slides.length;
  let intervalID  = null;
  let isPlaying = true;
  
  let swipeStartX = null;
  let swipeEndX = null;
  
  
  function enableMute() {
    soundClick.muted = true;
    soundClickRightIndicator.muted = true;
    soundClickLeftIndicator.muted = true;
    soundClickPause.muted = true;
    soundClickPlay.muted = true;
    soundMusic.muted = true;
  }
  
  function disableMute() {
    soundClick.muted = false;
    soundClickRightIndicator.muted = false;
    soundClickLeftIndicator.muted = false;
    soundClickPause.muted = false;
    soundClickPlay.muted = false;
    soundMusic.muted = false;
  }
  
  musicOnOff.addEventListener('change', function(event){
    userSelectAudio = event.target.value;
    return userSelectAudio;
  })
  
  
  // Applying styles to the sound selection button when you click on it
  musicOnOff.addEventListener('click', function(event){
    
    if (event.target.tagName === 'LABEL') {
      for (let i = 0; i < userChoiceSound.length; i++) {
        if ( event.target.childNodes[1].value === userChoiceSound[i].childNodes[1].value) {
          userChoiceSound[i].classList.add('is-checked-btn');
        } else {
          userChoiceSound[i].classList.remove('is-checked-btn');
        }
      }
    }
  
  
  })
  
  
  
  
  enterBtn.addEventListener('click', function(){
    if (userSelectAudio !== 'true') {
      enableMute();
    }
  
    soundClick.play();
    soundMusic.setAttribute('autoplay', '');
    soundMusic.volume = 0.3;
    // soundMusic.play();
  
  
    setTimeout(function(){ // delay after click on button ENTER
      document.body.removeChild(effects);
      soundMusic.play();
    }, interval1);
  
    startSlider = true;
  
  
    // - - - - Code work SLIDER - - - - 
    if (startSlider) {
      
      setTimeout(function(){
        
        backstage.classList.add('is-backstage-no');
  
        function goToSlide(n) {
          slides[currentSlide].classList.toggle('is-active');
          indicators[currentSlide].classList.toggle('is-hover-indicator');
          currentSlide = (n + slidesCount) % slidesCount;
          slides[currentSlide].classList.toggle('is-active');
          indicators[currentSlide].classList.toggle('is-hover-indicator');       
        }
       
        function gotoPrev() {
          goToSlide(currentSlide - 1);
        }
        
        function gotoNext() {
          goToSlide(currentSlide + 1);
        }
        
        function playS() {
          intervalID = setInterval(gotoNext, interval);
          // pauseBtn.innerText = 'Pause';
          isPlaying = true;
          soundClickPlay.play();
  
          setTimeout(function(){
            soundMusic.play();
          }, interval25);
        }
        
        function pause() {
          if (isPlaying) {
            clearInterval(intervalID);
            // pauseBtn.innerText = 'Play';
            soundClickPause.play();
            soundMusic.pause();
            isPlaying = false;
            console.log('Pause clicked.' );
  
          }
        }
        
        function pausePlay() {
          pauseBtn.classList.toggle('myHover'); // remove the shadow when the cube moving
          shadowFront.classList.toggle('is-shadow-off'); 
          shadowBack.classList.toggle('is-shadow-on');
  
          isPlaying ? pause() : playS();
        }
        
        function prev() {
          pauseBtn.classList.add('myHover');
          soundClick.play()
          
          pause();
          gotoPrev();
        }
  
        function prevWave() {
          pauseBtn.classList.add('myHover');
          soundClickRightIndicator.play();
          
          pause();
          gotoPrev();
        }
        
        function next(){  
          pauseBtn.classList.add('myHover');
            soundClick.play();
  
          pause();
          gotoNext();
        }
        
        function nextWave() {
          pauseBtn.classList.add('myHover');
            soundClickLeftIndicator.play();
          
          pause();
          gotoNext();
        }
  
        function indicate(event) {
          let target = event.target;
          
          if (target.classList.contains('indicator')) {
            let n = +target.getAttribute('data-slide-to');
            pauseBtn.classList.add('myHover');
            pause();
            goToSlide(n);
            soundClickLeftIndicator.play();
          }
        }
  
        function pressKey(event) {
          if (event.code === 'ArrowLeft') {
            prevWave();
          }
          if (event.code === 'ArrowRight') {
            nextWave();
          }
          if (event.code === 'Space') {
            pausePlay();
          }
        }
  
        function swipeStart(event) {
          swipeStartX = event.changedTouches[0].pageX;
        }
  
        function swipeEnd(event) {
          swipeEndX = event.changedTouches[0].pageX;
          if ((swipeStartX - swipeEndX) > 50 ) {
            nextWave();
          };
          (swipeStartX - swipeEndX < -50) && prevWave();
        }
  
        
        pauseBtn.addEventListener('click', pausePlay);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        altPrevBtn.addEventListener('click', prevWave);
        altNextBtn.addEventListener('click', nextWave);
        indicatorsContainer.addEventListener('click', indicate);
        document.addEventListener('keydown', pressKey);
  
        containerSwipe.addEventListener('touchstart', swipeStart);
        containerSwipe.addEventListener('touchend', swipeEnd);
         
        // - - - -  LAUNCH APP  - - - - - - -
        intervalID = setInterval(gotoNext, interval);
  
      }, interval15);
    
    }
  
  });



})();





