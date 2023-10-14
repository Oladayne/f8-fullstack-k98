let image = document.getElementById('image');
let content = document.getElementById('content');
let btnCreate = document.getElementById('btnCreate');
let message = document.getElementById('message');
btnCreate.onclick = () => {
    if (content.value == '') return;
    let linkQR = `https://api.qrserver.com/v1/create-qr-code/`;
    image.src = linkQR + '?size 500x500&data=' + content.value;
    content.value = '';

    // Show a message to the user
    message.innerText = 'thông điệp yêu thương đã tải lên mời quét mã QR';
    message.style.display = 'block';
}
content.addEventListener('focus', () => {
    // Change the message when the input is focused
    message.innerText = 'Mời nhập nội dung tiếp theo';
});

content.addEventListener('blur', () => {
    // Check if the input is empty and change the message accordingly
    if (content.value === '') {
        message.innerText = 'Trường nhập liệu đang trống.';
    }
});
