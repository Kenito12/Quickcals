// option use to setup fetch
const options = {method: 'GET', headers: {'User-Agent': 'insomnia/10.0.0'}};


fetch('https://api.edamam.com/api/nutrition-data?app_id=ee662e01&app_key=541024222d969d48ce2ec643427168a0%09&nutrition-type=logging&ingr=1%20cup%20rice', options)
.then(apiResult => apiResult.json())
.then(apiResult => {
    console.log(apiResult)})
.catch(err => console.error(err));