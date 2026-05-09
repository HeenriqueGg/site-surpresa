// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Configuração a partir de config.json embutido ---
    const configElement = document.getElementById('configData');
    let config = {
        motherName: "Maria",
        startDate: "1990-05-15",
        messages: [
            { icon: "🌸", front: "Você é meu porto seguro", back: "Nos dias difíceis, só de lembrar do seu abraço, tudo fica bem. Obrigado por ser meu refúgio." },
            { icon: "✨", front: "Gratidão eterna", back: "Cada sacrifício seu me trouxe até aqui. Eu sou quem sou por sua causa, mãe." },
            { icon: "💖", front: "Amor incondicional", back: "Você me ensinou que o amor verdadeiro não espera nada em troca. Isso é o que eu levo para a vida." },
            { icon: "🌙", front: "Noites em claro", back: "Lembro das noites que você ficou ao meu lado quando eu estava doente. Seu carinho me curava." },
            { icon: "🌟", front: "Minha inspiração", back: "Sua força me inspira todos os dias. Você é a mulher mais incrível que eu conheço." },
            { icon: "🕊️", front: "Paz e aconchego", back: "Sua voz é a melodia mais suave que já ouvi. Você é paz em forma de gente." },
            { icon: "🌷", front: "Jardim de amor", back: "Você plantou as flores mais bonitas no jardim da minha vida. Cada pétala é uma lembrança feliz." },
            { icon: "💫", front: "Magia materna", back: "Existe uma magia no seu jeito de cuidar que transforma qualquer momento comum em algo especial." }
        ],
        photos: [
            { src: "", caption: "Mãe, você é luz" },
            { src: "", caption: "Momentos que guardo no coração" },
            { src: "", caption: "Seu sorriso ilumina tudo" }
        ],
        videos: [
            { src: "", title: "Mensagem especial" },
            { src: "", title: "Lembranças felizes" }
        ],
        letterText: "Minha querida mãe,\n\nEscrevo esta carta com lágrimas nos olhos e o coração transbordando de amor. Você é a razão de tudo o que sou. Cada passo que dei na vida foi sustentado pelo seu amor inabalável.\n\nLembro das noites em que você sacrificou seu sono para cuidar de mim, dos dias em que seu sorriso foi minha única certeza em meio às tempestades. Você é meu exemplo de força, bondade e resiliência.\n\nObrigado por cada 'sim', por cada 'não' que me protegeu, por cada abraço apertado e por cada palavra de incentivo. Você é a pessoa mais extraordinária que eu conheço.\n\nSaiba que todo o meu sucesso e felicidade são reflexos do seu amor. Eu te amo além das palavras, além do tempo, além da vida.\n\nEternamente grato(a) e apaixonado(a) por você."
    };

    // Se houver config.json carregado via script, sobrescreve
    if (configElement && configElement.textContent.trim() !== '') {
        try {
            const loaded = JSON.parse(configElement.textContent);
            config = { ...config, ...loaded };
        } catch (e) {
            console.log("Usando configuração padrão.");
        }
    }

    // --- Elementos DOM ---
    const loadingScreen = document.getElementById('loadingScreen');
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const openButton = document.getElementById('openButton');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const particlesCanvas = document.getElementById('particlesCanvas');
    const cursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('cursorTrail');
    const messagesGrid = document.getElementById('messagesGrid');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const letterBody = document.getElementById('letterBody');
    const daysCounter = document.getElementById('daysCounter');
    const hoursCounter = document.getElementById('hoursCounter');
    const minutesCounter = document.getElementById('minutesCounter');
    const secondsCounter = document.getElementById('secondsCounter');
    const interactiveArea = document.getElementById('interactiveArea');
    const finalButton = document.getElementById('finalButton');
    const heartRain = document.getElementById('heartRain');
    const finalOverlay = document.getElementById('finalOverlayMessage');
    const finalStarsContainer = document.getElementById('finalStars');
    const currentYearSpan = document.getElementById('currentYear');
    const heroImageFrame = document.getElementById('heroImageFrame');
    const videoGrid = document.getElementById('videoGrid');

    currentYearSpan.textContent = new Date().getFullYear();

    // --- Hero Image: primeira foto ou placeholder ---
    function updateHeroImage() {
        if (!heroImageFrame) return;
        const firstPhoto = config.photos[0];
        if (firstPhoto && firstPhoto.src) {
            heroImageFrame.innerHTML = `<img src="${firstPhoto.src}" alt="Foto da Mamãe" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">`;
        } else {
            heroImageFrame.innerHTML = `
                <div class="hero-image-placeholder">
                    <span class="hero-image-icon">🌸</span>
                    <p>Foto da Mamãe</p>
                </div>
            `;
        }
    }

    // --- Loading Screen ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    });

    // --- Custom Cursor ---
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.classList.add('active'));
        document.addEventListener('mouseup', () => cursor.classList.remove('active'));
    }

    // --- Partículas de Fundo ---
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > particlesCanvas.width || this.y < 0 || this.y > particlesCanvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 133, 155, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles(count) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    const particleCount = window.innerWidth < 768 ? 45 : 80;
    initParticles(particleCount);

    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- Música ---
    let musicPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(() => {
                alert("Clique novamente para tocar a música.");
            });
            musicToggle.classList.add('playing');
        }
        musicPlaying = !musicPlaying;
    });
    bgMusic.volume = 0.3;

    // --- Abertura ---
    openButton.addEventListener('click', () => {
        openingScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        setTimeout(() => {
            if (!musicPlaying) {
                bgMusic.play().catch(() => {});
                musicToggle.classList.add('playing');
                musicPlaying = true;
            }
        }, 800);
    });

    // --- Mensagens Interativas ---
    function createMessageCards() {
        messagesGrid.innerHTML = '';
        config.messages.forEach((msg, index) => {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <span class="card-icon">${msg.icon}</span>
                        <p>${msg.front}</p>
                        <span class="card-sparkle">✦</span>
                    </div>
                    <div class="card-back">
                        <p>${msg.back}</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                const inner = card.querySelector('.card-inner');
                inner.classList.toggle('flipped');
            });
            messagesGrid.appendChild(card);
        });
    }

    // --- Galeria ---
    function createGallery() {
        galleryGrid.innerHTML = '';
        config.photos.forEach((photo, idx) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animationDelay = `${idx * 0.15}s`;
            if (photo.src) {
                item.innerHTML = `<img src="${photo.src}" alt="${photo.caption}" loading="lazy">`;
            } else {
                item.innerHTML = `<div class="gallery-placeholder">🌸</div>`;
            }
            item.addEventListener('click', () => {
                if (photo.src) {
                    modalImage.src = photo.src;
                } else {
                    modalImage.src = '';
                }
                modalCaption.textContent = photo.caption;
                galleryModal.classList.add('active');
            });
            galleryGrid.appendChild(item);
        });
    }

    // --- Vídeos ---
    function createVideoGrid() {
        if (!videoGrid) return;
        videoGrid.innerHTML = '';
        config.videos.forEach((video) => {
            const card = document.createElement('div');
            card.className = 'video-card';
            if (video.src) {
                // Se for link do YouTube, incorpora iframe; senão, usa tag de vídeo
                if (video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
                    let embedUrl = video.src;
                    if (video.src.includes('watch?v=')) {
                        const videoId = video.src.split('v=')[1]?.split('&')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (video.src.includes('youtu.be/')) {
                        const videoId = video.src.split('youtu.be/')[1]?.split('?')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                    card.innerHTML = `
                        <div class="video-player">
                            <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen style="border-radius:20px;"></iframe>
                        </div>
                        <div class="video-info">${video.title}</div>
                    `;
                } else {
                    card.innerHTML = `
                        <div class="video-player">
                            <video controls style="width:100%;height:100%;border-radius:20px;">
                                <source src="${video.src}" type="video/mp4">
                            </video>
                        </div>
                        <div class="video-info">${video.title}</div>
                    `;
                }
            } else {
                card.innerHTML = `
                    <div class="video-player">🎬</div>
                    <div class="video-info">${video.title}</div>
                `;
            }
            videoGrid.appendChild(card);
        });
    }

    // --- Carta com Typewriter ---
    function typeWriter(text, element, speed = 25) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(config.letterText, letterBody, 22);
                letterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    if (letterBody) letterObserver.observe(letterBody);

    // --- Contador ---
    function updateCounter() {
        const start = new Date(config.startDate);
        const now = new Date();
        const diff = now - start;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysCounter) daysCounter.textContent = days.toLocaleString();
        if (hoursCounter) hoursCounter.textContent = hours;
        if (minutesCounter) minutesCounter.textContent = minutes;
        if (secondsCounter) secondsCounter.textContent = seconds;
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // --- Seção Interativa ---
    function createFloatingElement(x, y) {
        const el = document.createElement('span');
        const isHeart = Math.random() > 0.5;
        el.textContent = isHeart ? '❤️' : '✨';
        el.style.position = 'fixed';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '200';
        el.style.animation = 'fadeInUp 1.5s ease forwards';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    }

    interactiveArea.addEventListener('click', (e) => {
        const rect = interactiveArea.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingElement(x + (Math.random()-0.5)*60, y + (Math.random()-0.5)*60);
            }, i * 50);
        }
        const randomMsg = config.messages[Math.floor(Math.random() * config.messages.length)];
        const msgEl = document.createElement('div');
        msgEl.textContent = randomMsg.front;
        msgEl.style.position = 'fixed';
        msgEl.style.left = x + 'px';
        msgEl.style.top = y + 'px';
        msgEl.style.transform = 'translate(-50%, -50%)';
        msgEl.style.padding = '0.8rem 1.5rem';
        msgEl.style.background = 'rgba(255,255,255,0.8)';
        msgEl.style.backdropFilter = 'blur(10px)';
        msgEl.style.borderRadius = '30px';
        msgEl.style.fontFamily = 'var(--fonte-titulos)';
        msgEl.style.color = '#4a3548';
        msgEl.style.zIndex = '250';
        msgEl.style.pointerEvents = 'none';
        msgEl.style.animation = 'fadeInUp 2s ease forwards';
        document.body.appendChild(msgEl);
        setTimeout(() => msgEl.remove(), 2000);
    });

    // --- Final: Estrelas e Chuva de Corações ---
    function createStars() {
        if (!finalStarsContainer) return;
        finalStarsContainer.innerHTML = '';
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('span');
            star.textContent = '✦';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = (Math.random() * 12 + 6) + 'px';
            star.style.color = '#fff';
            star.style.opacity = Math.random() * 0.8 + 0.2;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease infinite`;
            finalStarsContainer.appendChild(star);
        }
    }
    createStars();

    finalButton.addEventListener('click', () => {
        finalOverlay.classList.add('active');
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.textContent = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '-20px';
                heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
                heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                heart.style.pointerEvents = 'none';
                heartRain.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, i * 80);
        }
    });

    finalOverlay.addEventListener('click', () => {
        finalOverlay.classList.remove('active');
    });

    // Estilo adicional para chuva
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Inicializações ---
    updateHeroImage();
    createMessageCards();
    createGallery();
    createVideoGrid();

    // --- Scroll Reveal simples ---
    const revealElements = document.querySelectorAll('.section-header, .hero-text-content, .gallery-item, .message-card, .video-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease both';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
});