// Using GSAP to animate title page onload
gsap.from("#titleContainer", { y: -400, ease: "bounce.out", duration: 1})

// assign DOM elements into variables
const startBut = document.getElementById("startBut")
const searchBut = document.getElementById("searchBut")
const startScreen = document.getElementById("startScreen")
const resultScreen = document.getElementById("ResultScreen")
const searchInput = document.getElementById("SearchInput")
const nutritionalFacts = document.getElementById("nutritionalFacts")
const metersParent = document.getElementById("metersParent")

metersParent.style.display = "none"


var ingrCals
var calsGoal = 2500;


// Start button behaviors   activate some animation and loading result page
startBut.onclick = () => {
    gsap.to('.stagOutro', {y: -1000, stagger:0.1})
    gsap.to('#startScreen', {opacity: 0})
    setTimeout(() => {
        startScreen.style.display = "none"
        resultScreen.style.display = "block"
    }, 300)
}

searchBut.onclick = (event) => {
    // Prevent Default event from type:summit button
    event.preventDefault();

    //simeple regrex created by GPT to replace space with %20
    const output = searchInput.value.replace(/ /g, "%20");
    console.log(output)

    metersParent.style.display = "none"


    
    
    // option use to setup fetch
    const options = {method: 'GET', headers: {'User-Agent': 'insomnia/10.0.0'}};
    
    
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=ee662e01&app_key=541024222d969d48ce2ec643427168a0%09&nutrition-type=logging&ingr=${output}`, options)
    .then(apiResult => apiResult.json())
    .then(apiResult => {
        console.log(apiResult)
        console.log(apiResult.calories)

        // list of all nutrients for the ingredient dynamic data
        // some of the nutrient does not define for some ingredient so I have to add a condition incase it's undefined
        let totalFat = apiResult.totalNutrients.FAT.quantity.toFixed(1)+ apiResult.totalNutrients.FAT.unit
        let totalFatDaily = Math.round(apiResult.totalDaily.FAT.quantity) +" "+ apiResult.totalDaily.FAT.unit
        let satFat = apiResult.totalNutrients.FASAT.quantity.toFixed(1) + apiResult.totalNutrients.FASAT.unit
        let satFatDaily = Math.round(apiResult.totalDaily.FASAT.quantity) +" "+ apiResult.totalDaily.FASAT.unit
        let trnFat = typeof(apiResult.totalNutrients.FATRN) === "undefined"? "-" : apiResult.totalNutrients.FATRN.quantity.toFixed(1) + apiResult.totalNutrients.FATRN.unit
        let choles = apiResult.totalNutrients.CHOLE.quantity.toFixed(1) + apiResult.totalNutrients.CHOLE.unit
        let cholesDaily = Math.round(apiResult.totalDaily.CHOLE.quantity) +" "+ apiResult.totalDaily.CHOLE.unit
        let sodium = apiResult.totalNutrients.NA.quantity.toFixed(1) + apiResult.totalNutrients.NA.unit
        let sodiumDaily = Math.round(apiResult.totalDaily.NA.quantity) +" "+ apiResult.totalDaily.NA.unit
        let carbo = apiResult.totalNutrients.CHOCDF.quantity.toFixed(1) + apiResult.totalNutrients.CHOCDF.unit
        let carboDaily = Math.round(apiResult.totalDaily.CHOCDF.quantity) +" "+ apiResult.totalDaily.CHOCDF.unit
        let fiber = (apiResult.totalNutrients.FIBTG)? apiResult.totalNutrients.FIBTG.quantity.toFixed(1) + apiResult.totalNutrients.FIBTG.unit : "-"
        let fiberDaily = (apiResult.totalNutrients.FIBTG)? Math.round(apiResult.totalDaily.FIBTG.quantity) +" "+ apiResult.totalDaily.FIBTG.unit : ""
        let sugar = (apiResult.totalNutrients.SUGAR)? apiResult.totalNutrients.SUGAR.quantity.toFixed(1) + apiResult.totalNutrients.SUGAR.unit : "-"
        let protein = apiResult.totalNutrients.PROCNT.quantity.toFixed(1) + apiResult.totalNutrients.PROCNT.unit
        let proteinDaily = Math.round(apiResult.totalDaily.PROCNT.quantity) +" "+ apiResult.totalDaily.PROCNT.unit


        metersParent.style.display = "block"
        nutritionalFacts.innerHTML = ""
        
        let template =/*html*/ `
        <h1 class="roboto-bold">Nutritional Facts</h1>
        <hr class="boldLine">
        <h3 class="roboto-bold">Amount Per Serving</h3>
        <h2 class="roboto-bold">Calories<span class="textFloatRight">${apiResult.calories}</span></h2>
        <hr class="semiBLine">
        <p class="textFloatRight daily roboto-regular">% Daily Value*</p>
        <hr>
        <h3 class="roboto-bold">Total Fat <span>${totalFat}</span> <span class="textFloatRight">${totalFatDaily}</span></h3>
        <hr>
        <p class="roboto-regular">Saturated Fat <span>${satFat}</span><span class="textFloatRight">${satFatDaily}</span></p>
        <hr>
        <p class="roboto-regular">Trans Fat <span>${trnFat}</span><span class="textFloatRight">${satFatDaily}</span></p>
        <hr>
        <h3 class="roboto-bold">Cholesterol <span>${choles}</span> <span class="textFloatRight">${cholesDaily}</span></h3>
        <hr>
        <h3 class="roboto-bold">Sodium <span>${sodium}</span> <span class="textFloatRight">${sodiumDaily}</span></h3>
        <hr>
        <h3 class="roboto-bold">Total Carbohydrate <span>${carbo}</span> <span class="textFloatRight">${carboDaily}</span></h3>
        <hr>
        <p class="roboto-regular">Dietary Fiber <span>${fiber}</span><span class="textFloatRight">${fiberDaily}</span></p>
        <hr>
        <p class="roboto-regular">Total Sugars <span>${sugar}</span></p>
        <hr>
        <p class="roboto-regular">Includes - Added Sugars</p>
        <hr>
        <h3 class="roboto-bold">Protein <span>${protein}</span> <span class="textFloatRight">${proteinDaily}</span></h3>
        <p class="roboto-regular daily textCenter">*Percent Daily Values are based on a 2000 calories diet</p>
        `
        
        nutritionalFacts.innerHTML += template

        ingrCals = apiResult.calories

        let calGoalPer = (ingrCals/calsGoal)*100;

        console.log(calGoalPer)

        bar.animate(calGoalPer/100); 
        bar2.animate(1.0); 
        
        
    })
    .catch(err => console.error(err));
}






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

        var value = Math.round(circle.value() * calsGoal);
        if (value === 0) {
        circle.setText('0<br><span class="meterSub">Grams</span>');
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
        circle.setText('0<br><span class="meterSub">Grams</span>');
        } else {
        circle.setText(value + `<br><span class="meterSub">Grams</span>`);
        }

    }
    })
