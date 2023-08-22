console.log("Bài 1"); 
var arr1 =  [1, 4, 3, 2];
var arr2 = [5, 2, 6, 7, 1];
var con = arr1.reduce( (pre, current)=> {
    if (arr2.includes(current)){
        console.log(current);
        pre.push(current);
    }
    return pre
},[])
console.log(con);




console.log("Bài 2");
function numbers(arr) {
    return arr.reduce((prev, current) => {
      if (Array.isArray(current)) {
        return prev.concat(numbers(current));
      }
      return prev.concat(current);
    }, []);
  }
  
  var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
  var newmang = numbers(arr);
console.log(newmang); 
  



console.log("Bai 3");
var arr = [["a", 1, true], ["b", 2, false]];
console.log(arr);
function groupnew(array) {
  var result = [];

  for (let i = 0; i < array[0].length; i++) {
    var index = array.map(subArray => subArray[i]);
    result.push(index);
  }

  return result;
}

var newma = groupnew(arr);
console.log(newma);

console.log("bài 4");
var content = [
    {
        img: "https://i.pinimg.com/236x/10/26/58/102658004e2ed30dcd9ca8e45600abe6.jpg",
        title: "Tiêu đề bài viết 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia."
    },
    {
        img: "https://i.pinimg.com/236x/10/26/58/102658004e2ed30dcd9ca8e45600abe6.jpg",
        title: "Tiêu đề bài viết 2",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia."
    },
    {
        img: "https://i.pinimg.com/236x/10/26/58/102658004e2ed30dcd9ca8e45600abe6.jpg",
        title: "Tiêu đề bài viết 3",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia."
    },
    {
        img: "https://i.pinimg.com/236x/10/26/58/102658004e2ed30dcd9ca8e45600abe6.jpg",
        title: "Tiêu đề bài viết 3",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequatur error vitae placeat perspiciatis laboriosam suscipit ipsa optio, maxime nulla magnam voluptatem sunt dolor ducimus quis cum sint eos officia."
    },
    
  ];
  
  var newhtml = ``;
  for(let i=0;i<content.length;i++){
  
    var htmlSource = `
    <li class="item">
        <div class="img">
            <img src="${content[i].img}" alt="img">
        </div>
        <div class="content-item-wrap">
            <h2 class="title">${content[i].title}</h2>
            <p class="content-item">${content[i].description}</p>
        </div>
    </li>
    `;
    newhtml+=htmlSource;
  }
    
   
  
  const listContent = document.getElementById("list-content");
  listContent.innerHTML = newhtml;
  
