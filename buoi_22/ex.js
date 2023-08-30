console.log("bài1");
function Sum(...values) {
    var sum = values.reduce((pre, current) => {
      if (typeof current !== 'number') {
        throw new Error('dữ liệu đầu vào sai');
      }
      return pre + current;
    }, 0);
  
    return sum;
  }
  try {
    var result1 = Sum(5, 10, 15);
    console.log('Sum1:', result1);
  
    var result2 = Sum(2, 4, "6");
    console.log('Sum2:', result2);
  } catch (error) {
    console.error('Error:', error.message);
  }
console.log("bài3");
var categories = [
    {
      id: 1,
      name: "Chuyên mục 1",
      parent: 0,
    },
    {
      id: 2,
      name: "Chuyên mục 2",
      parent: 0,
    },
    {
      id: 3,
      name: "Chuyên mục 3",
      parent: 0,
    },
    {
      id: 4,
      name: "Chuyên mục 2.1",
      parent: 2,
    },
    {
      id: 5,
      name: "Chuyên mục 2.2",
      parent: 2,
    },
    {
      id: 6,
      name: "Chuyên mục 2.3",
      parent: 2,
    },
    {
      id: 7,
      name: "Chuyên mục 3.1",
      parent: 3,
    },
    {
      id: 8,
      name: "Chuyên mục 3.2",
      parent: 3,
    },
    {
      id: 9,
      name: "Chuyên mục 3.3",
      parent: 3,
    },
    {
      id: 10,
      name: "Chuyên mục 2.2.1",
      parent: 5,
    },
    {
      id: 11,
      name: "Chuyên mục 2.2.2",
      parent: 5,
    },
  ];
  var newArr = [];
  var nested = function (arr) {
    var map = {};
    arr.forEach((ittem) => {
      var tmp = { id: ittem.id, 
                  name: ittem.name };
      map[ittem.id] = tmp;
      if (ittem.parent === 0) {
        newArr.push(tmp);
      } else {
        var parent = map[ittem.parent];
        if (parent) {
          if (parent.children) {
            parent.children.push(tmp);
          } else {
            parent.children = [tmp];
          }
        }
      }
    });
    return newArr;
  };
  
  console.log(nested(categories));
  
console.log("bài4");
Array.prototype.reduce2 = function (callback, GTKT) {
    let pre = GTKT || this[0];
    let current;
    if (GTKT !== undefined) {
        current = 0;
    } else {
        current = 1;
    }
    
    for (let i = current; i < this.length; i++) {
        pre = callback(pre, this[i], i, this);
    }

    return pre;
};
//bài tập tính tổng
var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce2(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum);
// bài tập tìm max 
var numbers = [5, 2, 1, 9, 8];
var con = numbers.reduce2(function (pre, current){
    if (pre > current) {
       return pre
    }
    return current
});
console.log(con);