const input = document.querySelector(".input")
const alert = document.querySelector(".alert")
const form = document.querySelector(".form")
const marks = document.querySelector(".marks")
const popUpInfo = document.querySelector(".pop-up-info")

function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(action)

    setTimeout(()=>{
        alert.textContent = text
        alert.classList.remove(action)
    }, 2000)
}


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const value = input.value
    if (value){
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2HRin6JlfPGO0p257rJFXQ4dHshrF&ipAddress=${value}`)
            .then(res => {
                if (!res.ok){
                    throw Error("Something went wrong")
                }
                return res.json()
            })
            .then(data => {
                const {ip, location, isp} = data
                const map = L.map('map').setView([location.lat, location.lng], 16);
                        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=qVkZZeSzKiPIlQvCAlFL', {attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                        }).addTo(map);
                        marker = L.marker([location.lat, location.lng]).addTo(map);


                popUpInfo.innerHTML = `<div class="address text-black font-bold md:w-1/4">
                    <p class="text-zinc-400 text-[8px] tracking-widest uppercase font-bold">
                        IP ADDRESS
                    </p>
                    <h1 class="text-lg">${ip}</h1>
                </div>
                <div class="location text-black font-bold md:w-1/4 md:border-l">
                    <p class="text-zinc-400 text-[8px] tracking-widest uppercase font-bold">
                        location
                    </p>
                    <h1 class="text-lg">${location.region}, ${location.city}</h1>
                </div>
                <div class="address text-black font-bold md:w-1/4 md:border-l">
                    <p class="text-zinc-400 text-[8px] tracking-widest uppercase font-bold">
                        timezone
                    </p>
                    <h1 class="text-lg">UTC ${location.timezone}</h1>
                </div>
                <div class="address text-black font-bold md:w-1/4 md:border-l">
                    <p class="text-zinc-400 text-[8px] tracking-widest uppercase font-bold">
                        Isp
                    </p>
                    <h1 class="text-lg">${isp}</h1>
                </div>`
            })
            .catch(err => {
                document.body.innerHTML = `<div class="text-center">${err}</div>`
            })
        displayAlert("One second...", "success")
        input.value = ""
        marks.style.display = "none"
    }
    else{
        displayAlert("Please insert an address", "danger")
    }
})


