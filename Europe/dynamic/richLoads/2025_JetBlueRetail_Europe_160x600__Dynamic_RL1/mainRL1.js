// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl, tl2;

////////////////////////////////////////////////////////////////////////
// @FT1 - code block start
//VARIABLE DECLARATIONS
var thisFeedLoaded=false;
var showDefault=false;
var ctURL = "";


var default_exit = myFT.$("#default_exit");

default_exit.on('click',function(){
  myFT.clickTag(1,ctURL);
});

myFT.on('instantads',function(){
      ctURL=myFT.instantAds.Retail_default_clickTag_URL
      myFT.dispatch('RL1_available');

    });
    myFT.on('theFeedLoaded', function(e) {
      console.log('RL1: Richload recieved feed from Base file)');
      feedLoaded(e.a);
    });
    myFT.on('RL1_play', function () {
      init();
    });
    /*
    ////////////////////////////////////////////////
       LOADING FEED START
    ////////////////////////////////////////////////

    Please note: JetBlue setup has feeds loading form the base file and then passed into richLoads via a custom event
    called 'theFeedLoaded'.
    */
    function feedLoaded(feedItems) {
      if(!thisFeedLoaded){
        thisFeedLoaded=true;
        try {
          /*Setting variable values from loaded feed (FEED PASSED THROUGH THE --theFeedLoaded-- CUSTOM EVENT)*/
          /*For example: the following variable ctURL is used to pass a url from feed into a dynamic clickTag*/
          ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feedItems[0]['url'];
          //This variable will be passed through clicktag (inside clickEvent handler below) as a parameter
          //myFT.clickTag(1, ctURL);
          //If using dynamic text, set variables values to feed or dynamic variables setup in manifest/versions within instandAd*/
        } catch (e) {
          showDefault = true;
        }
        setupContent();
      }
    }
    function setupContent() {
      //Populate dynamic text with feed and/or dynamic variable data here
      //Once all dynamic content has been populated, dispatch event to the base file to notify richload 1 ready to start playing
      myFT.dispatch('RL1_ready_to_play');
    }

// @FT1 - code block end
///////////////////////////////////////////////////////////////////////////////////////


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax();
  tl2 = new TimelineMax();

  animate();
  setRollover();

}

function animate() {
  //make parent (base file) border black
  window.parent.document.getElementById("border").style.borderColor="#000"
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl.set("#cloud", { y:0, force3D: true });

  tl.set(['#h1, #h2,#h3'], {y:"20px"})
  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, y: "0px", ease: Power1.easeOut}, 'frame1+=0.5')
  // .to('#cloud', 5, { y: "0", ease: Power1.easeOut}, 'frame1+=0.5')

  .addLabel('frame2', 'frame1+=4')
  .to('#h1', 0.5, { autoAlpha: 0, y: "20px", ease: Power1.easeOut }, "frame2")
  .to('#h2', 0.5, { autoAlpha: 1, y: "0", ease: Power1.easeOut }, "frame2+=0.5")

  .addLabel('frame_END', "frame2+=5")
  .to('#endframeBg', 0.6 ,{ top: 0, ease: Back.easeOut.config(.3)}, 'frame_END')

  //////////////////////////////////////
  // @FT2 code block start
  .call(playEndframe, ["param1"], 'frame_END')
  // @FT2 code block end
  ////////////////////////////////////////


}
////////////////////////////////////////
//@FT3 code block start
function playEndframe(param1){
  myFT.dispatch('init_RL2');
}
//@FT3 code block end
////////////////////////////////////////



// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}
////////////////////////////////////////
//@FT4 code block start

// End timer custom event listener (dispatched from RL2 when animation complete)
myFT.on('stopTimer',function(){
  // show total banner animation time in browser console.
  var endTime = new Date();
  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
})

//@FT4 code block end
////////////////////////////////////////

const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerHTML = year;
