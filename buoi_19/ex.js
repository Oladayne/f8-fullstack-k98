var ar = [1, 2, 3];
console.log(Math.max.apply(null, ar));
console.log(Math.min.apply(null, ar));
console.log(ar.indexOf(Math.min.apply(null, ar)) );
console.log(ar.indexOf(Math.max.apply(null, ar)) );


var prime = function (index) {
  if(index<2) return false;
  for (let i=2;i<Math.sqrt(index);i++){
    if(index%i===0){
      return false;
    }

  }
  return true;
  
}

var summ= function (index) {
  var count=0;
  var tong =0;
  for (let i=1;i<=index;i++){
    if(prime(i)){
      tong+=i;
      count++;
    }
  }
  if(count===0){
    return 'ko có số nt';
  }
  else {
    return tong/count;
  }

  
}
 console.log(summ(1));

 //
 var aar = [1, 2, 1, 3,3,3,3,3,3,3];

 console.log();
 
 var test = [];

 for (let i=0;i< aar.length;i++){
  if(aar[i]===0){
    continue;
  }
  else {
    for(let j=i+1;j<aar.length ;j++){
      if(aar[i]===aar[j]){
        aar[j]=0;
        
      }
      
    }
    test.push(aar[i]);
  }
 }
 console.log(test);

 ////
var numbers = [5, 1, 9, 8, 10];
var element = 4;


numbers.push(element);
console.log(numbers.sort((a,b) => a-b));