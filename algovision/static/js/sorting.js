let bars=document.querySelector(".bars");
let sortbtn=document.querySelector("#sortbtn");
let sort=document.querySelector("#sort");
let chosen=document.querySelector("#chosen");
let resetBtn=document.querySelector("#resetBtn");

let slider = document.querySelector("#sortSpeed");
let speed=300-(slider.value-10);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    speed = 300-(this.value-10);
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
    bar.style=`height: ${(a[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
    bar.classList.add(`bar${i}`);
    bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a[i])}</b></span>`;
    bars.appendChild(bar);
}

resetBtn.addEventListener("click",()=>resetArray(),false);

function resetArray(){
    bars.innerHTML="";
    a=shuffle(a);
    for (let i=0;i<a.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a[i])}</b></span>`;
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
    else if(Algo=="Merge"){
        mergeSort();
    }
    else if (Algo=="Quick"){
        quickSort();
    }
    else if (Algo=="Bucket"){
        bucketSort();
    }
    else if(Algo==null){
        chosen.style.color="#d80702";//red
        chosen.innerHTML="Please Choose an algorithm first.";
        alert("Please Choose an algorithm first.");
    }
}

async function insertionSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    let n=a_copy.length;
    for(let i=1;i<n;i++){
        let sortedBar=document.querySelector(`.bar${i-1}`);
        sortedBar.style.backgroundColor="#5cdb95";//sorted
        let key=a_copy[i];
        chosen.style.color="black";
        chosen.innerHTML=`Picked ${key}!`;
        let keyBar=document.querySelector(`.bar${i}`);
        keyHeight=keyBar.style.height;
        keyBar.style.backgroundColor="#3500d3";//selected
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
            jBar.style.backgroundColor="#f64c72";//checking
            await sleep(speed);
            jBar.style.backgroundColor="#5cdb95";//sorted
            j-=1;
        }
        chosen.style.color="black";
        chosen.innerHTML=`Found and inserted`;
        keyBar.style.backgroundColor="#5cdb95";//sorted
        j1Bar=document.querySelector(`.bar${j+1}`);
        a_copy[j+1]=key;
        j1Bar.style.height=keyHeight;
        j1Bar.style.backgroundColor="#3500d3";//selected
        j1Bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${key}</b></span>`;
        await sleep(speed+100);
        j1Bar.style.backgroundColor="#5cdb95";//sorted
    }
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
    await sleep(speed+500);
    bars.innerHTML="";
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
}

async function selectionSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    const n=a_copy.length;
    for (let i=0;i<n;i++){
        let min=i;
        let iBar=document.querySelector(`.bar${i}`);
        iBar.style.backgroundColor="#3500d3";//selected
        chosen.style.color="black";
        chosen.innerHTML=`Selected ${a_copy[i]}!`;
        await sleep(speed);
        for(let j=i+1;j<n;j++){
            chosen.style.color="black";
            chosen.innerHTML=`Finding the minimum value in the right side...`;
            let jBar=document.querySelector(`.bar${j}`);
            jBar.style.backgroundColor="#f64c72";//checking
            await sleep(speed);
            if (a_copy[j]<a_copy[min])
            min=j;
            jBar.style.backgroundColor="#17a2b8";//original
        }
        chosen.style.color="black";
        chosen.innerHTML=`Swapping ${a_copy[i]} with ${a_copy[min]}...`;
        let minBar=document.querySelector(`.bar${min}`);
        minBar.style.backgroundColor="#3500d3";//selected
        //swap the minimum value with the value at index i.
        let tempHeight=iBar.style.height;   let temp=a_copy[i]; let tempInner=iBar.innerHTML;
        iBar.style.height=minBar.style.height;  a_copy[i]=a_copy[min];  iBar.innerHTML=minBar.innerHTML;
        minBar.style.height=tempHeight; a_copy[min]=temp;   minBar.innerHTML=tempInner;
        await sleep(speed+100);
        iBar.style.backgroundColor="#5cdb95";//sorted
        minBar.style.backgroundColor="#17a2b8";//original
        if(min==i)
        minBar.style.backgroundColor="#5cdb95";//sorted
    }
    await sleep(speed+500);
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
    bars.innerHTML="";
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
}

async function bubbleSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    let n=a_copy.length;
    for(let i=0;i<n-1;i++){
        let swapped=false;
        for(let j=0;j<n-1-i;j++){//everytime the last element will become sorted.Hence, j<n-1-i
            let jBar=document.querySelector(`.bar${j}`);
            let j1Bar=document.querySelector(`.bar${j+1}`);
            jBar.style.backgroundColor="#f64c72";//checking
            j1Bar.style.backgroundColor="#f64c72";//checking
            chosen.style.color="black";
            chosen.innerHTML=`Comparing ${a_copy[j]} and ${a_copy[j+1]}...`;
            await sleep(speed);
            if(a_copy[j]>a_copy[j+1]){
                //swap arr[j] and arr[j+1]
                jBar.style.backgroundColor="#3500d3";//selected
                j1Bar.style.backgroundColor="#3500d3";//selected
                chosen.style.color="black";
                chosen.innerHTML=`Swapping ${a_copy[j]} and ${a_copy[j+1]}...`;
                await sleep(speed);
                let temp=a_copy[j];let tempHeight=jBar.style.height;let tempInner=jBar.innerHTML;
                a_copy[j]=a_copy[j+1];jBar.style.height=j1Bar.style.height;jBar.innerHTML=j1Bar.innerHTML;
                a_copy[j+1]=temp;j1Bar.style.height=tempHeight;j1Bar.innerHTML=tempInner;
                swapped=true;
                await sleep(speed+100);
            }
            else{
                chosen.style.color="black";
                chosen.innerHTML=`No swap needed...`;
                await sleep(speed+100);
            }
            jBar.style.backgroundColor="#17a2b8";//original
            j1Bar.style.backgroundColor="#17a2b8";//original
        }
        let lastBar=document.querySelector(`.bar${n-i-1}`);
        lastBar.style.backgroundColor="#5cdb95";//sorted
    }
    for (let i=0;i<a_copy.length;i++){
        let bar=document.querySelector(`.bar${i}`);
        bar.style.backgroundColor="#5cdb95";//sorted
    }
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
    await sleep(speed+200);
    for (let i=0;i<a_copy.length;i++){
        let bar=document.querySelector(`.bar${i}`);
        bar.style.backgroundColor="#17a2b8";//original
    }
}

