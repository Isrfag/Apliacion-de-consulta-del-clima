
//Vamos a usar la API de openweatherMap

//Creamos las urls basicas
const geoUrl ='http://api.openweathermap.org/geo/1.0/direct'
const mainUrl = 'https://api.openweathermap.org/data/2.5/weather'
//Necesitamos una key para uso propio
let api_key ='71a5af0525e2e6830bf0fe5e6721fa28'

const searchButton = document.getElementById('searchButton')

const checkWeather = () => {

    let desiredCity =document.querySelector('input').value //Obtenemos el valor de lo introducido

    if(desiredCity){
    //Primero fetch para obtener las coordenadas de la ciudad al introducir nombre
    fetch(`${geoUrl}?q=${desiredCity}&appid=${api_key}`)
        .then(res => res.json())
        .then(city => {
            let lat = city[0].lat //Guardamos la latitud y la longitud de la ciudad 
            let lon = city[0].lon

            //Hacemos otro fecth para obtener ahora si el tiempo con las coordinadas
           fetch(`${mainUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`)
             .then(res => res.json())
             .then(weather => showClimateData(weather)) //Este no devuleve un array es un objeto

        }) //Esto devuelve un array de objetos, que en este caso solo tiene uno el 0
    }else{
        alert("Introduzca una ciudad")
    }
}

const showClimateData = (weather) => {
    
    const divClimateData = document.getElementById('climateData')
    divClimateData.innerHTML='' //Lo limpiamos cuando ya hayamos obtenido la info

    const cityName = weather.name
    const countryName = weather.sys.country
    const cityTemp = weather.main.temp
    const humidity = weather.main.humidity
    const cityDescription = weather.weather[0].description //La descripcion si es un array
    const icon = weather.weather[0].icon 

    const city = document.createElement('h2')
    city.textContent = document.querySelector('input').value

    const cityTitle = document.createElement('h3') //Creamos un elemento
    cityTitle.textContent = `${cityName}, ${countryName}` //Al nuevo elemento le damos el nombre obtenido

    const tempInfo = document.createElement('p')
    tempInfo.textContent = changeDegrees(cityTemp) //temp viene en kelvin

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es: ${humidity}%`

    const descInfo = document.createElement('p')
    descInfo.textContent = `La descripción metereológica es: ${cityDescription}`

    const iconInfo = document.createElement('img')
    iconInfo.src=`https://openweathermap.org/img/wn/${icon}@2x.png`

    //Los elementos html ya estan creados pero no los hemos unidos al div

    divClimateData.appendChild(city)
    divClimateData.appendChild(cityTitle) //Ahora si los hemos unido como un hijo del div
    divClimateData.appendChild(tempInfo)
    divClimateData.appendChild(humidityInfo)
    divClimateData.appendChild(descInfo)
    divClimateData.appendChild(iconInfo)


}

const changeDegrees = (cityTemp) => {

   let celsiusTemp = Math.trunc(cityTemp - 273.15) 

   let farenheitTemp = Math.trunc((celsiusTemp*9/5) +32 )

   return 'La temperatura es de ' +celsiusTemp+'°C' + '/' + farenheitTemp+'°F'
}


searchButton.addEventListener('click',checkWeather)
