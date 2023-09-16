// tìm phần tử giao giữa 2 mảng 
var arrA = [1, 2, 3, 4, 5];
var arrB = [4, 5, 6, 7, 8];
var newArr = arrA.reduce(function (prev, current) {
    if (arrB.includes(current)) {
        prev.push(current);
    }
    return prev;
},[])
console.log(newArr);


// làm phẳng mảng (chuyển về mảng 1 chiều )
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var flatarr = function (arr) {
    var newArr = arr.reduce(function (prev, curent) {
        if (!Array.isArray(curent)) {
            return prev.concat(curent)
        }
        return prev.concat(flatarr(curent));
    }, []);
    return newArr;
}
var result = flatarr(arr);
console.log(result);
console.log(arr.flat(Infinity));


// tách mảng theo kiểu dữ liệu 
var arr = [
    ["a", 1, true],
    ["b", 2, false],
    // kiểm tra có phải mảng hay ko 
]
if (Array.isArray(arr)) {
    arr = arr.flat(Infinity);
    var array = arr.reduce(function (prev, current) {
        var type = typeof current;
        if (!prev[type]) {
            prev[type] = [];
        }
        prev[type].push(current);
        return prev
    }, []);
    var result = [];
    for (var index in array) {
        result.push(array[index]);
    }
    console.log(result);
}