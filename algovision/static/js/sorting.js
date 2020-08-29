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
    return new Promise((resolve) => setTimeout(resolve, ms));
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
    else if(Algo=="MergeIttr"){
        mergeSort();
    }
    else if(Algo=="MergeRecur"){
        mergeSortCaller();
    }
    else if (Algo=="Quick"){
        quickSort();
    }
    else if (Algo=="Heap"){
        heapSort();
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
    let currSize=1;
    let leftStart=0;

    for(currSize=1;currSize<=n-1;currSize=2*currSize){
        for(leftStart=0;leftStart<n-1;leftStart+=2*currSize){
            let mid=Math.min(leftStart+currSize,n);
            let rightEnd=Math.min(leftStart+2*currSize,n);
            await merge(a_copy,leftStart,mid,rightEnd);
        }
    }

    for (let i=0;i<a_copy.length;i++){
        await sleep(speed);
        let bar=document.querySelector(`.bar${i}`);
        bar.style.backgroundColor="#5cdb95";//sorted
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
        
        leftIndexBar.style.backgroundColor="#f64c72";//checking
        rightIndexBar.style.backgroundColor="#f64c72";//checking
        
        chosen.style.color="black";
        chosen.innerHTML=`Comparing values at index ${leftStart+leftIndex} and ${mid+rightIndex}...`;

        if(left[leftIndex]<=right[rightIndex]){
            
            await sleep(speed);
            leftIndexBar.style.backgroundColor="#17a2b8";//original
            rightIndexBar.style.backgroundColor="#17a2b8";//original
            
            kBar.style.backgroundColor="#3500d3";//selected
            a_copy[k]=left[leftIndex];
            chosen.style.color="black";
            chosen.innerHTML=`Pushing value at index ${leftStart+leftIndex} to ${k}...`;

            kBar.style.height=`${(left[leftIndex]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(left[leftIndex])}</b></span>`;
            await sleep(speed);
            kBar.style.backgroundColor="#17a2b8";//original
            leftIndex++;
            k++;
        }
        else{
            
            await sleep(speed);
            rightIndexBar.style.backgroundColor="#17a2b8";//original
            leftIndexBar.style.backgroundColor="#17a2b8";//original
            
            kBar.style.backgroundColor="#3500d3";//selected
            chosen.style.color="black";
            chosen.innerHTML=`Pushing value at index ${mid+rightIndex} to ${k}...`;

            a_copy[k]=right[rightIndex];
            kBar.style.height=`${(right[rightIndex]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(right[rightIndex])}</b></span>`;
            await sleep(speed);
            kBar.style.backgroundColor="#17a2b8";//original
            rightIndex++;
            k++;
        }
    }
    while(leftIndex<left.length && k<a_copy.length){
        let leftIndexBar=document.querySelector(`.bar${leftStart+leftIndex}`);
        let kBar=document.querySelector(`.bar${k}`);
        
        await sleep(speed);
        leftIndexBar.style.backgroundColor="#f64c72";//checking
        await sleep(speed);
        leftIndexBar.style.backgroundColor="#17a2b8";//original
        
        kBar.style.backgroundColor="#3500d3";//selected
        chosen.style.color="black";
        chosen.innerHTML=`Pushing value at index ${leftStart+leftIndex} to ${k}...`;

        a_copy[k]=left[leftIndex];
        kBar.style.height=`${(left[leftIndex]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(left[leftIndex])}</b></span>`;
        await sleep(speed);
        kBar.style.backgroundColor="#17a2b8";//original
        leftIndex++;
        k++;
    }
    while(rightIndex<right.length && k<a_copy.length){
        let rightIndexBar=document.querySelector(`.bar${mid+rightIndex}`);
        let kBar=document.querySelector(`.bar${k}`);
        
        await sleep(speed);
        rightIndexBar.style.backgroundColor="#f64c72";//checking
        await sleep(speed);
        rightIndexBar.style.backgroundColor="#17a2b8";//original
        
        kBar.style.backgroundColor="#3500d3";//selected
        chosen.style.color="black";
        chosen.innerHTML=`Pushing value at index ${mid+rightIndex} to ${k}...`;

        a_copy[k]=right[rightIndex];
        kBar.style.height=`${(right[rightIndex]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(right[rightIndex])}</b></span>`;
        
        await sleep(speed);
        kBar.style.backgroundColor="#17a2b8";//original
        
        rightIndex++;
        k++;
    }
}

