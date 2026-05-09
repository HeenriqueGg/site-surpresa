// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Bloqueia scroll durante abertura
    document.body.classList.add('opening-active');

    // --- Elementos DOM principais ---
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

    // --- Configuração padrão (fallback) ---
    let config = {
        motherName: "Mãe",
        startDate: "1990-05-15",
        messages: [],
        photos: [],
        videos: [],
        letterText: "Uma linda carta para você..."
    };

    // --- Carrega config.json via fetch (funciona local e online) ---
    fetch('config.json')
        .then(response => {
            if (!response.ok) throw new Error('config.json não encontrado');
            return response.json();
        })
        .then(data => {
            config = { ...config, ...data };
        })
        .catch(err => {
            console.warn('Usando configuração padrão:', err.message);
        })
        .finally(() => {
            // Só inicializa o site depois de carregar (ou falhar) o config
            inicializarSite();
        });

    function inicializarSite() {
        // Loading
        window.addEventListener('load', () => {
            setTimeout(() => loadingScreen.classList.add('hidden'), 1500);
        });

        // Cursor customizado (desktop)
        if (window.innerWidth > 1024) {
            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
            document.addEventListener('mousedown', () => cursor.classList.add('active'));
            document.addEventListener('mouseup', () => cursor.classList.remove('active'));
        }

        // Partículas de fundo
        iniciarParticulas();

        // Música
        let musicPlaying = false;
        musicToggle.addEventListener('click', () => {
            if (musicPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            } else {
                bgMusic.play().catch(() => alert("Clique novamente para tocar a música."));
                musicToggle.classList.add('playing');
            }
            musicPlaying = !musicPlaying;
        });
        bgMusic.volume = 0.3;

        // Abertura
        openButton.addEventListener('click', () => {
            openingScreen.classList.add('hidden');
            mainContent.classList.add('visible');
            document.body.classList.remove('opening-active'); // libera scroll
            setTimeout(() => {
                if (!musicPlaying) {
                    bgMusic.play().catch(() => {});
                    musicToggle.classList.add('playing');
                    musicPlaying = true;
                }
            }, 800);
        });

        // Hero image
        atualizarHeroImage();

        // Criar componentes
        criarCartasMensagens();
        criarGaleria();
        criarVideos();
        iniciarCartaTypewriter();
        iniciarContador();
        iniciarInteratividade();
        criarEstrelasFinais();
        configurarBotaoFinal();

        // Scroll reveal
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
    }

    function atualizarHeroImage() {
        if (!heroImageFrame) return;
        const primeiraFoto = config.photos?.[0];
        if (primeiraFoto?.src) {
            heroImageFrame.innerHTML = `<img src="${primeiraFoto.src}" alt="Foto da Mamãe" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">`;
        } else {
            heroImageFrame.innerHTML = `<div class="hero-image-placeholder"><span class="hero-image-icon">🌸</span><p>Foto da Mamãe</p></div>`;
        }
    }

    function criarCartasMensagens() {
        if (!messagesGrid || !config.messages) return;
        messagesGrid.innerHTML = '';
        config.messages.forEach((msg, i) => {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.style.animationDelay = `${i * 0.1}s`;
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <span class="card-icon">${msg.icon}</span>
                        <p>${msg.front}</p>
                        <span class="card-sparkle">✦</span>
                    </div>
                    <div class="card-back"><p>${msg.back}</p></div>
                </div>`;
            card.addEventListener('click', () => card.querySelector('.card-inner').classList.toggle('flipped'));
            messagesGrid.appendChild(card);
        });
    }

    function criarGaleria() {
        if (!galleryGrid || !config.photos) return;
        galleryGrid.innerHTML = '';
        config.photos.forEach((foto, i) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.animationDelay = `${i * 0.15}s`;
            if (foto.src) {
                item.innerHTML = `<img src="${foto.src}" alt="${foto.caption}" loading="lazy">`;
            } else {
                item.innerHTML = `<div class="gallery-placeholder">🌸</div>`;
            }
            item.addEventListener('click', () => {
                modalImage.src = foto.src || '';
                modalCaption.textContent = foto.caption;
                galleryModal.classList.add('active');
            });
            galleryGrid.appendChild(item);
        });
        modalClose.addEventListener('click', () => galleryModal.classList.remove('active'));
        document.querySelector('.modal-overlay')?.addEventListener('click', () => galleryModal.classList.remove('active'));
    }

    function criarVideos() {
        if (!videoGrid || !config.videos) return;
        videoGrid.innerHTML = '';
        config.videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            if (video.src) {
                if (video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
                    let embedUrl = video.src;
                    if (video.src.includes('watch?v=')) {
                        const videoId = video.src.split('v=')[1]?.split('&')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    } else if (video.src.includes('youtu.be/')) {
                        const videoId = video.src.split('youtu.be/')[1]?.split('?')[0];
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                    card.innerHTML = `<div class="video-player"><iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen style="border-radius:20px;"></iframe></div><div class="video-info">${video.title}</div>`;
                } else {
                    card.innerHTML = `<div class="video-player"><video controls style="width:100%;height:100%;border-radius:20px;"><source src="${video.src}" type="video/mp4"></video></div><div class="video-info">${video.title}</div>`;
                }
            } else {
                card.innerHTML = `<div class="video-player">🎬</div><div class="video-info">${video.title}</div>`;
            }
            videoGrid.appendChild(card);
        });
    }

    function iniciarCartaTypewriter() {
        if (!letterBody || !config.letterText) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(config.letterText, letterBody, 22);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(letterBody);
    }

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

    function iniciarContador() {
        function update() {
            const start = new Date(config.startDate);
            const now = new Date();
            const diff = now - start;
            if (daysCounter) daysCounter.textContent = Math.floor(diff / 86400000).toLocaleString();
            if (hoursCounter) hoursCounter.textContent = Math.floor((diff % 86400000) / 3600000);
            if (minutesCounter) minutesCounter.textContent = Math.floor((diff % 3600000) / 60000);
            if (secondsCounter) secondsCounter.textContent = Math.floor((diff % 60000) / 1000);
        }
        update();
        setInterval(update, 1000);
    }

    function iniciarInteratividade() {
        if (!interactiveArea) return;
        interactiveArea.addEventListener('click', (e) => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const el = document.createElement('span');
                    el.textContent = Math.random() > 0.5 ? '❤️' : '✨';
                    el.style.cssText = `position:fixed; left:${e.clientX + (Math.random()-0.5)*60}px; top:${e.clientY + (Math.random()-0.5)*60}px; font-size:${Math.random()*20+15}px; pointer-events:none; z-index:200; animation:fadeInUp 1.5s ease forwards;`;
                    document.body.appendChild(el);
                    setTimeout(() => el.remove(), 1500);
                }, i * 50);
            }
            const msg = config.messages?.[Math.floor(Math.random() * config.messages.length)];
            if (msg) {
                const msgEl = document.createElement('div');
                msgEl.textContent = msg.front;
                msgEl.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; transform:translate(-50%,-50%); padding:0.8rem 1.5rem; background:rgba(255,255,255,0.8); backdrop-filter:blur(10px); border-radius:30px; font-family:var(--fonte-titulos); color:#4a3548; z-index:250; animation:fadeInUp 2s ease forwards;`;
                document.body.appendChild(msgEl);
                setTimeout(() => msgEl.remove(), 2000);
            }
        });
    }

    function criarEstrelasFinais() {
        if (!finalStarsContainer) return;
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('span');
            star.textContent = '✦';
            star.style.cssText = `position:absolute; left:${Math.random()*100}%; top:${Math.random()*100}%; font-size:${Math.random()*12+6}px; color:#fff; opacity:${Math.random()*0.8+0.2}; animation:twinkle ${Math.random()*3+2}s infinite;`;
            finalStarsContainer.appendChild(star);
        }
    }

    function configurarBotaoFinal() {
        if (!finalButton) return;
        finalButton.addEventListener('click', () => {
            finalOverlay.classList.add('active');
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const heart = document.createElement('span');
                    heart.textContent = '❤️';
                    heart.style.cssText = `position:absolute; left:${Math.random()*100}%; top:-20px; font-size:${Math.random()*30+15}px; animation:fall ${Math.random()*3+2}s linear forwards;`;
                    heartRain.appendChild(heart);
                    setTimeout(() => heart.remove(), 4000);
                }, i * 80);
            }
        });
        finalOverlay.addEventListener('click', () => finalOverlay.classList.remove('active'));
    }

    function iniciarParticulas() {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        function resize() {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() { this.reset(); }
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
                if (this.x < 0 || this.x > particlesCanvas.width || this.y < 0 || this.y > particlesCanvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 133, 155, ${this.opacity})`;
                ctx.fill();
            }
        }
        for (let i = 0; i < (window.innerWidth < 768 ? 45 : 80); i++) particles.push(new Particle());
        function animate() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }
});