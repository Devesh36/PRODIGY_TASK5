function getWeather() {
    const locationInput = document.getElementById('location');
    const weatherInfo = document.getElementById('weather-info');
    const location = locationInput.value;

    if (location.trim() === '') {
        alert('Please enter a valid location.');
        return;
    }

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('Location not found. Please enter a valid location.');
                return;
            }

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const city = data.name;
            const country = data.sys.country;

            const weatherHtml = `
                <h2>${city}, ${country}</h2>
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature} K</p>
            `;

            weatherInfo.innerHTML = weatherHtml;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
}
