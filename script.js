const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm tạo hiệu ứng Mây trắng xốp 3D và Sao vàng bay lững lờ
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; // Tránh tạo trùng lặp khi lật đi lật lại
    
    // Tạo 12 đám mây trắng
    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        
        const width = Math.random() * 80 + 60; // từ 60px đến 140px
        const height = width * 0.4;
        cloud.style.width = width + 'px';
        cloud.style.height = height + 'px';
        
        cloud.style.top = Math.random() * 85 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 20 + 20 + 's';
        cloud.style.animationDelay = Math.random() * -25 + 's';
        
        skyContainer.appendChild(cloud);
    }

    // Tạo 15 ngôi sao vàng lấp lánh
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        
        star.style.top = Math.random() * 90 + 'vh';
        star.style.animationDuration = Math.random() * 15 + 20 + 's';
        star.style.animationDelay = Math.random() * -20 + 's';
        
        skyContainer.appendChild(star);
    }
}

// Hàm xử lý phát nhạc tự động khi người dùng bắt đầu tương tác lật trang
function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ người dùng tương tác để phát nhạc:", e));
    }
}

// KHỞI TẠO THƯ VIỆN PAGEFLIP - GIỮ HIỆU ỨNG 3D VÀ CO GỌN TRANG BÌA
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem thư viện PageFlip đã được tải từ CDN thành công chưa
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          // Chiều rộng của 1 trang giấy (px)
            height: 580,         // Chiều cao của trang giấy (px)
            size: "stretch",
            minWidth: 250,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            drawShadow: true,    // Đổ bóng 3D khi lật giấy
            
            mode: "landscape",   // Hiển thị dạng sách đôi nằm ngang khi mở ra
            showCover: true,     // 🌟 MẤU CHỐT: Trang bìa (trang đầu) sẽ hiển thị DẠNG ĐƠN nằm chính giữa, giấu hoàn toàn trang bên trái!
            
            clickEventForward: true,
            useMouseEvents: true // Cho phép dùng chuột kéo lật hoặc vuốt trên điện thoại
        });

        // Nạp danh sách các trang từ HTML vào thư viện điều khiển
        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Bắt sự kiện khi người dùng thực hiện lật trang thành công
        pageFlip.on('flip', (e) => {
            playMusic();         // Phát nhạc ngay khi mở bìa sách
            startSkyAnimation(); // Chạy hiệu ứng mây trời lấp lánh
        });
    } else {
        console.error("Không thể khởi tạo! Vui lòng kiểm tra lại kết nối thư viện PageFlip ở index.html");
    }
});

// Click nút điều khiển nhạc thủ công trên góc màn hình
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