var content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis impedit omnis non suscipit, deserunt possimus harum hic itaque, consectetur sapiente qui beatae asperiores porro deleniti voluptatem modi rerum pariatur ullam. '


var keyword = "";

//xử lý 
var resurlt = "";


document.getElementById("contents").innerHTML=content;

var i=0;
setInterval(function () {
  keyword+= content.charAt(i);
  if(content.charAt(i)===" "){
    console.log(keyword);
    
    resurlt = content.slice(0,i-keyword.length+1) + `<span>${keyword}</span>`+ content.slice(i);
    document.getElementById("contents").innerHTML=resurlt;
    keyword="";
  }
  i++;
  if (i === content.length) {
    i = 0;
  }
}, 200);