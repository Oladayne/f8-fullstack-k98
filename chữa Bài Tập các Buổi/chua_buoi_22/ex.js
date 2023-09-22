// viết hàm tính tổng giá trị biểu thức
// hàm trả về giá trị
// ép ràng buộc kiểu dữ liệu là số
// kiểu dữ liệu truyền vào ko hợp lệ trả về thông báo 
var getTotal = function (...avgs) {
    console.log(avgs);
    if (avgs.length) {
        var total = 0;
        var check = avgs.every(function (number) {
            if (number !== null) {
                number = +number;
                total += number
                if (!Number.isNaN(number)) {
                    return true;
                }
            }
        });
        if (check) {
            return total
        }
        return "dữ liệu không hợp lệ"
    }
};
var result = getTotal(5, 10, 15, "20");
console.log(result);


// viết 1 phương thức prototype có tên là getcurrency có dối số truyền vào đơn vị tiền tệ 
var price = 12200;
Number.prototype.getCurrency = function (curency) {
    var value = this.valueOf();
    if (curency) {
        return value.toLocaleString() + " " + curency;
    }
    return value;
};
String.prototype.getCurrency = Number.prototype.getCurrency;
console.log(price.getCurrency("d"));
var price = "1200000";
console.log(price.getCurrency("đ"));


// chuyển đổi mảng 1 chiều thành dạng lồng 
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
]
var getCategory = function (categories, parent = 0) {
    var result = [];
    if (categories.length) {
        categories.forEach(function (category, index) {
            if (category.parent === parent) {
                var children = getCategory(categories, category.id);
                if (children.length) {
                    category.children = children;
                }
                result[category.id] = category;
            }
        });
    }
    result = result.filter(function (item) {
        return true;
    });
    return result;
};
var tree = getCategory(categories);
console.log(tree);


// Viêt vòng lặp reduce trong mảng array

var numbers = [5, 10, 15, 20];
Array.prototype.reduce2 = function (callback, initialvalue) {
    if (this.length) {
        var prev 
        for (var i = 0; i < this.length; i++) {
            if (i === 0) {
                if (initialvalue === undefined) {
                
                    prev = this[0];
                    continue;
                }
                prev = initialvalue
        }
            var value = this[i];
            prev = callback(prev, value, i);
            if (i === this.length - 1) {
                return prev
            }
        }
    }
    
};
var result = numbers.reduce2(function (prev, curent, i) {
    return prev + curent;
}, 0);
console.log(result);