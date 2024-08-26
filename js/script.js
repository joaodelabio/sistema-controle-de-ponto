const date = new Date();
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrar = document.getElementById("btn-registro");

btnRegistrar.addEventListener("click", register);

diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

function register() {
    alert("Ponto batido");
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

updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getWeekDay());
console.log(getCurrentDate());
console.log(getCurrentTime());