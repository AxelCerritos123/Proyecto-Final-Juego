//Variables
const modo = document.getElementById("modoSeleccionado");
const turnoActual = document.getElementById("turnoActual");
const mensajeResultado = document.getElementById("mensajeResultado");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnCambiarModo = document.getElementById("btnCambiarModo");
const finJuego = document.getElementById("finJuego");
const finJuego_result = document.getElementById("finJuego_result");
const btnFinJuego = document.getElementById("btnFinJuego");
const btnMenu = document.getElementById("btnMenu");
const urlParams = new URLSearchParams(window.location.search);

let victoriasJugador1 = document.getElementById("victoriasJ1");
let victoriasJugador2 = document.getElementById("victoriasJ2");
let empates = document.getElementById("empates");

const tablero = document.getElementById("tablero");

let modoCambiar = urlParams.get("modo");
let jugador1Avatar = decodeURIComponent(urlParams.get("jugador1"));
let jugador2Avatar = decodeURIComponent(urlParams.get("jugador2"));


//Turno del jugador
let turnoJugador1 = true;

if (turnoJugador1){
  turnoActual.textContent = "Jugador 1"
} else{
  turnoActual.textContent = "Jugador 2"  
}


//Contadores
let victoriasJ1 = 0;
let victoriasJ2 = 0;
let Empates = 0;
let Turno = 0;
let maxTurno = 9;


//Posiciones ganadoras
const posicionesGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];


//Creacion del tablero
crearTablero();

function crearTablero(){
  const celdas = 9;

  while (tablero.firstElementChild){
    tablero.firstElementChild.remove();
  }

  for (let i = 0; i < celdas; i++){
    const divCeldas = document.createElement("div");
    divCeldas.classList.add("celdas");
    divCeldas.addEventListener("click", manejoTablero, {once:true})

    tablero.append(divCeldas);
  }
}

function manejoTablero(evento){
  const celda = evento.target;
  const img = document.createElement("img");
  img.src = turnoJugador1 ? jugador1Avatar : jugador2Avatar;
  img.classList.add("avatar-magia");
  celda.appendChild(img);
  Turno++;
  console.log(Turno);

  jugadorActual = turnoJugador1 ? "Jugador 1" : "Jugador 2";

  Ganador(jugadorActual);

  turnoJugador1 = !turnoJugador1;
  turnoActual.textContent = jugadorActual;
}


//Verificar ganador
function Ganador(jugadorActual){
  const celdas = Array.from(tablero.children);

  for (const combinacion of posicionesGanadoras) {
    const [a, b, c] = combinacion;

    const imgA = celdas[a].querySelector("img");
    const imgB = celdas[b].querySelector("img");
    const imgC = celdas[c].querySelector("img");

    if (
      imgA && imgB && imgC &&
      imgA.src === imgB.src && imgB.src === imgC.src
    ) {

      mensajeResultado.textContent = `${jugadorActual} ha ganado 🎉`;

      if (jugadorActual === "Jugador 1") {
        victoriasJ1++;
        victoriasJugador1.textContent = victoriasJ1;

        MostrarFinJuego(true);
      } else {
        victoriasJ2++;
        victoriasJugador2.textContent = victoriasJ2;
        MostrarFinJuego(true);
      }

      tablero.style.pointerEvents = "none";
      return;
    }
  }

  
  //Verificacion de maximos intentos
  if (Turno === maxTurno){
    mensajeResultado.textContent = "¡Es un empate!";
    Empates++;
    MostrarFinJuego(false);
    empates.textContent = Empates;
    tablero.style.pointerEvents = "none";
  }
}


//Reiniciar juego
btnReiniciar.addEventListener("click", ()=>{
  crearTablero();

  turnoJugador1 = true;
  turnoActual.textContent = "Jugador 1";

  mensajeResultado.textContent = "";

  Turno = 0;

  tablero.style.pointerEvents = "auto";

  victoriasJ1 = 0;
  victoriasJ2 = 0;
  Empates = 0;

  victoriasJugador1.textContent=victoriasJ1;
  victoriasJugador2.textContent=victoriasJ2;
  empates.textContent=Empates;
})


btnCambiarModo.addEventListener("click", ()=>{
  window.location.href = "modo.html";
})

//Mostar Resultado
function MostrarFinJuego(comprobador){
    finJuego.classList.add('mostrar');

    if(comprobador){
        finJuego_result.textContent = `¡${turnoJugador1 ? "Jugador 1" : "Jugador 2"} ha ganado el juego!`;
    }else{
        finJuego_result.textContent = `¡El juego se ha empatado!`;
    }
}

btnFinJuego.addEventListener("click", ()=>{
  crearTablero();

  turnoJugador1 = true;
  turnoActual.textContent = "Jugador 1";

  mensajeResultado.textContent = "";

  Turno = 0;

  tablero.style.pointerEvents = "auto";
})

btnFinJuego.addEventListener("click", () => {
  finJuego.classList.remove("mostrar");
});

btnMenu.addEventListener("click", () => {
  finJuego.classList.remove("mostrar");
  window.location.href = "index.html";
});