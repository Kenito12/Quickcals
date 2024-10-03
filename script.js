// Using GSAP to animate title page onload
gsap.from("#titleContainer", { y: -400, ease: "bounce.out", duration: 1})

// assign DOM elements into variables
const startBut = document.getElementById("startBut")
const startScreen = document.getElementById("startScreen")
const resultScreen = document.getElementById("ResultScreen")


// Start button behaviors   activate some animation and loading result page
startBut.onclick = () => {
    gsap.to('.stagOutro', {y: -1000, stagger:0.1})
    gsap.to('#startScreen', {opacity: 0})
    setTimeout(() => {
        startScreen.style.display = "none"
        resultScreen.style.display = "block"
        bar.animate(1.0); 
        bar2.animate(100/100); 
    }, 300)
}


// option use to setup fetch
const options = {method: 'GET', headers: {'User-Agent': 'insomnia/10.0.0'}};


fetch('https://api.edamam.com/api/nutrition-data?app_id=ee662e01&app_key=541024222d969d48ce2ec643427168a0%09&nutrition-type=logging&ingr=1%20cup%20rice', options)
.then(apiResult => apiResult.json())
.then(apiResult => {
    console.log(apiResult)})
.catch(err => console.error(err));




// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.Circle(calMeter, {
    color: '#003069',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 8,
    easing: 'easeInOut',
    duration: 2000,
    text: {
        autoStyleContainer: false
    },
    from: { color: '#33D6EC', width: 8 },
    to: { color: '#33D6EC', width: 8 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 702);
        if (value === 0) {
        circle.setText('');
    } else {
        circle.setText(value + `<br><span class="meterSub">Calories</span>`);
    }
    }
    });


    var bar2 = new ProgressBar.Circle(proteinMeter, {
    color: '#003069',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 8,
    trailWidth: 8,
    easing: 'easeInOut',
    duration: 2000,
    text: {
        autoStyleContainer: false
    },
    from: { color: '#ECA233', width: 8 },
    to: { color: '#ECA233', width: 8 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 102.9);
        if (value === 0) {
        circle.setText('kcal');
        } else {
        circle.setText(value + `<br><span class="meterSub">Grams</span>`);
        }

    }
    })
