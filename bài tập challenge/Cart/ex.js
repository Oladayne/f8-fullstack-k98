
function formatPrice(price) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function (event) {
        if (event.target.classList.contains('add')) {
            var itemNew = item.cloneNode(true);
            var checkIsset = false;
            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart => {
                if (cart.getAttribute('data-key') === item.getAttribute('data-key')) {
                    var itemValue = parseInt(item.querySelector('.count').value);
                    var cartValue = parseInt(cart.querySelector('.count').value);
                     cart.querySelector('.count').value = itemValue + cartValue;
                     var totalCount= cart.querySelector('.count').value;
                    var itemNewPrice = parseInt(itemNew.querySelector('.price').textContent.replace(/\./g, '').replace(',', '.'));
                    console.log(itemNewPrice);
                    checkIsset = true; 
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            })
            if (checkIsset === false) {
                document.querySelector('.listCart').appendChild(itemNew);
            }
         updateTotalValue();
        }
    })
})
function Remove($key) {
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if (item.getAttribute('data-key') == $key) {
            item.remove();
            return
        }
    })
}

function formatPrice(price) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
var removeAllButton = document.querySelector('.removeAll');
removeAllButton.addEventListener('click', function() {
    var confirmed = window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không?');
    if (confirmed) {
        var cartItems = document.querySelectorAll('.cart .item');
        cartItems.forEach(function(cartItem) {
            cartItem.remove();
        });
    }
});
function Remove(dataKey) {
    var userConfirmed = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (userConfirmed) {
        var itemToRemove = document.querySelector('.cart .item[data-key="' + dataKey + '"]');
        
        if (itemToRemove) {
            itemToRemove.remove();
            updateTotalValue();
        }
    }
}
function updateTotalValue() {
    let totalValue = 0;
    var SL = 0;
    let listCart = document.querySelectorAll('.cart .item');

    listCart.forEach(cart => {
        const count = parseInt(cart.querySelector('.count').value);
        const price = parseInt(cart.querySelector('.price').textContent.replace(/\./g, '').replace(',', '.'));
        const value1 = parseInt(cart.querySelector('.count').value);
        cart.querySelector('.allPriceProduct').textContent = formatPrice(price*count)

        SL += value1;
        totalValue += count * price;

    });
    document.querySelector('.money').textContent = formatPrice(totalValue);
    document.querySelector('.sl').textContent = `${SL}`;
}
document.querySelector('.update').addEventListener('click', function () {
    var userConfirmed = confirm('Bạn có chắc chắn muốn cập nhật  không?');
    if (userConfirmed) {
        updateTotalValue();
    }
});

