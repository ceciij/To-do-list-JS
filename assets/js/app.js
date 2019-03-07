//variables
const listaTweets = document.getElementById('lista-tweets');

//Event listeners
eventListeners();
function eventListeners(){
    // Agregar tweet
    document.getElementById('formulario').addEventListener('submit', agregarTweet);
    // Eliminar tweet
    document.querySelector('#lista-tweets').addEventListener('click', eliminarTweet);
    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet= document.getElementById('tweet').value;
    const borrarBtn= document.createElement('a');
    borrarBtn.classList='borrar-tweet';
    borrarBtn.innerText='X';
    const lista = document.createElement('li');
    lista.innerText = tweet;
    listaTweets.appendChild(lista);
    lista.appendChild(borrarBtn);
    agregarLocalStorage(tweet);
    document.getElementById('tweet').value="";
}

// Elimina Tweet DOM
function eliminarTweet(e){
    let tweet;
    e.preventDefault();
    if(e.target.className==='borrar-tweet')
    {
       e.target.parentElement.remove();
       tweet=e.target.parentElement.innerText;
       eliminarTweetLocalStorage(tweet);

    }
}

// Mostrar localstorage de la lista 
function localStorageListo() {
    let tweets;
    tweets= obtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
        const borrarBtn= document.createElement('a');
        borrarBtn.classList='borrar-tweet';
        borrarBtn.innerText='X';
        const lista = document.createElement('li');
        lista.innerText = tweet;
        listaTweets.appendChild(lista);
        lista.appendChild(borrarBtn);
        
    });
}

// Agrega tweet a local Storage
function agregarLocalStorage(tweet){
let tweets;
    tweets=obtenerTweetsLocalStorage();
    // agregar a localStorage
    tweets.push(tweet);
    // Convertir de String a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Eliminar tweet del local storage
function eliminarTweetLocalStorage(tweet){
    let tweets, borrarX;
    tweetSinX= tweet.substring(0 , tweet.length-1);
    
    tweets=obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweet===tweetSinX)
        {
            tweets.splice(index,1);
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Comprobar que haya elementos en Local Storage (retorna un arreglo)

function obtenerTweetsLocalStorage(){
let tweets;
    if(localStorage.getItem('tweets')===null)
    {
        tweets =[];
    }
    else
    {
        tweets= JSON.parse(localStorage.getItem('tweets'));
    }
return tweets;
}

