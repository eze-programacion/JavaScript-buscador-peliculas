// A la escucha del clicl en el boton de buscar.
document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = '06bbd5400df730888b44c577252b95ee'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
// URL que nos da la página de la API para obtener el poster de la película.
let urlImg = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...'
    // Guardamos el valor que se ingreso en el input (el nombre de peli que se busca).
    let searchInput = document.getElementById('searchInput').value

    // Mediante fetch ingresamos a la url con la pelicula que ingresamos.
    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        // Obtenemos el JSON con la información.
        .then(response => response.json())
        // Mandamos el JSON a la función para trabajar con la pelicula.
        .then(response => displayMovies(response.results))
}

function displayMovies(movies) {

    resultContainer.innerHTML = ''

    // Si no recibimos ninguna pelicula informamos el "error".
    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu búsqueda </p>'
        // Ponemos el return para salir de la función.
        return
    }

    // Si recibimos el JSON con las peliculas, lo recorremos.
    movies.forEach(movie => {
        // Creamos un DIV
        let movieDiv = document.createElement('div')
        // Agregamos el estilo "movie" que esta en style.css.
        movieDiv.classList.add('movie')

        // Creamos un H2.
        let title = document.createElement('h2')
        // Obtenemos el titulo de la película del JSON recibido.
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        // Al div creamos le agregamos las etiquetas h2, p y la imagen.

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        // Y el div creado lo metemeos dentro de otro div.
        resultContainer.appendChild(movieDiv)
    });
}