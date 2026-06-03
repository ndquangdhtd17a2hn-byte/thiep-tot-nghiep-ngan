const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; 
    
    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        const width = Math.random() * 80 + 60;
        const height = width * 0.4;
        cloud.style.width = width + 'px';
        cloud.style.height = height + 'px';
        cloud.style.top = Math.random() * 85 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 20 + 20 + 's';
        cloud.style.animationDelay = Math.random() * -25 + 's';
        skyContainer.appendChild(cloud);
    }

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

function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ tương tác để phát nhạc:", e));
    }
}

// KHỞI TẠO PAGEFLIP VỚI CẤU HÌNH SIÊU MỀM MẠI
document.addEventListener('DOMContentLoaded', () => {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          
            height: 580,         
            size: "stretch",
            minWidth: 250,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            
            // 🌟 CẤU HÌNH TẠO ĐỘ MỀM VÀ ĐỔ BÓNG 3D 🌟
            drawShadow: true,        // Kích hoạt đổ bóng động của thư viện khi lật
            flippingTime: 1000,      // Thời gian lật (1000ms = 1 giây) giúp giấy uốn cong chậm mượt
            tiltAngle: 25,           // Tạo độ nghiêng uốn góc giấy tự nhiên khi kéo vuốt
            swipeDistance: 30,       // Độ nhạy vuốt lướt bằng tay
            
            mode: "landscape",   
            showCover: true,         // Giữ bìa đơn chính giữa lúc đầu, cắt bỏ phần xám thừa
            
            clickEventForward: true,
            useMouseEvents: true 
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        pageFlip.on('flip', (e) => {
            playMusic();         
            startSkyAnimation(); 
        });
    }
});

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