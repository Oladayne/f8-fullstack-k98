console.log("Bai 1");
function sum(...args) {
    var total = 0;
    for (var i = 0 ; i < args.length ; i++ ){
        if (typeof args[i] !== "number") {
            return "false"
        } else {
            total += args[i];
        }
    }
    return  "SUM IS :" + total;
}
console.log(sum(1, 2, 3));
console.log(sum(1, 2, "3"));

console.log("======");
console.log("Bai 2");
function getCurrency(amount, currency) {
    if (typeof currency !== 'string') {
      throw new Error("Nhập chuỗi cho đơn vị tiền");
    }
    if (currency === 'đ') {
      currency = 'VND';
    }
   var money = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(money)) {
      throw new Error("Giá trị không hợp lệ");
    }
   var formatted = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(money);
    return formatted;
  }
  
  var price2 = "12000000";
console.log(getCurrency(price2, 'đ')); 
  
console.log("======");
console.log("Bai 3");
Array.prototype.push2 = function (...items) {
    for (var i = 0; i < items.length; i++){
        this[this.length] = items[i];
    }
    return this;
}
console.log("Vi Du");
var S = [1, 2, 3];
var SPlus = S.push2(4);
console.log(SPlus);

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
