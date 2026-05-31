const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

const scrollUp = document.getElementById('scroll-up');
const scrollDown = document.getElementById('scroll-down');
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');

// Hàm tạo hiệu ứng Mây trắng xốp 3D và Sao vàng tươi mới bay lững lờ
function startSkyAnimation() {
    // Tạo 12 đám mây trắng to nhỏ khác nhau
    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        
        // Tạo kích thước ngẫu nhiên cho đám mây sinh động
        const width = Math.random() * 80 + 60; // từ 60px đến 140px
        const height = width * 0.4;
        cloud.style.width = width + 'px';
        cloud.style.height = height + 'px';
        
        cloud.style.top = Math.random() * 85 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 20 + 20 + 's'; // Tốc độ trôi lững lờ
        cloud.style.animationDelay = Math.random() * -25 + 's'; // Để mây xuất hiện rải rác ngay từ đầu
        
        skyContainer.appendChild(cloud);
    }

    // Tạo 15 ngôi sao vàng lấp lánh đi kèm
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

// Click nút mở thiệp
openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        bgMusic.play().catch(e => console.log("Lỗi duyệt chặn nhạc tự động:", e));
        startSkyAnimation();
    }, 800);
});

// Click nút điều khiển nhạc thủ công
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('rotating');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('rotating');
    }
});

// Bấm nút di chuyển Lên/Xuống
scrollDown.addEventListener('click', () => {
    page2.scrollIntoView({ behavior: 'smooth' });
});

scrollUp.addEventListener('click', () => {
    page1.scrollIntoView({ behavior: 'smooth' });
});