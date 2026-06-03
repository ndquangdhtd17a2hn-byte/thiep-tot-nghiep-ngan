const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm tạo hiệu ứng Mây trắng và Sao vàng trôi tự nhiên tạo chiều sâu không gian
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; 
    
    // Tạo mây trôi nhẹ nhàng với độ mờ ngẫu nhiên
    for (let i = 0; i < 10; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        const width = Math.random() * 100 + 70; 
        cloud.style.width = width + 'px';
        cloud.style.height = (width * 0.4) + 'px';
        cloud.style.top = Math.random() * 75 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 25 + 30 + 's'; 
        cloud.style.animationDelay = Math.random() * -30 + 's';
        cloud.style.opacity = Math.random() * 0.4 + 0.5;
        skyContainer.appendChild(cloud);
    }

    // Tạo sao lấp lánh kết hợp di chuyển sinh động
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        star.style.fontSize = Math.random() * 8 + 12 + 'px';
        star.style.top = Math.random() * 80 + 'vh';
        
        star.style.animation = `drift ${Math.random() * 20 + 25}s linear infinite, starPulse ${Math.random() * 2 + 1.5}s ease-in-out infinite alternate`;
        star.style.animationDelay = Math.random() * -25 + 's';
        
        skyContainer.appendChild(star);
    }
}

// Khởi tạo thư viện lật sách PageFlip chuyên sâu tạo độ cong mềm mại
function initBookFlip() {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          
            height: 580,         
            size: "stretch",
            minWidth: 300,
            maxWidth: 450,
            minHeight: 450,
            maxHeight: 650,
            
            // 🌟 CẤU HÌNH GÓC LẬT VÀ ĐỔ BÓNG 3D MỀM MẠI 🌟
            drawShadow: true,        // Đổ bóng nếp gấp giấy khi mở trang
            flippingTime: 1000,      // Thời gian lật (1 giây) vừa vặn mượt mà
            tiltAngle: 20,           // Giảm góc nghiêng giúp trang sách cuộn cong tự nhiên không bị gãy góc
            swipeDistance: 30,       
            maxShadowOpacity: 0.6,   // Độ đậm bóng đổ vừa vặn để tạo khối 3D sâu
            
            mode: "landscape",       // Chế độ mở đôi quyển sách
            showCover: true,         // Giữ trang bìa ở giữa lúc bắt đầu
            
            clickEventForward: true,
            useMouseEvents: true 
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
    }
}

// Sự kiện click nút mở thiệp mời
openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
        
        // Phát nhạc nền tự động sau tương tác người dùng
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ người dùng nhấn nút để phát nhạc:", e));
        
        startSkyAnimation();
        initBookFlip(); 
    }, 800);
});

// Điều khiển bật/tắt nhạc bằng nút góc màn hình
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('rotating');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('rotating');
    }
});