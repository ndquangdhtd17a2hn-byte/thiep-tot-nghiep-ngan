const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

// Hàm tạo hiệu ứng Mây và Sao cùng bay lững lờ sinh động, kết hợp hoa rơi yểu điệu
function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; // Tránh tạo trùng lặp khi lật đi lật lại
    
    // 1. Tạo 12 đám mây trắng xốp bay lững lờ từ trái qua phải
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

    // 2. 🌟 SỬA ĐỔI: Tạo 15 ngôi sao vàng bay di động giống như mây 🌟
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        star.innerHTML = Math.random() > 0.5 ? '✨' : '⭐️';
        star.style.fontSize = Math.random() * 10 + 12 + 'px'; // Kích thước sao ngẫu nhiên
        star.style.top = Math.random() * 85 + 'vh';
        // Sử dụng chung hiệu ứng di chuyển 'drift' liên tục như mây
        star.style.animation = `drift ${Math.random() * 15 + 20}s linear infinite, starPulse ${Math.random() * 2 + 1}s ease-in-out infinite alternate`;
        star.style.animationDelay = Math.random() * -20 + 's';
        skyContainer.appendChild(star);
    }

    // 3. Hiệu ứng cánh hoa bay chao đảo tăng tính lãng mạn
    const petals = ['🌸', '🍁', '🍃'];
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('falling-petal');
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = Math.random() * 12 + 12 + 'px';
        petal.style.animationDuration = Math.random() * 6 + 6 + 's';
        petal.style.animationDelay = Math.random() * -10 + 's';
        skyContainer.appendChild(petal);
    }
}

function playMusic() {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicToggle.classList.add('rotating');
        }).catch(e => console.log("Hệ thống chờ người dùng tương tác để phát nhạc:", e));
    }
}

// KHỞI TẠO THƯ VIỆN PAGEFLIP - TỐI ƯU ĐỘ CONG MÉP GIẤY VÀ SIÊU ĐỔ BÓNG 3D
document.addEventListener('DOMContentLoaded', () => {
    if (typeof St !== 'undefined' && St.PageFlip) {
        const pageFlip = new St.PageFlip(document.getElementById('my-book'), {
            width: 400,          // Chiều rộng một trang (px)
            height: 580,         // Chiều cao một trang (px)
            size: "stretch",
            minWidth: 250,
            maxWidth: 450,
            minHeight: 400,
            maxHeight: 650,
            
            // 🌟 CẤU HÌNH KHÔI PHỤC ĐỘ MỀM MẠI YỂU ĐIỆU CỦA CODE CŨ 🌟
            drawShadow: true,        // Vẽ bóng đổ động của nếp giấy khi uốn cong
            flippingTime: 1200,      // Thời gian lật (1.2 giây) giúp trang giấy lướt uốn từ từ, mềm mại
            tiltAngle: 30,           // Độ nghiêng bẻ cong góc mép trang sách lớn khi vuốt kéo tay
            swipeDistance: 25,       // Độ nhạy vuốt lướt cực nhẹ trên điện thoại
            maxShadowOpacity: 0.5,   // Tăng độ đậm của bóng đổ lập thể
            
            mode: "landscape",   
            showCover: true,         // Giữ trang bìa đơn nằm chính giữa lúc đầu, giấu khoảng xám thừa