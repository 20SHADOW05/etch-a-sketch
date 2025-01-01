const container_size = 550;
let gridSize = 36;
let boxes = [];
let colorValue = '#000000';

const container = document.querySelector(".container"); // needed this to reset the grid, thats why moved out of the createGrid function
const checkbox = document.getElementById("border"); 

function createGrid(gridSize){ 
    // couldn't resolve a bug related to the interaction between checkbox and grid regeneration.so had to uncheck the checkbox after every regeneration
    checkbox.checked = false;
    for(let i=0; i<gridSize*gridSize; i++){
        boxes[i] = document.createElement("div");
        boxes[i].classList.add("cell");
        boxes[i].style.width = (container_size/gridSize)+"px";
        boxes[i].style.height = (container_size/gridSize)+"px";
        boxes[i].style.boxSizing = "border-box";  
        container.appendChild(boxes[i]);
    }
}

createGrid(gridSize);

function gridReset(){
    container.innerHTML = "";
}

const generate = document.querySelector(".generate");
const dimensionInput = document.querySelector("#dimension");

generate.addEventListener("click",() => {  // value checking 
    if (dimensionInput.value == "") {
        console.log("didn't enter any value");
    }
    else if(dimensionInput.value>0 && dimensionInput.value<=64){
        gridReset();
        console.log(dimensionInput.value);
        gridSize = dimensionInput.value;
        createGrid(gridSize);
    }
    else{
        console.log("No, can't accept that value");
    }
})

checkbox.addEventListener("change",() => {  //for borders
    if(checkbox.checked){
        for(let i=0; i<gridSize*gridSize; i++){
            boxes[i].style.border = "1px solid #d1d5db";
        }
    }
    else{
        for(let i=0; i<gridSize*gridSize; i++){
            boxes[i].style.border = "none";
        }
    }
})

const color = document.getElementById("color"); 
color.addEventListener("change",() => {
    colorValue = color.value;
    console.log(color.value);
})


//  ==> ``EVENT DELEGATION``
// container.addEventListener("mouseover",(event_object) => {
//     if(event_object.target.matches(".cell")){ 
//         event_object.target.style.backgroundColor = colorValue;
//     }
// })


// a seperate function that accepts a `type of event` , `selector that should match` , `parent which is a DOM object/node` and a `callback function`.
function Global_Event(type , selector , parent , callback){
    parent.addEventListener(type,(event_object) => {
        if(event_object.target.matches(selector)){ 
            callback(event_object);
        }
    })
}

Global_Event("mouseover",".cell", container , (event_object) => {
    event_object.target.style.backgroundColor = colorValue;
})

color.addEventListener("click",() => {
    Global_Event("mouseover",".cell", container , (event_object) => {
        event_object.target.style.backgroundColor = colorValue;
    })
})

const clear_canvas = document.querySelector(".clear");
clear_canvas.addEventListener("click", () => {
   for(let i=0; i<gridSize*gridSize; i++){
    boxes[i].style.backgroundColor = "white";
   }
})

let v1,v2,v3,R_color,max;
max = 255;

function colorGenerate(){ // for generating random rgb color 

    v1 = Math.floor(Math.random()*max);
    v2 = Math.floor(Math.random()*max);
    v3 = Math.floor(Math.random()*max);
    
    return `rgb(${v1} , ${v2} , ${v3})`;
}

R_color = colorGenerate();
console.log(R_color);

const r_mode = document.querySelector(".random");
r_mode.addEventListener("click",() => {
        Global_Event("mouseover",".cell", container , (event_object) => {
            R_color = colorGenerate();
            event_object.target.style.backgroundColor = R_color;
        })
})