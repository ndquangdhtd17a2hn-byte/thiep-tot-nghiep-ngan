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

// Hàm tạo hiệu ứng mây bay trôi lững lờ dưới nền
function startSkyAnimation() {
    const elements = ['☁️', '☁️', '✨', '⭐️', '☁️'];
    for (let i = 0; i < 25; i++) {
        const element = document.createElement('div');
        element.classList.add('sky-element');
        element.innerText = elements[Math.floor(Math.random() * elements.length)];
        
        element.style.top = Math.random() * 80 + 'vh'; 
        element.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        element.style.opacity = Math.random() * 0.5 + 0.3; 
        element.style.animationDuration = Math.random() * 15 + 15 + 's'; 
        element.style.animationDelay = Math.random() * -20 + 's'; 
        
        skyContainer.appendChild(element);
    }
}

// Click nút mở thiệp
openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Kích hoạt nhạc và mây bay
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

// Xử lý sự kiện bấm nút di chuyển Lên/Xuống mượt mà
scrollDown.addEventListener('click', () => {
    page2.scrollIntoView({ behavior: 'smooth' });
});

scrollUp.addEventListener('click', () => {
    page1.scrollIntoView({ behavior: 'smooth' });
});