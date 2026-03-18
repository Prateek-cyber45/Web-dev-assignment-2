const API_KEY="ba2f74f4da8bcb463e4e5c7276cff6b1"

const form=document.querySelector('#form')
const city = document.querySelector('#city')   // ✅ added
const weatherDetail=document.querySelector('.info')
const searchHistory=document.querySelector('.historyBtn')

let cityHistory =JSON.parse(localStorage.getItem("cityHistory")) || []

form.addEventListener('submit',async function(event){
    event.preventDefault()
    const searchCity=city.value
    console.log(searchCity)
    getData(searchCity)
})

async function getData(searchCity) {
    if (searchCity){
        try{
            const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`)
            const data=await res.json()

            if(data.cod===200){
                weatherDetail.innerHTML=`
                <p>City: ${data.name}</p>
                <p>Temp: ${(data.main.temp-273.15).toFixed(1)}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Humidity: ${data.main.humidity}</p>
                <p>Wind: ${data.wind.speed} m/s</p>
                `

                if(!cityHistory.includes(searchCity)){
                    cityHistory.push(searchCity)
                    localStorage.setItem("cityHistory",JSON.stringify(cityHistory))
                    displayHistory()
                }

            }else{
                weatherDetail.innerHTML=`<p>City not found</p>`
            }

        }catch(e){
            weatherDetail.innerHTML = "<p>Error fetching data</p>";
            console.log(e)
        }
    }
}

function displayHistory(){
   searchHistory.innerHTML=""
   const history=JSON.parse(localStorage.getItem("cityHistory"))

   if(history){
      history.forEach((city) => {
         const btn=document.createElement("button")
         btn.innerText=city

         btn.addEventListener("click",function(){
            getData(city)
         })

         searchHistory.appendChild(btn)
      });
   }
}


displayHistory()