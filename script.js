const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const skyContainer = document.getElementById('sky-container');

let musicStarted = false;

function startSkyAnimation() {
    if (skyContainer.children.length > 0) return; 
    
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
            
            drawShadow: true,        
            flippingTime: 1000,      
            tiltAngle: 20,           
            swipeDistance: 30,       
            maxShadowOpacity: 0.6,   
            
            mode: "landscape",       
            showCover: true,         
            
            clickEventForward: true,
            useMouseEvents: true 
        });

        pageFlip.loadFromHTML(document.querySelectorAll('.page'));
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
        }).catch(e => console.log("Hệ thống chờ tương tác:", e));
        
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