console.log("Bai 1");
var total = (...args) =>
  args.every(Number) ? args.reduce((a, b) => +a + +b) : "Invalid Data!";
console.log(total(9, "2", "1", "a"));
console.log(total(9, "2", "1", [4], true));

console.log("======");
console.log("Bai 2");
Object.prototype.getCurrency = function (unit) {
  return this.toLocaleString("en") + " " + unit;
};
var price = 120000000000;
console.log(price.getCurrency("đ"));
  
console.log("======");
console.log("Bai 3");
// Array.prototype.push2 = function (...items) {
//     for (var i = 0; i < items.length; i++){
//         this[this.length] = items[i];
//     }
//     return this;
// }
Array.prototype.push2 = function (...args) {
  for (var i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
  return this.length;
};
var arr = [ 3, 4, "5", undefined];
console.log(arr.push2(9, 4, "4", undefined));
console.log(arr);
console.log(arr.push("a", 1, 2, 3));
console.log(arr);

// console.log("Vi Du");
// var S = [1, 2, 3];
// var SPlus = S.push2(4);
// console.log(SPlus);

console.log("======");
console.log("Bai 4");
Array.prototype.filter2 = function (callback) {
    var fil = [];
    for (var item of this) {
        if (callback(item)) {
            fil.push(item);
     }
    }
    return fil;
}
console.log("Vi Du");
var numbers = [1, 2, 3, 4, 5, 6];
var results = numbers.filter2(function (number) {
    if (number >=3) {
        return true;
    }
});
console.log(results); 

console.log("======");
console.log("Bai 5");

var categories = [
    {
      id: 1,
      name: "Chuyên mục 1",
    },
    {
      id: 2,
      name: "Chuyên mục 2",
      children: [
        {
          id: 4,
          name: "Chuyên mục 2.1",
        },
        {
          id: 5,
          name: "Chuyên mục 2.2",
          children: [
            {
              id: 10,
              name: "Chuyên mục 2.2.1",
            },
            {
              id: 11,
              name: "Chuyên mục 2.2.2",
            },
            {
              id: 12,
              name: "Chuyên mục 2.2.3",
            },
          ],
        },
        {
          id: 6,
          name: "Chuyên mục 2.3",
        },
      ],
    },
    {
      id: 3,
      name: "Chuyên mục 3",
      children: [
        {
          id: 7,
          name: "Chuyên mục 3.1",
        },
        {
          id: 8,
          name: "Chuyên mục 3.2",
        },
        {
          id: 9,
          name: "Chuyên mục 3.3",
        },
      ],
    },
  ];
  
  function buildSelectOptions(categories, level = 0) {
    var optionsHTML = "";
    var arr = [];
    arr.length = level;
  
    categories.forEach((category) => {
      var indentation = arr.fill("--|").join("");
      optionsHTML += `<option value="${category.id}">${indentation}${category.name}</option>`;
  
      if (category.children) {
        optionsHTML += buildSelectOptions(category.children, level + 1);
      }
    });
  
    return optionsHTML;
  }
  
  var selectOptions = buildSelectOptions(categories);
  var selectHTML = `<select>
  <option value="">Chọn chuyên mục</option>
      ${selectOptions}
  </select>`;
  
  document.write(selectHTML);
