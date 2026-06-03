const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm kích hoạt nhạc khi người dùng tương tác lật trang sách
function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(err => console.log("Trình duyệt đợi thao tác lật trang mạnh hơn để phát nhạc..."));
    }
}

// KHỞI TẠO HIỆU ỨNG LẬT SÁCH 3D SAU KHI TẢI TRANG
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem thư viện St đã sẵn sàng chưa để tránh crash code
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,
            height: 600,
            size: "stretch",
            minWidth: 300,
            maxWidth: 450,
            minHeight: 450,
            maxHeight: 700,
            drawShadow: true,   // Đổ bóng tạo nếp gấp 3D ở gáy sách cực chân thật
            usePortrait: true,  // Bắt buộc hiển thị dạng trang đơn dọc để đẹp nhất trên điện thoại
            startPage: 0,
        });

        // Nạp tất cả các trang (.page) có trong file HTML của Ngân vào hệ thống sách
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // BẮT SỰ KIỆN: Khách vừa vuốt tay lật trang -> Kích hoạt nhạc Young and Beautiful ngay lập tức!
        pageFlip.on('flip', (e) => {
            playMusic();
        });
    } else {
        console.error("Lỗi: Không tải được thư viện lật trang PageFlip từ CDN. Vui lòng kiểm tra kết nối mạng!");
    }
});

// Hàm tạo bầu trời mây trắng và sao lấp lánh trôi lững lờ dưới nền
function createClouds() {
    for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'bright-cloud';
        const w = Math.random() * 100 + 60;
        cloud.style.width = w + 'px';
        cloud.style.height = (w * 0.4) + 'px';
        cloud.style.top = Math.random() * 90 + 'vh';
        cloud.style.animationDuration = Math.random() * 20 + 20 + 's';
        cloud.style.animationDelay = Math.random() * -20 + 's';
        skyContainer.appendChild(cloud);
    }
}
createClouds();

// Xử lý bật/tắt nhạc thủ công khi bấm vào đĩa nhạc tròn
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