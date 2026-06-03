const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm tạo hiệu ứng Mây trắng và Sao vàng CÙNG BAY lững lờ sinh động
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; // Tránh tạo trùng lặp khi lật trang
    
    // Tạo 12 đám mây trắng to nhỏ khác nhau trôi ngang
    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        const width = Math.random() * 80 + 60; // từ 60px đến 140px
        cloud.style.width = width + 'px';
        cloud.style.height = (width * 0.4) + 'px';
        cloud.style.top = Math.random() * 80 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 20 + 25 + 's'; 
        cloud.style.animationDelay = Math.random() * -25 + 's'; 
        skyContainer.appendChild(cloud);
    }

    // TỐI ƯU: Tạo 15 ngôi sao lấp lánh CÙNG BAY liên tục giống mây
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        star.style.fontSize = Math.random() * 10 + 12 + 'px';
        star.style.top = Math.random() * 85 + 'vh';
        
        // Gán hoạt ảnh drift (bay ngang) kết hợp starPulse (nhấp nháy phóng to)
        star.style.animation = `drift ${Math.random() * 15 + 20}s linear infinite, starPulse ${Math.random() * 2 + 1}s ease-in-out infinite alternate`;
        star.style.animationDelay = Math.random() * -20 + 's';
        
        skyContainer.appendChild(star);
    }
}

// Khởi tạo thư viện lật sách PageFlip chuyên sâu
function initBookFlip() {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          // Chiều rộng của 1 trang (px)
            height: 580,         // Chiều cao của 1 trang (px)
            size: "stretch",
            minWidth: 260,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            
            // 🌟 CẤU HÌNH LẬT CONG MÉP GIẤY YỂU ĐIỆU & ĐỔ BÓNG 3D 🌟
            drawShadow: true,        // Kích hoạt vẽ bóng nếp gấp khi lật
            flippingTime: 1200,      // Thời gian lật (1.2 giây) tạo chuyển động uốn giấy lướt mượt
            tiltAngle: 30,           // Độ nghiêng bẻ cong góc mép giấy rất điệu khi kéo vuốt
            swipeDistance: 25,       // Độ nhạy tương tác vuốt
            maxShadowOpacity: 0.5,   // Tăng độ sâu bóng đổ lập thể nội bộ trang
            
            mode: "landscape",       // Chế độ mở đôi hai bên như quyển sách thật
            showCover: true,         // Giữ trang bìa nằm chính giữa lúc ban đầu
            
            clickEventForward: true,
            useMouseEvents: true 
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
    }
}

// Click nút mở thiệp
openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Chạy nhạc và hoạt ảnh nền
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ tương tác để phát nhạc:", e));
        
        startSkyAnimation();
        initBookFlip(); // Kích hoạt hiệu ứng lật sách 3D ngay khi vào giao diện chính
    }, 800);
});

// Điều khiển nhạc thủ công
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('rotating');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('rotating');
    }
});