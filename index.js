const apiKey = "9470f162a34d93086760b16d1426a9ed";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

    const searchBox = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");



        async function getWeather(city) {
            const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

            if (responce.status == 404) {
                let img = document.querySelector("#icon"); 
                img.style.width = "30rem";
                document.querySelector(".detail").style.display = "none";
                document.querySelector(".temp2").style.display = "none";

                img.src = 'images/404.png';
                let temp = document.querySelector(".temp").innerHTML = "Error! 404";
                let name = document.querySelector(".name").innerHTML = "City Not Found"
                document.getElementById("temp").style.fontSize = "3rem";

                return;


            }

            else {
                var data = await responce.json();

                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
                document.querySelector(".name").innerHTML = data.name + ", " + data.sys.country;
                document.querySelector(".mintemp").innerHTML = Math.round(data.main.temp_min) + "°c";
                document.querySelector(".maxtemp").innerHTML = Math.round(data.main.temp_max) + "°c";


                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

                let img = document.querySelector("#icon");

                switch (data.weather[0].main) {
                    case 'Clear':
                        img.src = 'assets/clear.png';
                        break;

                    case 'Rain':
                        img.src = 'assets/rain.png';
                        break;

                    case 'Snow':
                        img.src = 'assets/snow.png';
                        break;

                    case 'Clouds':
                        img.src = 'assets/cloud.png';
                        break;

                    case 'Mist':
                        img.src = 'assets/mist.png';
                        break;

                    case 'Haze':
                        img.src = 'assets/mist.png';
                        break;

                    default:
                        img.src = 'assets/cloud.png';
                        break;
                }

                document.querySelector(".detail").style.display = "flex";
                document.querySelector(".temp2").style.display = "flex";
                document.getElementById("temp").style.fontSize = "5.2rem";
                img.style.width = "16rem";

            }

        }



        searchButton.addEventListener("click", function () {
            getWeather(searchBox.value);
        })

             setInterval(() => {
            getWeather(searchBox.value);
    }, 600000); 


