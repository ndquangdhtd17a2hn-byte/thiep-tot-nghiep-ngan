const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Tạo hiệu ứng âm thanh lật giấy vật lý sắc nét tự động từ đám mây (Không lo lỗi thiếu file)
const flipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
flipSound.volume = 0.5;

// Hàm tạo hiệu ứng Mây trắng và Sao vàng BAY LƯỢN thực tế (Sửa lỗi sao đứng yên)
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; 
    
    // 1. Tạo mây trôi nhẹ nhàng
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

    // 2. Tạo sao VỪA BAY VỪA LẤP LÁNH (Ép chạy bằng Javascript để không bị AnyFlip làm đứng im)
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        star.style.fontSize = Math.random() * 8 + 12 + 'px';
        star.style.top = Math.random() * 80 + 'vh';
        
        // Cho xuất hiện rải rác ngẫu nhiên trên màn hình ngay từ đầu
        let currentX = Math.random() * window.innerWidth;
        star.style.left = currentX + 'px';
        
        // Giữ hiệu ứng lấp lánh (phóng to thu nhỏ) bằng CSS
        star.style.animation = `starPulse ${Math.random() * 2 + 1.5}s ease-in-out infinite alternate`;
        skyContainer.appendChild(star);

        // Lập trình dịch chuyển: Ép ngôi sao phải tịnh tiến sang phải liên tục
        const speed = Math.random() * 0.5 + 0.3; // Tốc độ bay ngẫu nhiên của từng ngôi sao
        function moveStar() {
            currentX += speed;
            // Nếu ngôi sao bay khuất màn hình bên phải, cho nó quay lại xuất hiện từ bên trái (-30px)
            if (currentX > window.innerWidth) {
                currentX = -30;
                star.style.top = Math.random() * 80 + 'vh'; // Đổi tầng cao cho tự nhiên
            }
            star.style.left = currentX + 'px';
            requestAnimationFrame(moveStar); // Vòng lặp chuyển động mượt mà 60fps
        }
        
        // Kích hoạt cho sao bay
        requestAnimationFrame(moveStar);
    }
}
// 🌟 ĐỒNG BỘ CẤU HÌNH KIỂU LẬT ANYFLIP HIGH-END 🌟[cite: 6]
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
            
            drawShadow: true,          // Bật bóng đổ lập thể nếp giấy
            flippingTime: 800,         // Thời gian lật (0.8 giây) nhanh nhạy dứt khoát[cite: 6]
            tiltAngle: 35,             // Góc vát uốn cong chéo góc sâu mềm mại[cite: 6]
            swipeDistance: 15,         // Độ nhạy tương tác vuốt khều[cite: 6]
            maxShadowOpacity: 0.7,     // Độ sâu bóng đổ gáy rõ rệt[cite: 6]
            
            mode: "landscape",       
            showCover: true,         
            
            clickEventForward: true,
            useMouseEvents: true,
            showPageCorners: true      // Tự động uốn vểnh nhẹ góc giấy mời gọi lật khi di chuột tới[cite: 6]
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Đồng bộ kích hoạt tiếng "Xoẹt" lật giấy AnyFlip[cite: 6]
        pageFlip.on('flip', (e) => {
            flipSound.currentTime = 0;
            flipSound.play().catch(err => console.log("Hệ thống chờ tương tác phát sound:", err));
        });
    }
}

openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
        
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ tương tác để phát nhạc:", e));
        
        startSkyAnimation();
        initBookFlip(); 
    }, 800);
});

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('rotating');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('rotating');
    }
});