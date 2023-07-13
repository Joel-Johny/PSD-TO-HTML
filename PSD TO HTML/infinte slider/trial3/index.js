//------------------------------ SLIDER 1 JS -------------------------------------

window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  
  const wrapSlider = document.querySelector("#js-wrapSlider");
  const widthWrap = wrapSlider.offsetWidth;
  
  let items;
  let sliders;
  let sliderList = [];
  
  const getSliderList = () => {
    sliders = document.querySelectorAll(".js-slider");
    // get the dom elements in a array to better use it
    sliderList = [...sliders];
  };
  // made a function for update later
  getSliderList();
  
  const slider = document.querySelectorAll(".js-slider")[0];
  const sliderWidth = slider.offsetWidth;
  
  const sumIsLargerThanSlider = sliderWidth >= widthWrap + sliderWidth;
  
  const iterationItems = Math.ceil((widthWrap + sliderWidth) / sliderWidth);
  
  // we clone number of slider we need
  if (iterationItems > 1) {
    for (let i = 0; i < iterationItems - 1; i++) {
      const clone = slider.cloneNode(true);
      wrapSlider.appendChild(clone);
    }
  
    getSliderList();
  }
  
  // we create an array for knowing the state of each item
  let stateList = sliderList.map((item, i) => {
    let pos = 0;
    let start = false;
  
    // here we allow the slide to start fully at left
    if (i < iterationItems - 1) {
      pos = -widthWrap + sliders[i].offsetWidth * i;
      start = true;
  
      sliders[i].style.transform = `translateX(${pos}px)`;
    }
  
    return {
      pos,
      start
    };
  });
  
  // logic animation for sliding each item at a time
  const translate = () => {
    for (let i = 0; i < sliderList.length; i++) {
      const slider = sliderList[i];
      const sliderWidth = slider.offsetWidth;
      const nextIndex = i != sliderList.length - 1 ? i + 1 : 0;
      let pos;
  
      // if slider should be in movement
      if (stateList[i].start) {
        stateList[i].pos-=1;
        pos = stateList[i].pos;
        slider.style.transform = `translateX(${pos}px)`;
      }
  
      const isComplete = pos <= -sliderWidth;
      const isOutSeen = pos <= -widthWrap - sliderWidth;
  
      // if the slider is fully on screen
      if (isComplete) {
        stateList[nextIndex].start = true;
      }
      // if the slider finished crossing the slider and has disappeared
      if (isOutSeen) {
        stateList[i].start = false;
        stateList[i].pos = 0;
      }
    }
  };
  
  let isPaused = false;
  
  function start() {
    if (!isPaused) {
      translate();
    }
  
    requestAnimFrame(start);
  }
  
  wrapSlider.addEventListener("mouseover", () => {
    isPaused = true;
  });
  wrapSlider.addEventListener("mouseout", () => {
    isPaused = false;
  });
  
  start();
// ----------------------------X------------------------------- 

// js for slide3
function startAnimation(){

  let screen_size=window.innerWidth;
  let slider_width=document.getElementsByClassName("slide3")[0].childElementCount*240;
  let remaining_width=screen_size-slider_width;
  let travel_percentage=(remaining_width/screen_size)*100
  // console.log(screen_size,slider_width,remaining_width,travel_percentage)
  if(remaining_width>=0){
    document.getElementsByClassName("slide3")[0].animate([
      { transform: "translateX(0)" }, //0%
      { transform: `translateX(${travel_percentage}%)` },//50%
      { transform: "translateX(0)" }//100%
    ], {
      duration: 3000,
      iterations: Infinity
    });
  }
  
}
window.addEventListener("resize",startAnimation)
startAnimation()
// ----------------------------X------------------------------- 

// js for slide4
function startAnimation_slide4(){

  let screen_size=window.innerWidth;
  let sliderContainer=document.getElementsByClassName("slide4-container")[0];
  let sliderElement=document.getElementsByClassName("slide4")[0];
  let slider_width=sliderElement.childElementCount*240;
  let remaining_width=screen_size-slider_width;
  let clones_needed=Math.max(Math.ceil(remaining_width/sliderWidth),1);
  console.log(remaining_width/sliderWidth,clones_needed)

  //removing all extra clones
  while (sliderContainer.childElementCount>1) {
    sliderContainer.removeChild(sliderContainer.firstChild);
  }
  for(let i =1;i<=clones_needed+1;i++){
    const clone = sliderElement.cloneNode(true);
    sliderContainer.appendChild(clone);
  }
  // console.log(screen_size,slider_width,remaining_width)
  if(remaining_width>=0){
    const slide4_array=[...document.getElementsByClassName("slide4")]
    slide4_array.map((eachSlide)=>{
      eachSlide.animate([
        { transform: "translateX(0)" }, //0%
        { transform: "translateX(-100%)" }//100%
      ], {
        duration: 3000,
        iterations: Infinity
      });
    })
  }
  
}
window.addEventListener("resize",startAnimation_slide4)
startAnimation_slide4()