const date = new Date();
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

btnRegistrarPonto.addEventListener("click", register);

diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");

//dialogHora.textContent = getCurrentTime();

const selectRegisterType = document.getElementById("register-type");

// finalizar a função

function setRegisterType() {
    let lastType = localStorage.getItem("lastRegisterType");
    if(lastType == "entrada") {
        selectRegisterType.value = "intervalo";
        return;
    }
    if(lastType == "intervalo") {

    }
    if(lastType == "volta-intervalo") {

    }
    if(lastType == "saida") {

    }
}

const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", async () => {

    let register = await getObjectRegister(selectRegisterType.value);
    saveRegisterLocalStorage(register);

    localStorage.setItem("lastRegister", JSON.stringify(register));

    const alertaSucesso = document.getElementById("alerta-ponto-registrado");
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");

    setInterval(() => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 5000);

    dialogPonto.close();
});

async function getObjectRegister(registerType) {

    const location = await getUserLocation();

    console.log(location);

    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": location,
        "id": 1,
        "type": registerType
    }
    return ponto;
}

const fecharDialog = document.getElementById("dialog-fechar");
fecharDialog.addEventListener("click", () => {
    dialogPonto.close();
})

const registersLocalStorage = getRegisterLocalStorage("register");

function saveRegisterLocalStorage(register) {

    registersLocalStorage.push(register);

    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}

function getRegisterLocalStorage(key) {
    
    let registers = localStorage.getItem(key);

    if(!registers) {
        return [];
    }

    return JSON.parse(registers);
}

/*function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        let userLocation = {
            "lat":position.coords.latitude,
            "long": position.coords.longitude
        }
        return userLocation;
    });    
}*/

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        }, 
        (error) => {
            reject("Erro " + error);
        });
    });
}

function register() {

    const dialogUltimoRegistro = document.getElementById("dialog-ultimo-registro");
    let lastRegister = JSON.parse(localStorage.getItem("lastRegister"));

    if (lastRegister) {
        let lastDateRegister = lastRegister.date;
        let lastTimeRegister = lastRegister.time;
        let lastRegisterType = lastRegister.type;

        dialogUltimoRegistro.textContent = "Ultimo registro: " + lastDateRegister + " | " + lastTimeRegister + " | " + lastRegisterType;
    }
    dialogHora.textContent = "Hora: " + getCurrentTime();

    let interval = setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentTime();
    }, 1000);

    console.log(interval);

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

updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getWeekDay());
console.log(getCurrentDate());
console.log(getCurrentTime());