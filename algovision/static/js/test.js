let randomArray = (length, max) => Array.from({length}) .map(() => Math.floor(Math.random() * max));

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
    return (num/40)*25;
}

a = shuffle(a);
a=a.map(heightwise);
document.querySelector()

let arr=randomArray(40,40)
console.log(a)