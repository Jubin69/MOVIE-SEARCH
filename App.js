var submit = document.getElementById("btn-submit")
var search = document.getElementById("search")
submit.addEventListener("click", async (e) => {
    document.getElementById("content").innerHTML = `<h3>SEARCH RESULTS...</h3><button onclick = "sortMovies('${search.value}')">Sort_by_dates</button>`;
    e.preventDefault();
    var searchVal = search.value;
    console.log(searchVal)
    let { results } = await fetchInfo(searchVal);
    if (results.length === 0) {
        document.getElementById("root").innerText = "Not found!"
    } else {
        diplayContentOnRoot(results);
    }
})

async function sortMovies(searchVal){
    let {results} = await fetchInfo(searchVal);
    let  new_results = callforsort(results);
    diplayContentOnRoot(new_results)
}

function callforsort(results){
    let new_results = results.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
    });
    return new_results;
}

async function fetchInfo(searchVal) {
    try {
        var response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&query=${searchVal}`)
        let data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
}

function diplayContentOnRoot(results) {
    var htmlElements = ""
    results.forEach(element => {
        htmlElements += emarge(element);
    });
    document.getElementById("root").innerHTML = htmlElements;
}

function closeModal(){
    document.getElementById("modal").innerHTML = "";
}


async function showDetails(element) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${element}?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US`)
    let data = await response.json();
    let detail_HTML_Txt = `
        <div id="detail_info">
            <h3>${data.original_title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <h4>${data.release_date}</h4>
            <h4>${data.overview}</h4>
            <button onclick = "closeModal()">Close</button>
        </div>
    `
    document.getElementById("modal").innerHTML = detail_HTML_Txt;
}

function emarge(element) {
    return (
        `
            <div id="items" onclick="showDetails(${element.id})">
                <img
                    src="https://image.tmdb.org/t/p/w500${element.poster_path}">
                <h5>${element.original_title}</h5>
                <p>${element.release_date}</p>
            </div>
        `
    )
}

async function showpopularMovies(){
    document.getElementById("content").innerHTML = `<h3>POPULAR MOVIES</h3>`
    let response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US")
    let {results} = await response.json();
    diplayContentOnRoot(results)
}

async function showtopratedMovies(){
    document.getElementById("content").innerHTML = `<h3>TOP RATED MOVIES</h3>`
    let response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    diplayContentOnRoot(results)
}

async function showlatestMovies(flag){
    let response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    if(flag === true){
        sortLatestMovies(results)
    }else{
        diplayContentOnRoot(results)
    }
    document.getElementById("content").innerHTML = `<h3>LATEST & UP COMING MOVIES</h3><button onclick = "showlatestMovies(true)">Sort_by_dates</button>`
}

function sortLatestMovies(results){
    let new_results = callforsort(results)
    diplayContentOnRoot(new_results)
}

async function showNowPlaying(){
    document.getElementById("content").innerHTML = `<h3>ON THEATER</h3>`
    let response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    diplayContentOnRoot(results)
}



function diplayTVContentOnRoot(results) {
    var htmlElements = ""
    results.forEach(element => {
        htmlElements += emargeTVContent(element);
    });
    document.getElementById("root").innerHTML = htmlElements;
}

async function showTVDetails(element){
    let response = await fetch(`https://api.themoviedb.org/3/tv/${element}?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US`)
    let data = await response.json();
    let detail_HTML_Txt = `
        <div id="detail_info">
            <h3>original_title : ${data.original_name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <h4>release_date : ${data.first_air_date}</h4>
            <h4>details :</h4>
            <h4>${data.overview}</h4>
            <button onclick = "closeModal()">Close</button>
        </div>
    `
    document.getElementById("modal").innerHTML = detail_HTML_Txt;
}

function emargeTVContent(element) {
    return (
        `
            <div id="items" onclick="showTVDetails(${element.id})">
                <img
                    src="https://image.tmdb.org/t/p/w500${element.poster_path}">
                <h5>${element.original_name}</h5>
                <p>${element.first_air_date}</p>
            </div>
        `
    )
}


async function showpopularTV(){
    document.getElementById("content").innerHTML = `<h3>POPULAR TV SHOWS</h3>`
    let response = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    diplayTVContentOnRoot(results)
}

async function showtopratedTV(){
    document.getElementById("content").innerHTML = `<h3>TOP RATED TV SHOWS</h3>`
    let response = await fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    diplayTVContentOnRoot(results)
}

async function showlatestTV() {
    document.getElementById("content").innerHTML = `<h3>LATEST TV SHOWS</h3>`
    let response = await fetch("https://api.themoviedb.org/3/tv/on_the_air?api_key=2c4cb1294e2af8a0e3d35e7c181e5c6f&language=en-US&page=1")
    let { results } = await response.json();
    diplayTVContentOnRoot(results)
}

