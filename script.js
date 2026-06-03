const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm kích hoạt phát nhạc nền ngay lập tức
function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(err => console.log("Chờ vuốt lật trang bìa để duyệt nhạc..."));
    }
}

// KHỞI TẠO CUỐN SÁCH: ĐÓNG BAN ĐẦU -> VUỐT LẬT MỞ ĐÔI 45 ĐỘ
document.addEventListener('DOMContentLoaded', () => {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,   
            height: 600,  
            size: "stretch",
            minWidth: 200,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            drawShadow: true, 
            
            // 🌟 CẤU HÌNH THÔNG MINH CHO QUYỂN SÁCH ĐÓNG TỰ NHIÊN:
            usePortrait: true,     // Bắt đầu bằng chế độ trang đơn (chỉ thấy trang bìa đơn khi đóng sách)
            autoSize: true,
            
            startPage: 0,
        });

        // Nạp các trang giấy vào hệ thống
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // 🌟 BẮT SỰ KIỆN QUAN TRỌNG: Khách vừa chạm vuốt mở trang bìa đầu tiên!
        pageFlip.on('flip', (e) => {
            // 1. Kích hoạt phát nhạc ngay tức khắc khi trang bìa chuyển động
            playMusic();
            
            // 2. Chuyển sách sang hiển thị chế độ ĐÔI (landscape) để lộ góc cong 45 độ và gáy giữa đậm sắc nét!
            if (e.data === 1) {
                pageFlip.update({ usePortrait: false });
            }
            // Nếu khách lật ngược quay lại trang bìa ngoài cùng -> Đóng sách lại gọn gàng
            if (e.data === 0) {
                pageFlip.update({ usePortrait: true });
            }
        });
    }
});

// Hàm tạo hiệu ứng mây trôi lững lờ dưới nền trời
function createClouds() {
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

// Điều khiển nhạc bằng đĩa xoay thủ công cố định
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