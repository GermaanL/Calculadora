
const resultado = document.querySelector('#resultado')
const botones = document.querySelector('#botones')

let resultadoEnPantalla = resultado.textContent

const operaciones = [
    "suma",
    "resta",
    "multiplicacion",
    "division"
]
const acciones = [
    "igual",
    "limpiar",
    "limpiarTodo",
    "del"
]

let operando1="";
let operando2="";
let operador="";
let resultadoOperacion="";

// Evento de teclado
document.addEventListener("keydown", function(event) {
    // Obtener el carácter correspondiente a la tecla presionada
    const tecla = event.key;

    // Si la tecla presionada es un número, un operador válido o la tecla Backspace, actualizar el resultado
    if(/[0-9+\-*/.ac=]|Backspace|Enter/.test(tecla)) {
        // Obtener el elemento de botón correspondiente a la tecla presionada
        const boton = document.querySelector(`button[data-tecla="${tecla}"]`);
        if (boton) {
            boton.classList.add("tecla-presionada");
            operacionDeTeclado(tecla); // Llamar a la función que maneja la operación matemática
        }
    }
});

document.addEventListener("keyup", function(event) {
    // Obtener el carácter correspondiente a la tecla presionada
    const tecla = event.key;

    // Obtener el botón correspondiente a la tecla presionada
    const boton = document.querySelector(`button[data-tecla="${tecla}"]`);

    // Si se encuentra el botón, eliminar la clase de estilo de resaltado
    if (boton) {
        boton.classList.remove("tecla-presionada");
    }
});

// Evento de clic en los botones
botones.addEventListener("click", function(e) {
    const boton = e.target;

    if(resultado.textContent.includes("ERROR")) {
        limpiar();
    }

    if(boton.matches("button")) {
        if(acciones.includes(boton.id)) {            
            if(resultado.textContent == resultadoOperacion) {
                operando1 = resultado.textContent;
            } else {
                operando2 = resultado.textContent;
            }
            accionar(boton.id);
        }
        else if(operaciones.includes(boton.id)) {
            
            if(resultado.textContent == resultadoOperacion) {
                operando1 = resultadoOperacion;
            } else {
                operando1 = resultado.textContent;
            }
            operador = boton.id;
            limpiar();
        }
        else {
            if(resultado.textContent == resultadoOperacion) {
                limpiar();
                resultado.textContent = boton.textContent;
            }
            else 
                resultado.textContent += boton.textContent;
        }
    }
});

function operacionDeTeclado(tecla) {
    const boton = document.querySelector(`button[data-tecla="${tecla}"]`);
    if (boton) {
        boton.click(); // Simular un clic en el botón
    }
}

function accionar(accion) {
    if(accion === "igual") 
        operar(operador, operando1, operando2)
    else if (accion === "limpiar")
        limpiar();
    else if( accion === "limpiarTodo")
        limpiarTodo();
    else if( accion === "del")
        borrar();
}

function operar(operador, operando1, operando2) {
    // console.log("num1 = " + operando1 +"\nnum2 = " + operando2)

    // console.log(operando1 + " " + obtenerOperador(operador) + " " + operando2)
    
    if(operador ==="" || operando1 ==="" || operando2 ===""){
        resultado.textContent = "ERROR"
        return;
    } else if(!esNumeroDecimal(operando1) || !esNumeroDecimal(operando2)){
        resultado.textContent = "Numero inválido"
    }
    else {

        const num1 = parseFloat(operando1);
        const num2 = parseFloat(operando2);
        
        if(operador === "suma")
            resultado.textContent = num1 + num2
        else if( operador === "resta")
            resultado.textContent = num1 - num2
        else if( operador === "multiplicacion")
            resultado.textContent = num1 * num2
        else if( operador === "division") 
            if(num2 == 0)
                resultado.textContent = "MATH ERROR"
            else
                resultado.textContent = num1 / num2
        
        const resultadoElemento = document.createElement("li");
        resultadoElemento.innerHTML = operando1 + " " + obtenerOperador(operador) + " " + operando2 + " = " + resultado.textContent;
        resultadoElemento.classList.add("resultadosObtenidos")
        document.querySelector("#resultados").appendChild(resultadoElemento);
    
        resultadoOperacion = resultado.textContent;
    }
}

function esNumeroDecimal(valor) {
    // Expresión regular para validar números decimales
    const regex = /^-?\d*\.?\d*$/;
    return regex.test(valor);
}

function limpiar() {
    resultado.textContent = "";
}

function borrar() {
    resultado.textContent = resultado.textContent.slice(0, -1);
}

function limpiarTodo() {
    const resultados = document.querySelector('#resultados');
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild);
    }
    limpiar();
}

function obtenerOperador(op) {
    if(operador === "suma")
        return '+'
    else if( operador === "resta")
        return '-'
    else if( operador === "multiplicacion")
        return 'x'
    else if( operador === "division") 
        return '/'
}