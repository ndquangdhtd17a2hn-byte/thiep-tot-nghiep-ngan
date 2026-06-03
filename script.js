const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm kích hoạt phát nhạc nền khi lật trang sách thành công
function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(err => console.log("Đang đợi tương tác vuốt mạnh để kích hoạt nhạc..."));
    }
}

// KHỞI TẠO CUỐN SÁCH MỞ ĐÔI SONG SONG (CỐ ĐỊNH 2 TRANG)
document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo thư viện PageFlip đã được nạp chính xác từ link CDN ở file HTML
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,   // Chiều rộng của 1 trang đơn
            height: 600,  // Chiều cao của trang
            size: "stretch",
            minWidth: 200,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            drawShadow: true, // Kích hoạt đổ bóng 3D ở giữa gáy sách khi lật trang
            
            // 🌟 CẤU HÌNH ĐỂ KHÔNG BỊ MẤT TRANG CŨ (HIỂN THỊ ĐÔI TRÁI - PHẢI)
            usePortrait: false, // Tắt chế độ trang đơn dọc
            mode: "landscape",  // Ép buộc cuốn sách luôn mở đôi dạng nằm ngang rộng rãi
            
            startPage: 0,
        });

        // Đổ toàn bộ các khối trang .page vào cấu trúc lật của thư viện
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Sự kiện: Khi khách vuốt lật trang sách -> Tự động đánh nhạc ngay!
        pageFlip.on('flip', (e) => {
            playMusic();
        });
    } else {
        console.error("Lỗi: Chưa kết nối hoặc lỗi đường truyền thư viện lật trang PageFlip!");
    }
});

// Hàm tạo hiệu ứng sinh đám mây trắng 3D và sao bay lơ lửng ngẫu nhiên dưới nền
function createClouds() {
    // Tạo 8 đám mây trôi lững lờ từ trái qua phải
    for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'bright-cloud';
        const w = Math.random() * 100 + 60;
        cloud.style.width = w + 'px';
        cloud.style.height = (w * 0.4) + 'px';
        cloud.style.top = Math.random() * 85 + 'vh';
        cloud.style.animationDuration = Math.random() * 20 + 20 + 's';
        cloud.style.animationDelay = Math.random() * -20 + 's';
        skyContainer.appendChild(cloud);
    }
}
createClouds();

// Xử lý sự kiện bấm nút đĩa nhạc thủ công
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('rotating');
        musicStarted = true;
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('rotating');
    }
});