const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm tạo hiệu ứng sinh động: Mây bay, Sao lấp lánh và Hoa rơi lãng mạn
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; // Tránh tạo trùng lặp
    
    // 1. Tạo 12 đám mây trắng xốp
    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('bright-cloud');
        const width = Math.random() * 80 + 60;
        cloud.style.width = width + 'px';
        cloud.style.height = (width * 0.4) + 'px';
        cloud.style.top = Math.random() * 80 + 'vh'; 
        cloud.style.animationDuration = Math.random() * 20 + 25 + 's';
        cloud.style.animationDelay = Math.random() * -20 + 's';
        skyContainer.appendChild(cloud);
    }

    // 2. Tạo 15 ngôi sao lấp lánh ẩn hiện
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        star.style.top = Math.random() * 90 + 'vh';
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        star.style.animationDelay = Math.random() * -5 + 's';
        skyContainer.appendChild(star);
    }

    // 3. Hiệu ứng Sinh động: 20 cánh hoa/lá bay uốn lượn yểu điệu
    const petals = ['🌸', '🍁', '✨', '🍃'];
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.classList.add('falling-petal');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = Math.random() * 15 + 12 + 'px';
        petal.style.animationDuration = Math.random() * 6 + 6 + 's'; // Tốc độ rơi ngẫu nhiên
        petal.style.animationDelay = Math.random() * -10 + 's';
        skyContainer.appendChild(petal);
    }
}

function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Chờ tương tác người dùng để bật nhạc..."));
    }
}

// KHỞI TẠO PAGEFLIP VỚI HIỆU ỨNG UỐN CONG MÉP GIẤY YỂU ĐIỆU
document.addEventListener('DOMContentLoaded', () => {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          // Chiều rộng một trang
            height: 580,         // Chiều cao một trang
            size: "stretch",
            minWidth: 250,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            
            // 🌟 CẤU HÌNH ĐỘ CONG VÀ ĐỔ BÓNG 3D TUYỆT ĐỐI 🌟
            drawShadow: true,        // Bắt buộc vẽ bóng đổ của nếp giấy khi uốn
            flippingTime: 1200,      // Thời gian lật (1.2 giây) giúp trang giấy uốn cong từ từ, mềm mại
            tiltAngle: 30,           // Độ nghiêng bẻ cong mép góc trang sách cực lớn khi vuốt lướt
            swipeDistance: 25,       // Độ nhạy vuốt lướt tay rất mượt
            maxShadowOpacity: 0.45,  // Tăng độ đậm nét của bóng đổ lập thể
            
            mode: "landscape",   
            showCover: true,         // Giữ bìa đơn ở giữa, triệt tiêu khoảng trống xám
            
            clickEventForward: true,
            useMouseEvents: true 
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));

        // Sự kiện lật: Vừa chạm vuốt mở bìa là kích hoạt nhạc và hoa rơi
        pageFlip.on('flip', (e) => {
            playMusic();         
            startSkyAnimation(); 
        });
    }