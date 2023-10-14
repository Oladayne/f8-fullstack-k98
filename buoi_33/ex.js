// Tạo đối tượng nhận giọng nói
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Thiết lập ngôn ngữ tiếng Việt
recognition.lang = 'vi-VN';

// Lấy các phần tử HTML
const button = document.getElementById('button');
const status = document.getElementById('status2');
const result = document.getElementById('result');
const spinner =document.querySelector('.spinner-wrap');

// Biến để theo dõi trạng thái của tìm kiếm
let searching = false;

// Xử lý sự kiện khi nhấn nút "Bấm vào đây để nói"
button.addEventListener('click', () => {
    recognition.start();
    button.classList.add('listening');
    status.innerText = 'Đang nghe...';
    spinner.style.display='block';
    result.style.display = 'none';
});

// Xử lý sự kiện khi có kết quả
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    if (transcript.includes('google map') || transcript.includes('google maps') || transcript.includes('bản đồ')) {
        window.location.href = 'https://maps.google.com';
        searching = true;
    } else if (transcript.includes('google drive')) {
        window.location.href = 'https://drive.google.com';
        searching = true;
    }else if (transcript.includes('nhaccuatui')) {
        window.location.href = 'https://www.nhaccuatui.com';
        searching = true;
    }

    if (!searching) {
        // Xử lý các yêu cầu dựa trên nội dung nhận dạng
        if (transcript.includes('google')) {
            window.location.href = 'https://www.google.com';
        } else if (transcript.includes('facebook')) {
            window.location.href = 'https://www.facebook.com';
        } else if (transcript.includes('youtube')) {
            window.location.href = 'https://www.youtube.com';
        } else if (transcript.includes('chỉ đường') || transcript.includes('tới')) {
            const place = transcript.replace(/chỉ đường|tới/g, '').trim();
            window.location.href = `https://maps.google.com?q=${encodeURIComponent(place)}`;
        }else if (transcript.includes('zing mp3')) {
            window.location.href = 'https://zingmp3.vn';
        }else if (transcript.includes('mở bài hát') || transcript.includes('nghe bài hát')) {
            const song = transcript.replace(/mở bài hát|nghe bài hát/g, '').trim();
            window.location.href = `https://zingmp3.vn/tim-kiem/tat-ca?q=${encodeURIComponent(song)}`;
        } else if (transcript.includes('mở video') || transcript.includes('xem video')) {
            const video = transcript.replace(/mở video|xem video/g, '').trim();
            window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`;
        } else {
            result.style.display = 'block';
            result.innerText = 'Không thực hiện được yêu cầu';
            spinner.style.display='none';
            
        }
    }

    status.innerText = 'Hoàn tất';

};

// Xử lý lỗi
recognition.onerror = (event) => {
    console.error('Lỗi nhận diện giọng nói: ', event.error);
    status.innerText = 'Lỗi trong quá trình nhận dạng giọng nói.';
   
};

// Xử lý sự kiện kết thúc khi nhận dạng giọng nói
recognition.onend = () => {
    button.classList.remove('listening');
};