async function mergeSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    let n=a_copy.length;
    let currSize;
    let leftStart;
    for(currSize=1;currSize<=n-1;currSize=2*currSize){
        for(leftStart=0;leftStart<n-1;leftStart+=2*currSize){
            let mid=Math.min(leftStart+currSize,n);
            let rightEnd=Math.min(leftStart+2*currSize,n);
            // let left=sorted.slice(leftStart,mid);
            // let right=sorted.slice(mid,rightEnd);
            // sorted=mergeIterative(sorted,left,right);
            merge(a_copy,leftStart,mid,rightEnd);
        }
    }
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
}

async function merge(a_copy,leftStart,mid,rightEnd){
    let left=a_copy.slice(leftStart,mid);
    let right=a_copy.slice(mid,rightEnd);
    let leftIndex=0,rightIndex=0,k=leftStart;
    while(leftIndex<left.length && rightIndex<right.length){
        //picking the lesser one 
        let leftIndexBar=document.querySelector(`.bar${leftStart+leftIndex}`);
        let rightIndexBar=document.querySelector(`.bar${mid+rightIndex}`);
        let kBar=document.querySelector(`.bar${k}`);
        // leftIndexBar.style.backgroundColor="#f64c72";//checking
        // rightIndexBar.style.backgroundColor="#f64c72";//checking
        if(left[leftIndex]<=right[rightIndex]){
            // leftIndexBar.style.backgroundColor="#3500d3";//selected
            // rightIndexBar.style.backgroundColor="#17a2b8";//original
            a_copy[k]=left[leftIndex];
            kBar.style.height=`${(left[leftIndex]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(left[leftIndex])}</b></span>`;
            await sleep(200);
            kBar.style.backgroundColor="#5cdb95"//sorted
            leftIndex++;
            k++;
        }
        else{
            // rightIndexBar.style.backgroundColor="#3500d3";//selected
            // leftIndexBar.style.backgroundColor="#17a2b8";//original
            a_copy[k]=right[rightIndex];
            kBar.style.height=`${(right[rightIndex]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(right[rightIndex])}</b></span>`;
            await sleep(200);
            kBar.style.backgroundColor="#5cdb95"//sorted
            rightIndex++;
            k++;
        }
        // if (leftStart+leftIndex==k){
        //     leftIndexBar.style.backgroundColor="#5cdb95";//sorted
        //     rightIndexBar.style.backgroundColor="#17a2b8";//original
        // }
        // else if(mid+rightIndex==k){
        //     leftIndexBar.style.backgroundColor="#17a2b8";//original
        //     rightIndexBar.style.backgroundColor="#5cdb95";//sorted
        // }
        // else{
        //     leftIndexBar.style.backgroundColor="#17a2b8";//original
        //     rightIndexBar.style.backgroundColor="#17a2b8";//original
        // }
        // leftIndexBar.style.backgroundColor="#17a2b8";//original
        // rightIndexBar.style.backgroundColor="#17a2b8";//original
    }
    while(leftIndex<left.length && k<a_copy.length){
        let leftIndexBar=document.querySelector(`.bar${leftStart+leftIndex}`);
        let kBar=document.querySelector(`.bar${k}`);
        // leftIndexBar.style.backgroundColor="#3500d3";//selected
        a_copy[k]=left[leftIndex];
        kBar.style.height=`${(left[leftIndex]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(left[leftIndex])}</b></span>`;
        await sleep(200);
        kBar.style.backgroundColor="#5cdb95";//sorted
        leftIndex++;
        k++;
        // leftIndexBar.style.backgroundColor="#17a2b8";//original
    }
    while(rightIndex<right.length && k<a_copy.length){
        let rightIndexBar=document.querySelector(`.bar${mid+rightIndex}`);
        let kBar=document.querySelector(`.bar${k}`);
        // rightIndexBar.style.backgroundColor="#3500d3";//selected
        a_copy[k]=right[rightIndex];
        kBar.style.height=`${(right[rightIndex]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(right[rightIndex])}</b></span>`;
        await sleep(200);
        kBar.style.backgroundColor="#5cdb95"//sorted
        rightIndex++;
        k++;
        // rightIndexBar.style.backgroundColor="#17a2b8";//original
    }
}