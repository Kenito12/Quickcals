// Using GSAP to animate title page onload
gsap.from("#titleContainer", { y: -400, ease: "bounce.out", duration: 2, opacity: 0})

// assign DOM elements into variables
const startBut = document.getElementById("startBut")
const searchBut = document.getElementById("searchBut")
const startScreen = document.getElementById("startScreen")
const resultScreen = document.getElementById("ResultScreen")
const searchInput = document.getElementById("SearchInput")
const nutritionalFacts = document.getElementById("nutritionalFacts")
const metersParent = document.getElementById("metersParent")
const hamBut = document.getElementById("HamburgerMenu")
const overlay = document.getElementById("overlay")
const closeMenu = document.getElementById("close-menu")
const calGoalInput = document.getElementById("CalGoalInput")
const protGoalInput = document.getElementById("ProtGoalInput")
metersParent.style.display = "none"

// These variablees use to calculate a personalized amount of calories and protein
var ingrCals
var ingrProt
var calsGoal = calGoalInput.value
var proteinGoal = protGoalInput.value

// Hamburger menu features 
hamBut.onclick = () => {
    overlay.style.display = "block"
    gsap.fromTo('#overlay',{
        xPercent: 100, duration: 0.6, opacity: 0
    },{
        xPercent: 0, duration: 0.6, opacity: 1
    })
    gsap.from('#close-menu',{
        rotation: 720,
        duration: 1
    })
}
// Using GSAP for mouseover and mouseout on Hamburger menu
hamBut.onmouseover = () => {
    gsap.to(hamBut,{
        y: 10, duration: 0.6
    })
}
hamBut.onmouseout = () => {
    gsap.to(hamBut,{
        y: 0, duration: 0.6
    })
}

// Using GSAP for close 
closeMenu.onclick = () => {
    // overlay.style.display = "none"
    gsap.fromTo('#overlay',{
        xPercent: 0, duration: 0.6, opacity: 1
    },{
        xPercent: 100, duration: 0.6, opacity: 0
    })
}
closeMenu.onmouseover = () => {
    gsap.to(closeMenu,{
        rotation: 180, duration: 0.6
    })
}
closeMenu.onmouseout = () => {
    gsap.to(closeMenu,{
        rotation: -180, duration: 0.6
    })
}


// if there is a change on calgoal and proteingoal input both value will get update
calGoalInput.onchange = () => {
    calsGoal = calGoalInput.value
    console.log('value change cal to' + calsGoal)
}
protGoalInput.onchange = () => {
    proteinGoal = protGoalInput.value
    console.log('value change protein to' + proteinGoal)
}



// Start button behaviors   activate some animation and loading result page
startBut.onclick = () => {
    gsap.to('.stagOutro', {y: -1000, stagger:0.1, duration: 1})
    gsap.to('#startScreen', {opacity: 0, duration: 1})
    setTimeout(() => {
        startScreen.style.display = "none"
        resultScreen.style.display = "block"
        gsap.from('#resultTitle, #searchBar, #HamburgerMenu', {opacity: 0, duration: 1, y:-200})
        gsap.from('#wave', {opacity: 0, duration: 1, y:200})
    }, 300)
}

searchBut.onclick = (event) => {
    // Prevent Default event from type:summit button
    event.preventDefault();

    //simeple regrex created by GPT to replace space with %20
    const output = searchInput.value.replace(/ /g, "%20");
    console.log(output)

    // display the page and play gsap animation
    nutritionalFacts.style.display = 'block'
    gsap.from(nutritionalFacts, {opacity: 1, duration: 1, y: -50, ease: "bounce.out"})
    gsap.from("#calMeter, #proteinMeter", {opacity: 1, duration: 1, y: -50, ease: "bounce.out"})


    
    
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

        // user charAt() to select the first letter of the word and capitalized it.
        let foodTitle = apiResult.ingredients[0].parsed[0].foodMatch.charAt(0).toUpperCase() + apiResult.ingredients[0].parsed[0].foodMatch.replace(apiResult.ingredients[0].parsed[0].foodMatch.charAt(0), "")
        let amountPer = apiResult.ingredients[0].parsed[0].quantity +" "+ apiResult.ingredients[0].parsed[0].measure 

        metersParent.style.display = "block"
        nutritionalFacts.innerHTML = ""
        
        let template =/*html*/ `
        <h1 class="roboto-bold">${foodTitle}</h1>
        <hr class="boldLine">
        <h3 class="roboto-bold">Amount Per ${amountPer}</h3>
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

        // getting calories from the ingredient and assign to a value
        ingrCals = apiResult.calories
        ingrProt = apiResult.totalNutrients.PROCNT.quantity.toFixed(1)

        // calculate the percentage amount of protein and calories based on daily goal and ingredient
        let calGoalPer = (ingrCals/calsGoal)*100;
        let protGoalPer = (ingrProt/proteinGoal)*100

        console.log(calGoalPer)
    
        // activated progress bar for both protein and calories
        bar.animate(calGoalPer/100); 
        bar2.animate(protGoalPer/100); 
        
        
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

      var value = Math.round(circle.value() * proteinGoal);
        if (value === 0) {
        circle.setText('0<br><span class="meterSub">Grams</span>');
        } else {
        circle.setText(value + `<br><span class="meterSub">Grams</span>`);
        }

    }
    })
