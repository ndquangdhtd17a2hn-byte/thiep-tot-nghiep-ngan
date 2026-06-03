const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm kích hoạt nhạc nền
function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(err => console.log("Chờ tương tác vuốt lật để phát nhạc..."));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,       // Chiều rộng của 1 trang giấy
            height: 600,      // Chiều cao của 1 trang giấy
            size: "stretch",
            minWidth: 200,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            drawShadow: true, 
            
            // 🌟 CẤU HÌNH QUAN TRỌNG ĐỂ ĐÓNG SÁCH BAN ĐẦU 🌟
            mode: "landscape",   // Vẫn giữ chế độ xem đôi cho nội dung bên trong
            showCover: true,     // ÉP TRANG ĐẦU TIÊN (TRANG BÌA) PHẢI ĐÓNG KHÍT LẠI CHỈ HIỆN 1 TRANG
            
            clickEventForward: true,
            useMouseEvents: true
        });

        // Nạp các trang giấy từ HTML
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Sự kiện xảy ra khi người dùng lật trang
        pageFlip.on('flip', (e) => {
            // Kích hoạt nhạc ngay lập tức khi trang bìa vừa dịch chuyển
            playMusic();
        });
    }
});

// Hiệu ứng đám mây trôi dưới nền
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

// Nút đĩa nhạc thủ công
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