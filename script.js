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
question:"Tipo de criatura mitológica es Medusa.",
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
question:"Lugar sagrado donde es castigada Medusa.",
info:"Consagrado a Atenea."
},
{
letter:"O",
answer:"olimpo",
question:"Montaña donde vivían los dioses griegos.",
info:"Hogar de los dioses."
},
{
letter:"R",
answer:"roca",
question:"De lo que parecían estar hechas las víctimas petrificadas por Medusa.",
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
question:"Forma en la que Perseo venció a Medusa.",
info:"Le cortó la cabeza."
},
{
letter:"C",
answer:"cabeza",
question:"Parte del cuerpo conservada por Perseo.",
info:"Seguía teniendo poderes."
},
{
letter:"H",
answer:"hoz",
question:"¿Con que cortó Persep la cabeza de Meduza?.",
info:"Regalo de Hermes."
},
{
letter:"Z",
answer:"zeus",
question:"¿De quién es hijo Perceo?",
info:"Dios del Olimpo."
},
{
letter:"I",
answer:"invicibilidad",
question:"¿Que poder daba a Perceo el casco que le regalo Hades?",
info:"No ser visto."
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
question:"Material de que estaba hecho el escudo de Perseo.",
info:"Metal utilizado en Grecia."
},
{
letter:"V",
answer:"volando",
question:"¿Como se acerco Perseo a Medusa sin hacer ruido?.",
info:"Aire."
}
];

```javascript
let current = 0;
let timer = 120;
let interval;

let correct = 0;
let wrong = 0;

/* SONIDOS */

function playSuccessSound() {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(
        900,
        audioCtx.currentTime + 0.15
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

function playErrorSound() {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";

    osc.frequency.setValueAtTime(250, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(
        120,
        audioCtx.currentTime + 0.25
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

/* ROSCO */

function createRosco(){

    const rosco = document.getElementById("rosco");

    rosco.innerHTML = "";

    const total = questions.length;

    const radius =
        window.innerWidth < 700
        ? 135
        : 210;

    const center =
        window.innerWidth < 700
        ? 170
        : 225;

    questions.forEach((item,index)=>{

        const angle =
            (index/total) * 2 * Math.PI;

        const x =
            radius * Math.cos(angle);

        const y =
            radius * Math.sin(angle);

        const div =
            document.createElement("div");

        div.classList.add("letter");

        div.id =
            "letter-" + index;

        div.innerText =
            item.letter;

        div.style.left =
            (center + x) + "px";

        div.style.top =
            (center + y) + "px";

        rosco.appendChild(div);

    });

}

createRosco();

window.addEventListener(
    "resize",
    createRosco
);

/* PREGUNTAS */

function showQuestion(){

    document
    .querySelectorAll(".letter")
    .forEach(el =>
        el.classList.remove("active")
    );

    const active =
        document.getElementById(
            "letter-" + current
        );

    if(active){
        active.classList.add("active");
    }

    document.getElementById("letter")
    .innerText =
    questions[current].letter;

    document.getElementById("question")
    .innerText =
    questions[current].question;

}

/* CRONÓMETRO */

function startGame(){

    clearInterval(interval);

    current = 0;
    timer = 120;
    correct = 0;
    wrong = 0;

    document.getElementById("correct")
    .innerText = 0;

    document.getElementById("wrong")
    .innerText = 0;

    document.getElementById("feedback")
    .innerHTML = "";

    createRosco();

    showQuestion();

    speakQuestion();

    interval = setInterval(()=>{

        timer--;

        document.getElementById("time")
        .innerText = timer;

        if(timer <= 0){
            finishGame();
        }

    },1000);

}

/* VOZ */

function speakQuestion(){

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(
            document.getElementById(
                "question"
            ).innerText
        );

    speech.lang = "es-AR";

    speechSynthesis.speak(speech);

}

function listenAnswer(){

    const SR =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if(!SR){

        alert(
            "Tu navegador no soporta reconocimiento de voz."
        );

        return;

    }

    const recognition =
        new SR();

    recognition.lang = "es-AR";

    recognition.start();

    recognition.onresult = function(event){

        const answer =
            event.results[0][0]
            .transcript
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"");

        const correctAnswer =
            questions[current]
            .answer;

        const isCorrect =
            answer.includes(correctAnswer) ||
            correctAnswer.includes(answer);

        if(isCorrect){

            playSuccessSound();

            correct++;

            document.getElementById("correct")
            .innerText = correct;

            document.getElementById("feedback")
            .innerHTML =
            "✅ Correcto<br>" +
            questions[current].info;

            document.getElementById(
                "letter-" + current
            ).classList.add("correct");

        }else{

            playErrorSound();

            wrong++;

            document.getElementById("wrong")
            .innerText = wrong;

            document.getElementById("feedback")
            .innerHTML =
            "❌ Incorrecto<br>Respuesta: " +
            correctAnswer;

            document.getElementById(
                "letter-" + current
            ).classList.add("wrong");

        }

        nextQuestion();

    };

}

/* NAVEGACIÓN */

function passQuestion(){

    nextQuestion();

}

function nextQuestion(){

    current++;

    if(current >= questions.length){

        finishGame();

        return;

    }

    showQuestion();

    speakQuestion();

}

/* FINAL */

function finishGame(){

    clearInterval(interval);

    speechSynthesis.cancel();

    let medal = "🥉";

    if(correct >= 15){
        medal = "🥇";
    }
    else if(correct >= 10){
        medal = "🥈";
    }

    document.getElementById("question")
    .innerHTML = `
        <div style="font-size:2.5rem;">
            ${medal}
        </div>

        <h2>Juego terminado</h2>

        <p>✅ Aciertos: ${correct}</p>

        <p>❌ Errores: ${wrong}</p>

        <p>⏱️ Tiempo restante: ${timer}s</p>
    `;

    document.getElementById("feedback")
    .innerHTML = "";

}

/* INICIO */

document
.getElementById("startBtn")
.addEventListener("click",()=>{

    document
    .getElementById("welcome-screen")
    .style.display = "none";

    startGame(
    document
.querySelectorAll(".letter")
.forEach(el=>{
    el.classList.remove(
        "correct",
        "wrong",
        "active"
    );
}););

});
```
