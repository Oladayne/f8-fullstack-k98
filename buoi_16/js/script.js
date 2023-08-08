// bài 1 
var a=10;
var temp =0;
if (a <= 1){
  temp = 15000;

}
if(a > 1 && a < 5){
  temp = a*13500;
}
if(a > 5){
  temp = a*11000;
}
if(a > 120){
  temp=(a*11000)*0.9;
}
console.log('bài 1 : '+ temp + 'đ');

//bài 2 

var kWh = 401;
var bill;
var total;

if (0 < kWh && kWh <= 50) {
  bill = 1678;
  total = bill * kWh;
} else if (51 <= kWh && kWh <= 100) {
  bill = 1734;
  total = bill * (kWh - 50) + 1678 * 50;
} else if (101 <= kWh && kWh <= 200) {
  bill = 2014;
  total = bill * (kWh - 100) + 1734 * 50 + 1678 * 50;
} else if (201 <= kWh && kWh <= 300) {
  bill = 2536;
  total = bill * (kWh - 200) + 2014 * 100 + 1734 * 50 + 1678 * 50;
} else if (301 <= kWh && kWh <= 400) {
  bill = 2834;
  total = bill * (kWh - 300) + 2536 * 100 + 2014 * 100 + 1734 * 50 + 1678 * 50;
} else if (kWh >= 401) {
  bill = 2927;
  total = bill * (kWh - 400) + 2834 * 100 + 2536 * 100 + 2014 * 100 + 1734 * 50 + 1678 * 50;
}

console.log(`Số tiền phải đóng: `+ total);

// bài 3 
var n = 5 ;
var temp = 0;
for(let i = 1; i<=n ;i++){
  temp=temp + i*(i+1);
}
console.log('bài 3 : '+ temp);
//bài 4 
var m=23;
var test=0;
if(m<3){
  console.log('là nt');
}

else{
  for(let i=2 ; i<=Math.sqrt(m);i++){
    if(m%i==0){
      test =1;
      console.log('ko phải là số nt');
      break;
    }
    else continue;
  }
 if(test==0) console.log('là số nt');
}
//bài 5 
var n=7;
var temp=1
for (let i =1 ;i<=n;i++){
  var row ="";
  for(let j=1;j<=i;j++){
    row+=temp+ ' ';
    temp++;

  }
  console.log(row);

}
//bài 6 
var n = 8;
var row = n,
  col = n;
var Table = document.createElement("table");
    Table.setAttribute('class', 'table-style');

for (var i = 0; i < row; i++) {
  var tagRow = document.createElement("tr");
  for (var j = 0; j < row; j++) {
    var tagCol = document.createElement("td");
    if ((i + j) % 2 !== 0) {
        tagCol.setAttribute('class', 'cell white');
        tagRow.appendChild(tagCol);  
    } else {
        tagCol.setAttribute('class', 'cell black');
        tagRow.appendChild(tagCol);
    }
  }
  Table.appendChild(tagRow); 
}

document.getElementById("chess").appendChild(Table);

// bài 7 
var n = 10;
var row = n,
  col = n;
var Table = document.createElement("table");
    Table.setAttribute('class', 'table-style');

for (var i = 1; i <= row; i++) {
  var tagRow = document.createElement("tr");
  for (var j = 1; j <= row; j++) {
    var tagCol = document.createElement("td");
    var tagColumn = document.createElement("td");
    var textNOde = document.createTextNode(`${j} x ${i} = ${i * j}`)
    tagColumn.setAttribute('class', 'cel-multiplication');
    tagColumn.appendChild(textNOde);  
    tagRow.appendChild(tagColumn);  
  }
  Table.appendChild(tagRow); 
}

document.getElementById("cuu-chuong").appendChild(Table);

