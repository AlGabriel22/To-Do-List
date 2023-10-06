const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'bi-check-circle';
const uncheck = 'bi-circle';
const lineThrough = 'line-through';

let LIST  //almacenamos toda la informacion en el array LIST
let id  // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 
const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-AR',{weekday: 'long', month: 'short', day:'numeric'});


// funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    
    if(eliminado){return}
    const REALIZADO = realizado ?check :uncheck;
    const LINE = realizado ? lineThrough :'';

    const elemento = `<li id="elemento">
                        <i class="bi ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text" ${LINE}>${tarea}</p>
                        <i class="bi bi-trash" data="eliminado" id="${id}"></i>
                     </li>`
    lista.insertAdjacentHTML("beforeend",elemento);                
}


// funcion de tareaRealizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}


// funcion de tareaEliminada
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

// crear un evento para escuchar el enter y para habilitar el boton
botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea,id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''   
    }
})

// Agregar tarea mediante la tecla Enter
document.addEventListener('keyup', function(event){
    if(event.key == 'Enter') {
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
            localStorage.setItem('TODO',JSON.stringify(LIST))
            id++
            input.value = ''; 
        }   
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    console.log(elementData)

    if(elementData == 'realizado'){
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado'){
        tareaEliminada(element)
        console.log("eliminado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

// localstorage get data
let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(array){
    array.forEach(function(item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
    });
}