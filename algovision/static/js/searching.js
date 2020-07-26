let searching=document.querySelector(".searching");
let searchbtn=document.querySelector("#searchbtn");
let search=document.querySelector("#search");
let chosen=document.querySelector("#chosen");

for (var a=[],i=0;i<40;++i) a[i]=i;

// http://stackoverflow.com/questions/962802#962890
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


a = shuffle(a);
a=a.map(heightwise);
let a_copy=[...a];
let sorted=a.sort(function(a,b){return a-b;});
a=[...a_copy];


let blockHeight=50;
let width=50-0.4*40

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

for (let i=0;i<a.length;i++){
    let bar=document.createElement("div");
    bar.style=`height: ${a[i]}%;width:${33/40}em;background:#8ee4af;margin:0.2em;float:left;`;
    bar.classList.add(`bar${i}`);
    bar.innerHTML=`<span style="font-size:0.8em;">${(a[i]/100)*40}</span>`;
    searching.appendChild(bar);
}

searchbtn.addEventListener("click",()=>StartSearching(),false);

function StartSearching(){
    let num=document.querySelector("#ToSearch");
    let num_range=document.querySelector('#ToSearchRange');
    num_range.style.color="Black";
    let x;
    if(num.value){
        x=num.value;
        if(x>39||x<1){
            num_range.style.color="#d80702";//red
            return ;
        }
    }
    else{
        x=randomIntFromInterval(1,39);
        num.value=x;
    }
    let Algo=getAlgo('SearchAlgos');
    if (Algo=="Sequential"){
        sequentialSearch(x);
    }
    else if(Algo=="Binary"){
        binarySearch(x);
    }
    else if(Algo=="Interpolation"){
        interPolationSearch(x);
    }
    else if(Algo==null){
        chosen.style.color="#d80702";//red
        chosen.innerHTML="Please Choose an algorithm first.";
    }
}

async function sequentialSearch(x){
    searching.innerHTML=" ";
    for (let i=0;i<a.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${a[i]}%;width:${33/40}em;background:#8ee4af;margin:0.2em;float:left`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.8em;">${(a[i]/100)*40}</span>`;
        searching.appendChild(bar);
    }
    await sleep(500);
    chosen.style.color="black";
    chosen.innerHTML=`Searching for ${x} with Sequential Search...`;
    for(let i=0;i<a.length;i++){
        let current_bar=document.querySelector(`.bar${i}`);
        current_bar.style.backgroundColor="#f866ae";//pink
        if(a[i]==(x/40)*100){
            await sleep(250);
            current_bar.style.backgroundColor="#05386b";//blue
            break;
        }
        else{
            await sleep(250);
            current_bar.style.backgroundColor="#d80702";//red
            await sleep(250);
            current_bar.style.backgroundColor="#8ee4af";//original
            continue;
        }
    }
}

async function binarySearch(x){
    searching.innerHTML=" ";
    for (let i=0;i<sorted.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${sorted[i]}%;width:${33/40}em;background:#8ee4af;margin:0.2em;float:left`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.8em;">${(sorted[i]/100)*40}</span>`;
        searching.appendChild(bar);
    }
    chosen.style.color="black";
    chosen.innerHTML=`Searching for ${x} with Binary Search...`;
    let start=0, end=sorted.length-1; 
    while (start<=end){ 
        let start_bar=document.querySelector(`.bar${start}`);
        let end_bar=document.querySelector(`.bar${end}`);
        start_bar.style.backgroundColor="#f7e800";//yellow
        end_bar.style.backgroundColor="#f7e800";//yellow
        await sleep(1000);
        let mid=Math.floor((start + end)/2);
        let mid_bar=document.querySelector(`.bar${mid}`);
        mid_bar.style.backgroundColor="#f866ae";//pink
        await sleep(250);
        if (sorted[mid]==(x/40)*100){
            mid_bar.style.backgroundColor="#05386b";//blue
            if(start!=mid){start_bar.style.backgroundColor="#8ee4af";}//original
            if(end!=mid){end_bar.style.backgroundColor="#8ee4af";}//original
            break;
        } 
        else if (sorted[mid] < (x/40)*100){
            mid_bar.style.backgroundColor="#d80702"//red;
            start = mid + 1;
            await sleep(250);
            mid_bar.style.backgroundColor="#8ee4af"//original;
        }
        else{
            mid_bar.style.backgroundColor="#d80702"//red;
            end = mid - 1;
            await sleep(250);
            mid_bar.style.backgroundColor="#8ee4af"//original;
        }
        start_bar.style.backgroundColor="#8ee4af"//original;
        end_bar.style.backgroundColor="#8ee4af"//original;
    }
}

async function interPolationSearch(x){
    searching.innerHTML=" ";
    for (let i=0;i<sorted.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${sorted[i]}%;width:${33/40}em;background:#8ee4af;margin:0.2em;float:left`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.8em;">${(sorted[i]/100)*40}</span>`;
        searching.appendChild(bar);
    }
    chosen.style.color="black";
    chosen.innerHTML=`Searching for ${x} with Interpolation Search...`;
    let lo=0,hi=(sorted.length)-1;
    while ((lo<=hi)&&((x/40)*100>=sorted[lo])&&((x/40)*100<=sorted[hi])){
        let lo_bar=document.querySelector(`.bar${lo}`);
        let high_bar=document.querySelector(`.bar${hi}`);
        lo_bar.style.backgroundColor="#f7e800";//yellow
        high_bar.style.backgroundColor="#f7e800";//yellow
        await sleep(500);
        if(lo==hi){
            lo_bar.style.backgroundColor="#f866ae";//pink
            await sleep(500);
            if(sorted[lo]==(x/40)*100){
                lo_bar.style.backgroundColor="#05386b";//blue
                high_bar.style.backgroundColor="#8ee4af";//original
                await sleep(500);
                break;
            }
            else{
                lo_bar.style.backgroundColor="#8ee4af";//original
                high_bar.style.backgroundColor="#8ee4af";//original
                await sleep(500);
                break;
            }
        }
        let pos=Math.floor(lo + (((hi-lo)/(sorted[hi]-sorted[lo]))*((x/40)*100 - sorted[lo])));
        let pos_bar=document.querySelector(`.bar${pos}`);
        pos_bar.style.backgroundColor="#f866ae";
        await sleep(500);
        if(sorted[pos]==(x/40)*100){
            pos_bar.style.backgroundColor="#05386b";//blue
            lo_bar.style.backgroundColor="#8ee4af";//original
            high_bar.style.backgroundColor="#8ee4af";//original
            await sleep(500);
            break;
        }
        else if (sorted[pos]>(x/40)*100){
            pos_bar.style.backgroundColor="#8ee4af";//original
            await sleep(500);
            hi=pos-1;
        }
        else{
            pos_bar.style.backgroundColor="#8ee4af";//original
            lo=pos+1;
            await sleep(500);
        }
        lo_bar.style.backgroundColor="#8ee4af";//original
        high_bar.style.backgroundColor="#8ee4af";//original
        await sleep(500);
    }
}