let bars=document.querySelector(".bars");
let sortbtn=document.querySelector("#sortbtn");
let sort=document.querySelector("#sort");
let chosen=document.querySelector("#chosen");
let resetBtn=document.querySelector("#resetBtn");

let slider = document.querySelector("#sortSpeed");
let speed=300-(slider.value-50);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    speed = 300-(this.value-50);
    console.log(speed);
}

//creating an empty array off length 40
for (var a=[],i=0;i<35;++i) a[i]=i+1;

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
    return (num/35)*100;
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
a_height=a.map(heightwise);
// let sorted=a.sort(function(a,b){return a-b;});
// a=[...a_copy];


//adding bars to the div(#bars)
for (let i=0;i<a_height.length;i++){
    let bar=document.createElement("div");
    bar.style=`height: ${(a[i]/35)*100}%;width:${33/40}em;background:#8ee4af;margin:0em 0.285em;float:left;`;
    bar.classList.add(`bar${i}`);
    bar.innerHTML=`<span style="font-size:0.8em;">${(a[i])}</span>`;
    bars.appendChild(bar);
}

resetBtn.addEventListener("click",()=>resetArray(),false);

function resetArray(){
    bars.innerHTML="";
    a=shuffle(a);
    for (let i=0;i<a.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a[i]/35)*100}%;width:${33/40}em;background:#8ee4af;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.8em;">${(a[i])}</span>`;
        bars.appendChild(bar);
    }
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

async function insertionSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#8ee4af;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.8em;">${(a_copy[i])}</span>`;
        bars.appendChild(bar);
    }
    let n=a_copy.length;
    for(let i=1;i<n;i++){
        let key=a_copy[i];
        chosen.style.color="black";
        chosen.innerHTML=`Picked ${key}!`;
        let keyBar=document.querySelector(`.bar${i}`);
        keyHeight=keyBar.style.height;
        keyBar.style.backgroundColor="Pink";
        await sleep(speed);
        let j=i-1;
        while(j>=0 && a_copy[j]>key){
            chosen.style.color="black";
            chosen.innerHTML=`Finding the correct place for ${key}...`;
            let jBar=document.querySelector(`.bar${j}`);
            let j1Bar=document.querySelector(`.bar${j+1}`);
            a_copy[j+1]=a_copy[j];
            j1Bar.style.height=jBar.style.height;
            j1Bar.innerHTML=jBar.innerHTML;
            jBar.style.backgroundColor="yellow";
            await sleep(speed);
            jBar.style.backgroundColor="#8ee4af";
            j-=1;
        }
        chosen.style.color="black";
        chosen.innerHTML=`Found and inserted`;
        keyBar.style.backgroundColor="#8ee4af";
        j1Bar=document.querySelector(`.bar${j+1}`);
        a_copy[j+1]=key;
        j1Bar.style.height=keyHeight;
        j1Bar.style.backgroundColor="Pink";
        j1Bar.innerHTML=`<span style="font-size:0.8em;">${key}</span>`;
        await sleep(speed+100);
        j1Bar.style.backgroundColor="#8ee4af";
    }
}
