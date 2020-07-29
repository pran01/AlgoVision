let bars=document.querySelector(".bars");
let sortbtn=document.querySelector("#sortbtn");
let sort=document.querySelector("#sort");
let chosen=document.querySelector("#chosen");

//creating an empty array off length 40
for (var a=[],i=0;i<40;++i) a[i]=i;

//http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
    }
    return array;
}

function heightwise(num){
    return (num/40)*100;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getAlgo(name){
    let group=document.getElementsByName(name);
    for(let i=0;i<group.length;i++){
        if(group[i].checked)
            return group[i].value;
    }
    return null;
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

a = shuffle(a);
a=a.map(heightwise);
let a_copy=[...a];
let sorted=a.sort(function(a,b){return a-b;});
a=[...a_copy];

//adding bars to the div(#bars)
for (let i=0;i<a.length;i++){
    let bar=document.createElement("div");
    bar.style=`height: ${a[i]}%;width:${33/40}em;background:#8ee4af;margin:0.2em;float:left;`;
    bar.classList.add(`bar${i}`);
    bar.innerHTML=`<span style="font-size:0.8em;">${(a[i]/100)*40}</span>`;
    bars.appendChild(bar);
}

sortbtn.addEventListener("click",()=>startSorting(),false);

function startSorting(){
    let Algo=getAlgo('SortAlgos');
    if (Algo=="Insertion"){
        insertionSort();
    }
    else if(Algo=="Selection"){
        selectionSort();
    }
    else if(Algo=="Bubble"){
        bubbleSort();
    }
    else if(Algo==null){
        chosen.style.color="#d80702";//red
        chosen.innerHTML="Please Choose an algorithm first.";
    }
}
