const imageInput = document.getElementById('imageInput');
const outputCanvas = document.getElementById('outputCanvas');
const worker = new Worker('imageWorker.js');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageData = e.target.result;

      // Gửi dữ liệu hình ảnh đến Worker để xử lý
      worker.postMessage({ imageData });
    };

    reader.readAsDataURL(file);
  }
});

worker.addEventListener('message', (event) => {
  // Nhận kết quả từ Worker và hiển thị nó trên canvas
  const processedImageData = event.data.imageData;
  outputCanvas.width = processedImageData.width;
  outputCanvas.height = processedImageData.height;
  const context = outputCanvas.getContext('2d');
  context.putImageData(processedImageData, 0, 0);
});
self.addEventListener('message', (event) => {
    const imageData = event.data.imageData;
    const image = new Image();
    image.src = imageData;
  
    image.onload = () => {
      const canvas = new OffscreenCanvas(image.width, image.height);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
  
      // Xử lý hình ảnh ở đây (ví dụ: chỉ đổi màu)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
      // Gửi kết quả về main thread
      self.postMessage({ imageData });
    };
  });
  