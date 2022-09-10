//variables
let tarjetasdespatadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 20;
let timerinicial = 20;
let tiemporegresivoid = null;

//Apunta a documento html
let mostrarmovimientos = document.getElementById('Movimientos');
let mostraraciertos = document.getElementById('Aciertos');
let mostrartiempo = document.getElementById('t-restante');


//arreglo numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=> {return Math.random()-0.5});

function contartiempo(){
    tiemporegresivoid = setInterval(()=>{
        timer --;
        mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiemporegresivoid);
            bloqueartarjetas();
        }
    },1000)
}

function bloqueartarjetas(){
    for (let i = 0; i < 15; i++){
        let tarjetabloqueada = document.getElementById(i);
        tarjetabloqueada.innerHTML = numeros[i];
        tarjetabloqueada.disabled = true;
    }
}


//Principal
function destapar(id){

    if(temporizador == false){
        contartiempo();
        temporizador = true;
    }

    tarjetasdespatadas++;
    if(tarjetasdespatadas == 1){
        //muestra primer numero
        tarjeta1 = document.getElementById(id);
        primerresultado = numeros[id];
        tarjeta1.innerHTML = primerresultado;

        //desabilita el primer boton
        tarjeta1.disabled = true;

    }else if (tarjetasdespatadas == 2){
        //muestra segundo numero
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        tarjeta2.innerHTML = segundoresultado;

        //desabilita el segundo boton
        tarjeta2.disabled = true;

        //incrementa movimientos
            movimientos++;
            mostrarmovimientos.innerHTML =  `Movimientos: ${movimientos}`;

        if (primerresultado == segundoresultado){
            //cerrar tarjetas destapadas
            tarjetasdespatadas = 0;

            //aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos: ${aciertos}`; 
            
            if(aciertos == 8){
                clearInterval(tiemporegresivoid);
                mostrartiempo.innerHTML = `Fantástico, tienes un nuevo record: ${timerinicial-timer} segundos`;
            }

        }else{
            // volver a tapar valores
            setTimeout(() =>{
                tarjeta1.innerHTML ='';
                tarjeta2.innerHTML ='';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdespatadas = 0;
            },800);
        }
    }

}