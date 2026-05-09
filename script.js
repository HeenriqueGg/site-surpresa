// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Bloqueia scroll durante a abertura ---
    document.body.classList.add('opening-active');

    // --- Elementos essenciais que funcionam sem config ---
    const loadingScreen = document.getElementById('loadingScreen');
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const openButton = document.getElementById('openButton');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const particlesCanvas = document.getElementById('particlesCanvas');
    const cursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('cursorTrail');
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // --- Esconde a tela de carregamento após 1,5s (sempre) ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
        }, 1500);
    });

    // --- Cursor personalizado (desktop) ---
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.classList.add('active'));
        document.addEventListener('mouseup', () => cursor.classList.remove('active'));
    }

    // --- Partículas de fundo (iniciam mesmo sem config) ---
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

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
    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- Música (botão já funciona independente) ---
    let musicPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(() => {});
            musicToggle.classList.add('playing');
        }
        musicPlaying = !musicPlaying;
    });
    bgMusic.volume = 0.3;

    // --- Configuração padrão (fallback, será sobrescrita) ---
    let config = {
        motherName: "Adylavia",
        startDate: "2009-06-18",
        messages: [],
        photos: [],
        videos: [],
        letterText: "Uma linda carta para você..."
    };

    // --- Função que constrói todo o conteúdo personalizado ---
    function construirConteudo() {
        // Hero: foto principal
        const heroFrame = document.getElementById('heroImageFrame');
        if (heroFrame) {
            const primeiraFoto = config.photos?.[0];
            if (primeiraFoto?.src) {
                heroFrame.innerHTML = `<img src="${primeiraFoto.src}" alt="Foto da Mamãe" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">`;
            } else {
                heroFrame.innerHTML = `<div class="hero-image-placeholder"><span class="hero-image-icon">🌸</span><p>Foto da Mamãe</p></div>`;
            }
        }

        // Caixa de Mensagens
        const msgGrid = document.getElementById('messagesGrid');
        if (msgGrid && config.messages) {
            msgGrid.innerHTML = '';
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
                msgGrid.appendChild(card);
            });
        }

        // Galeria de Fotos
        const galGrid = document.getElementById('galleryGrid');
        const galModal = document.getElementById('galleryModal');
        const modalImg = document.getElementById('modalImage');
        const modalCap = document.getElementById('modalCaption');
        if (galGrid && config.photos) {
            galGrid.innerHTML = '';
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
                    modalImg.src = foto.src || '';
                    modalCap.textContent = foto.caption;
                    galModal.classList.add('active');
                });
                galGrid.appendChild(item);
            });
            document.getElementById('modalClose').addEventListener('click', () => galModal.classList.remove('active'));
            document.querySelector('.modal-overlay')?.addEventListener('click', () => galModal.classList.remove('active'));
        }

        // Álbum de Vídeos
        const vidGrid = document.getElementById('videoGrid');
        if (vidGrid && config.videos) {
            vidGrid.innerHTML = '';
            config.videos.forEach(video => {
                const card = document.createElement('div');
                card.className = 'video-card';
                if (video.src) {
                    if (video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
                        let embedUrl = video.src;
                        if (video.src.includes('watch?v=')) {
                            const id = video.src.split('v=')[1]?.split('&')[0];
                            embedUrl = `https://www.youtube.com/embed/${id}`;
                        } else if (video.src.includes('youtu.be/')) {
                            const id = video.src.split('youtu.be/')[1]?.split('?')[0];
                            embedUrl = `https://www.youtube.com/embed/${id}`;
                        }
                        card.innerHTML = `<div class="video-player"><iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen style="border-radius:20px;"></iframe></div><div class="video-info">${video.title}</div>`;
                    } else {
                        card.innerHTML = `<div class="video-player"><video controls style="width:100%;height:100%;border-radius:20px;"><source src="${video.src}" type="video/mp4"></video></div><div class="video-info">${video.title}</div>`;
                    }
                } else {
                    card.innerHTML = `<div class="video-player">🎬</div><div class="video-info">${video.title}</div>`;
                }
                vidGrid.appendChild(card);
            });
        }

        // Carta com efeito máquina de escrever
        const letterBody = document.getElementById('letterBody');
        if (letterBody && config.letterText) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let i = 0;
                        letterBody.textContent = '';
                        function type() {
                            if (i < config.letterText.length) {
                                letterBody.textContent += config.letterText.charAt(i);
                                i++;
                                setTimeout(type, 22);
                            }
                        }
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(letterBody);
        }

        // Contador
        function atualizarContador() {
            const start = new Date(config.startDate);
            const now = new Date();
            const diff = now - start;
            document.getElementById('daysCounter').textContent = Math.floor(diff / 86400000).toLocaleString();
            document.getElementById('hoursCounter').textContent = Math.floor((diff % 86400000) / 3600000);
            document.getElementById('minutesCounter').textContent = Math.floor((diff % 3600000) / 60000);
            document.getElementById('secondsCounter').textContent = Math.floor((diff % 60000) / 1000);
        }
        atualizarContador();
        setInterval(atualizarContador, 1000);

        // Seção interativa
        const interactiveArea = document.getElementById('interactiveArea');
        if (interactiveArea) {
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

        // Estrelas do céu final
        const finalStars = document.getElementById('finalStars');
        if (finalStars) {
            for (let i = 0; i < 80; i++) {
                const star = document.createElement('span');
                star.textContent = '✦';
                star.style.cssText = `position:absolute; left:${Math.random()*100}%; top:${Math.random()*100}%; font-size:${Math.random()*12+6}px; color:#fff; opacity:${Math.random()*0.8+0.2}; animation:twinkle ${Math.random()*3+2}s infinite;`;
                finalStars.appendChild(star);
            }
        }

        // Botão final e chuva de corações
        const finalBtn = document.getElementById('finalButton');
        const heartRain = document.getElementById('heartRain');
        const finalOverlay = document.getElementById('finalOverlayMessage');
        if (finalBtn) {
            finalBtn.addEventListener('click', () => {
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

    // --- Carrega o config.json e constrói o site ---
    fetch('config.json')
        .then(res => {
            if (!res.ok) throw new Error('Arquivo não encontrado');
            return res.json();
        })
        .then(data => {
            config = { ...config, ...data };
        })
        .catch(err => {
            console.warn('Usando configuração padrão:', err.message);
            // Mantém o config padrão já definido (com nome "Adylavia" e data)
        })
        .finally(() => {
            construirConteudo();
        });

    // --- Ação do botão de abertura (sempre funciona) ---
    openButton.addEventListener('click', () => {
        openingScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        document.body.classList.remove('opening-active'); // libera scroll
        if (!musicPlaying) {
            bgMusic.play().catch(() => {});
            musicToggle.classList.add('playing');
            musicPlaying = true;
        }
    });
});