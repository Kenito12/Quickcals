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
    }, 300)
}






// option use to setup fetch
const options = {method: 'GET', headers: {'User-Agent': 'insomnia/10.0.0'}};


fetch('https://api.edamam.com/api/nutrition-data?app_id=ee662e01&app_key=541024222d969d48ce2ec643427168a0%09&nutrition-type=logging&ingr=1%20cup%20rice', options)
.then(apiResult => apiResult.json())
.then(apiResult => {
    console.log(apiResult)})
.catch(err => console.error(err));