async function mergeSortCaller(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    await mergeSortRecursive(a_copy,0,a_copy.length-1);
    for (let i=0;i<a_copy.length;i++){
        await sleep(speed);
        let bar=document.querySelector(`.bar${i}`);
        bar.style.backgroundColor="#5cdb95";//sorted
    }
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
}

async function mergeRecursive(arr, l, m, r) { 
    // Find sizes of two subarrays to be merged 
    let n1 = m - l + 1; 
    let n2 = r - m; 
    /* Create temp arrays */
    let L = arr.slice(l,m+1); 
    let R = arr.slice(m+1,r+1);
    
    // Initial indexes of first and second subarrays 
    let i = 0, j = 0; 

    // Initial index of merged subarry array 
    let k = l; 
    

    while (i < n1 && j < n2) {
        let leftIdxBar=document.querySelector(`.bar${l+i}`);
        let rightIdxBar=document.querySelector(`.bar${m+1+j}`);
        let kBar=document.querySelector(`.bar${k}`);
        
        await sleep(speed);
        leftIdxBar.style.backgroundColor="#f64c72";//checking
        rightIdxBar.style.backgroundColor="#f64c72";//checking
        chosen.style.color="black";
        chosen.innerHTML=`Comparing values at index ${l+i} and ${m+1+j}...`;

        await sleep(speed);
        leftIdxBar.style.backgroundColor="#17a2b8";//original
        rightIdxBar.style.backgroundColor="#17a2b8";//original

        kBar.style.backgroundColor="#3500d3";//selected
        
        if (L[i] <= R[j]) { 
            arr[k] = L[i];
            kBar.style.height=`${(L[i]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(L[i])}</b></span>`;
            chosen.style.color="black";
            chosen.innerHTML=`Pushing value at index ${l+i} to ${k}...`;

            i++; 
        } 
        else { 
            arr[k] = R[j]; 
            kBar.style.height=`${(R[j]/35)*100}%`;
            kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(R[j])}</b></span>`;
            chosen.style.color="black";
            chosen.innerHTML=`Pushing value at index ${m+1+j} to ${k}...`;

            j++; 
        } 
        k++; 
        await sleep(speed);
        kBar.style.backgroundColor="#17a2b8";//original
    } 
    /* Copy remaining elements of L[] if any */
    while (i < n1) { 

        let leftIdxBar=document.querySelector(`.bar${l+i}`);
        let kBar=document.querySelector(`.bar${k}`);
        await sleep(speed);
        leftIdxBar.style.backgroundColor="#f64c72";//checking
        await sleep(speed);
        leftIdxBar.style.backgroundColor="#17a2b8";//original

        kBar.style.backgroundColor="#3500d3";//selected
        arr[k] = L[i]; 
        kBar.style.height=`${(L[i]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(L[i])}</b></span>`;
        chosen.style.color="black";
        chosen.innerHTML=`Pushing value at index ${l+i} to ${k}...`;

        i++; 
        k++; 
        kBar.style.backgroundColor="#17a2b8";//original
    } 
    /* Copy remaining elements of R[] if any */
    while (j < n2) { 
        let rightIdxBar=document.querySelector(`.bar${m+1+j}`);
        let kBar=document.querySelector(`.bar${k}`);
        await sleep(speed);
        rightIdxBar.style.backgroundColor="#f64c72";//checking
        await sleep(speed);
        rightIdxBar.style.backgroundColor="#17a2b8";//original
        kBar.style.backgroundColor="#3500d3";//selected
        arr[k] = R[j]; 
        kBar.style.height=`${(R[j]/35)*100}%`;
        kBar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(R[j])}</b></span>`;
        chosen.style.color="black";
        chosen.innerHTML=`Pushing value at index ${m+1+j} to ${k}...`;
        j++; 
        k++; 
        kBar.style.backgroundColor="#17a2b8";//original
    } 
} 


async function mergeSortRecursive(arr,l,r) 
{ 
    if (l==r)
    return;
    // Find the middle point 
    let m = Math.floor((l + r) / 2); 
    // Sort first and second halves 
    await mergeSortRecursive(arr, l, m); 
    await mergeSortRecursive(arr, m + 1, r); 
    // Merge the sorted halves 
    await mergeRecursive(arr, l, m, r); 
}


async function quickSort(){
    bars.innerHTML="";
    a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    let l=0;
    let h=a_copy.length-1;
    await quickSortHelper(a_copy,l,h);
    for (let i=0;i<a_copy.length;i++){
        await sleep(speed);
        let bar=document.querySelector(`.bar${i}`);
        bar.style.backgroundColor="#5cdb95";//sorted
    }
    chosen.style.color="black";
    chosen.innerHTML=`SORTED!!`;
}

async function quickSortHelper(a,l,h){
    if(l-h>=0)
    return;
    let pi=await partition(a,l,h);
    await quickSortHelper(a,l,pi-1);
    await quickSortHelper(a,pi+1,h);
}

async function partition(a,l,h){
    let pivot=a[h];
    await sleep(speed);
    chosen.style.color="black";
    chosen.innerHTML=`${a[h]} is selected as pivot.`;
    let pivotBar=document.querySelector(`.bar${h}`);
    await sleep(speed);
    pivotBar.style.backgroundColor="#3500d3";//selected
    let i=l-1;
    let temp,tempHeight,tempInner;
    chosen.style.color="black";
    chosen.innerHTML=`Finding the right place for the pivot...`;
    for (let j=l;j<h;j++){
        let iBar=document.querySelector(`.bar${i}`);
        let jBar=document.querySelector(`.bar${j}`);
        await sleep(speed);
        jBar.style.backgroundColor="#f64c72";//checking
        if(a[j]<pivot){
            i++;
            let iBar=document.querySelector(`.bar${i}`);
            temp=a[i];tempHeight=iBar.style.height;tempInner=iBar.innerHTML;
            a[i]=a[j];iBar.style.height=jBar.style.height;iBar.innerHTML=jBar.innerHTML;
            a[j]=temp;jBar.style.height=tempHeight;jBar.innerHTML=tempInner;
        }
        await sleep(speed);
        jBar.style.backgroundColor="#17a2b8";//original
    }
    let i1Bar=document.querySelector(`.bar${i+1}`);
    temp=a[i+1];tempHeight=i1Bar.style.height;tempInner=i1Bar.innerHTML;
    a[i+1]=a[h];i1Bar.style.height=pivotBar.style.height;i1Bar.innerHTML=pivotBar.innerHTML;
    a[h]=temp;pivotBar.style.height=tempHeight;pivotBar.innerHTML=tempInner;
    chosen.style.color="black";
    chosen.innerHTML=`Found and swapped with ${a[i+1]}.`;
    await sleep(speed);
    pivotBar.style.backgroundColor="#17a2b8";//original
    i1Bar.style.backgroundColor="#5cdb95";//sorted
    return i+1;
}

//Function to turn the array into a
//max heap with root at index i.
function heapify(arr,length,i){
    let largest=i;
    let left=i*2+1;
    let right=left+1;
    if (left<length && arr[left]>arr[largest])
        largest=left;
    if (right<length && arr[right]>arr[largest])
        largest=right;
    if(largest!=i){
        [arr[largest],arr[i]]=[arr[i],arr[largest]];
        heapify(arr,length,largest);
    }
}

//The main function that sorts the array.
function heapSort(){
    bars.innerHTML="";
    let a_copy=[...a];
    for (let i=0;i<a_copy.length;i++){
        let bar=document.createElement("div");
        bar.style=`height: ${(a_copy[i]/35)*100}%;width:${33/40}em;background:#17a2b8;margin:0em 0.285em;float:left;`;
        bar.classList.add(`bar${i}`);
        bar.innerHTML=`<span style="font-size:0.7em;color:black;"><b>${(a_copy[i])}</b></span>`;
        bars.appendChild(bar);
    }
    let length=a_copy.length;
    let i=Math.floor((length/2)-1);
    let j=length-1;
    while (i>=0){
        heapify(a_copy,length,i);
        i--;
    }

    while (j>=0){
        [a_copy[0],a_copy[j]]=[a_copy[j],a_copy[0]];
        heapify(a_copy,j,0);
        j--;
    }
}