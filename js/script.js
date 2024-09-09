const date = new Date();
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrar = document.getElementById("btn-registro");

btnRegistrar.addEventListener("click", register);

diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();

const dialogEntrada = document.getElementById("entrada-dialog");
dialogEntrada.addEventListener("click", () => {
    saveRegisterLocalStorage(JSON.stringify(getObjectRegister("entrada")));
});

const dialogSaida = document.getElementById("saida-dialog");
dialogSaida.addEventListener("click", () => {
    saveRegisterLocalStorage(JSON.stringify(getObjectRegister("saida")));
})

function getObjectRegister(registerType) {

    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": getUserLocation(),
        "id": 1,
        "type": registerType
    }
    return ponto;
}

const fecharDialog = document.getElementById("fechar-dialog");
fecharDialog.addEventListener("click", () => {
    dialogPonto.close();
})

// salvar e recuperar um array de objetos ao inves de um objeto

function saveRegisterLocalStorage(register) {
    localStorage.setItem("register", register);
}

function getRegisterLocalStorage(key) {
    // prox aula
}

function register() {
    dialogPonto.showModal();
}

function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear();
}

function getWeekDay() {
    const weekday = ["Domingo-feira", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado-feira"];
    return weekday[date.getDay()];
}

let locationUser = {};

function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        let userLocation = {
            "lat":position.coords.latitude,
            "long": position.coords.longitude
        }
        locationUser = userLocation;
        console.log(locationUser);
    });    
}

updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getWeekDay());
console.log(getCurrentDate());
console.log(getCurrentTime());