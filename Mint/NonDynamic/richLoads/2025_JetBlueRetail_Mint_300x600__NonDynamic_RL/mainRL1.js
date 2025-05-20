var tl;
var tl2;
var container = myFT.$("#main_container");
var default_exit = myFT.$("#default_exit");

// var myVid=myFT.$("#video1");
var clickTag1_url="";
// var vid_time_triggered=false;

var startTime;

//
default_exit.on('click',function(){
  myFT.clickTag(1,clickTag1_url)
})
// wait for instantads to load before initializing creative animation
myFT.on('instantads',function(){

  clickTag1_url=myFT.instantAds.clickTag1_url;

})

init()
function animate() {
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });

  tl.set(['#h1, #h2'], {y:"20px"})
  
  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, y: "0", ease: Power1.easeOut}, 'frame1+=0.5')

  .addLabel('frame2', 'frame1+=4')
  .to('#h1', 0.5, { autoAlpha: 0, y: "20px", ease: Power1.easeOut }, "frame2")
  .to('#h2', 0.5, { autoAlpha: 1, y: "0", ease: Power1.easeOut }, "frame2+=0.5")

   const totalDuration = tl.duration() + 2;
  tl.fromTo("#clouds", totalDuration , { x: "50" }, { x: "170", ease: Power0.easeNone }, 0)

}

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.15, { scale: 1.1, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.15, { scale: 1, ease: Power1.easeInOut })
}

function init() {
  startTime = new Date();
  tl = new TimelineMax({onComplete: logDuration});

  animate();
  setRollover();
		
}

function logDuration() {
  let endTime = new Date();
  console.log(
    "Animation duration: " + ((endTime - startTime) / 1000).toFixed(2) + " seconds"
  );
}

const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerHTML = year;