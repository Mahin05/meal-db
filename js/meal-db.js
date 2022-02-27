document.getElementById('results-error').style.display = 'none';
// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// to skip loaded data while showing spinner
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const searchFood = () => {
    document.getElementById('results-error').style.display = 'none';
    const search = document.getElementById('search-field');
    const searchText = search.value;
    search.value = '';
    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    if (searchText == '') {
        // displayError();
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
    }
    // console.log(searchText);
    else {
        const mealDetails = document.getElementById('meal-details');
        mealDetails.innerHTML = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchOutput(data.meals))
        // .catch(error => displayError(error));
        // document.getElementById('results-error').style.display = 'none';

    }
}

// searchFood();

const displaySearchOutput = meals => {
    console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (!meals) {
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
    }
    meals?.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  onclick="loadMealDetail(${meal.idMeal})" class="col">
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('flex');

    })
}
const loadMeals = searchText => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    const conatiner = document.getElementById('search-result');
    conatiner.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
<div class="col">
<div  onclick="loadMealDetail(${meal.idMeal})" class="col">
<div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
    </div>
</div>
</div>
    `
        conatiner.appendChild(div);
    })
}
loadMeals('a');

const loadMealDetail = id => {
    // console.log(id);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}
const displayMealDetail = meal => {
    // console.log(meals);{
    console.log(meal.idMeal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
        `;
    mealDetails.appendChild(div);
}