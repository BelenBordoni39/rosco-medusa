const questions = [

{
letter:"M",
answer:"medusa",
question:"Personaje central del mito, famosa por su cabello de serpientes.",
info:"Una de las tres Gorgonas."
},
{
letter:"A",
answer:"atenea",
question:"Diosa que castigó a Medusa.",
info:"Diosa griega de la sabiduría."
},
{
letter:"P",
answer:"perseo",
question:"Héroe que derrotó a Medusa.",
info:"Hijo de Zeus."
},
{
letter:"G",
answer:"gorgona",
question:"Tipo de criatura mitológica a la que pertenecía Medusa.",
info:"Seres monstruosos de la mitología griega."
},
{
letter:"E",
answer:"escudo",
question:"Objeto reflectante utilizado por Perseo.",
info:"Le permitió verla sin mirarla directamente."
},
{
letter:"S",
answer:"serpientes",
question:"Animales que formaban el cabello de Medusa.",
info:"Su rasgo más característico."
},
{
letter:"T",
answer:"templo",
question:"Lugar sagrado relacionado con el castigo de Medusa.",
info:"Consagrado a Atenea."
},
{
letter:"O",
answer:"olimpo",
question:"Montaña donde vivían los dioses griegos.",
info:"Hogar de los dioses."
},
{
letter:"I",
answer:"isla",
question:"Lugar donde vivía Medusa según muchas versiones.",
info:"Alejada del mundo humano."
},
{
letter:"R",
answer:"roca",
question:"Lo que parecían las víctimas petrificadas por Medusa.",
info:"Quedaban inmóviles para siempre."
},
{
letter:"H",
answer:"heroe",
question:"Tipo de personaje que era Perseo.",
info:"Protagonista de grandes hazañas."
},
{
letter:"F",
answer:"furia",
question:"Sentimiento que motivó el castigo de Atenea.",
info:"Ira intensa."
},
{
letter:"D",
answer:"decapitacion",
question:"Forma en que Perseo venció a Medusa.",
info:"Le cortó la cabeza."
},
{
letter:"C",
answer:"cabeza",
question:"Parte del cuerpo conservada por Perseo.",
info:"Seguía teniendo poderes."
},
{
letter:"N",
answer:"ninfa",
question:"Lo que era Medusa antes de ser transformada.",
info:"Una hermosa joven."
},
{
letter:"L",
answer:"leyenda",
question:"Tipo de relato al que pertenece el mito de Medusa.",
info:"Historia transmitida durante generaciones."
},
{
letter:"B",
answer:"bronce",
question:"Material frecuentemente asociado al escudo de Perseo.",
info:"Metal utilizado en Grecia."
},
{
letter:"V",
answer:"venza",
question:"Forma verbal: que Perseo ______ a Medusa.",
info:"Derrotar."
}
];

let current = 0;
let timer = 120;
let interval;

let correct = 0;
let wrong = 0;

function createRosco(){

const rosco = document.getElementById("rosco");
rosco.innerHTML = "";

const total = questions.length;
const radius = 210;

questions.forEach((item,index)=>{

const angle = (index/total)*2*Math.PI;

const x = radius*Math.cos(angle);
const y = radius*Math.sin(angle);

const div = document.createElement("div");

div.classList.add("letter");
div.id = "letter-"+index;
div.innerText = item.letter;

div.style.left=(225+x)+"px";
div.style.top=(225+y)+"px";

rosco.appendChild(div);

});
}

createRosco();

function showQuestion(){

document.querySelectorAll(".letter")
.forEach(el=>el.classList.remove("active"));

const active = document.getElementById("letter-"+current);

if(active)
active.classList.add("active");

document.getElementById("letter").innerText =
questions[current].letter;

document.getElementById("question").innerText =
questions[current].question;
}

function startGame(){

clearInterval(interval);

current = 0;
correct = 0;
wrong = 0;
timer = 120;

document.getElementById("correct").innerText = 0;
document.getElementById("wrong").innerText = 0;

showQuestion();

interval = setInterval(()=>{

timer--;

document.getElementById("time").innerText = timer;

if(timer<=0){
finishGame();
}

},1000);

speakQuestion();
}

function speakQuestion(){

const text =
document.getElementById("question").innerText;

speechSynthesis.cancel();

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "es-AR";

speechSynthesis.speak(speech);
}

function listenAnswer(){

const SR =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SR){

alert("Reconocimiento de voz no disponible.");
return;
}

const recognition = new SR();

recognition.lang = "es-AR";

recognition.start();

recognition.onresult = function(event){

const answer =
event.results[0][0].transcript
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");

const correctAnswer =
questions[current].answer;

if(answer.includes(correctAnswer)){

correct++;

document.getElementById("correct").innerText = correct;

document.getElementById("feedback").innerHTML =
"✅ Correcto<br>"+questions[current].info;

document.getElementById("letter-"+current)
.classList.add("correct");

}else{

wrong++;

document.getElementById("wrong").innerText = wrong;

document.getElementById("feedback").innerHTML =
"❌ Incorrecto<br>Respuesta: "+correctAnswer;

document.getElementById("letter-"+current)
.classList.add("wrong");
}

nextQuestion();
};
}

function passQuestion(){
nextQuestion();
}

function nextQuestion(){

current++;

if(current>=questions.length){
finishGame();
return;
}

showQuestion();
}

function finishGame(){

clearInterval(interval);

document.getElementById("question").innerHTML =
`
🏆 Juego terminado

Aciertos: ${correct}<br>
Errores: ${wrong}<br>
Tiempo restante: ${timer}s
`;

speechSynthesis.cancel();
  }

document
.getElementById("startBtn")
.addEventListener("click",()=>{

document
.getElementById("welcome-screen")
.style.display="none";

startGame();

});
