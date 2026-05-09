// ===========================
// script.js - Dia das Mães Premium
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // ---------- ELEMENTS ----------
    const loadingScreen = document.getElementById('loadingScreen');
    const coverScreen = document.getElementById('coverScreen');
    const mainSite = document.getElementById('mainSite');
    const openBtn = document.getElementById('openBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const coverParticlesCanvas = document.getElementById('coverParticles');
    const bgParticlesCanvas = document.getElementById('bgParticles');
    const letterBody = document.getElementById('letterBody');
    const daysCounter = document.getElementById('daysCounter');
    const counterDetail = document.getElementById('counterDetail');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const interactiveArea = document.getElementById('interactiveArea');
    const interactiveMessages = document.getElementById('interactiveMessages');
    const finalBtn = document.getElementById('finalBtn');
    const finalOverlay = document.getElementById('finalOverlay');
    const finalHeartsRain = document.getElementById('finalHeartsRain');
    const starsCanvas = document.getElementById('starsCanvas');
    const letterParticlesCanvas = document.getElementById('letterParticles');
    const coverSparkles = document.getElementById('coverSparkles');
    const counterSparkles = document.getElementById('counterSparkles');
    const timelineContainer = document.getElementById('timelineContainer');
    const videoGrid = document.getElementById('videoGrid');
    const heroImage = document.getElementById('heroImage');
    const coverName = document.getElementById('coverName');
    const footerYear = document.getElementById('footerYear');

    // ---------- CONFIG ----------
    const motherName = 'Maria'; // Altere aqui
    const startDate = new Date(1985, 4, 12); // Data de nascimento (ou data especial) - AAAA, M, D
    const heroPhoto = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=700&fit=crop&crop=faces';
    
    // Atualiza nome no cover
    if (coverName) coverName.textContent = motherName;

    // Timeline data
    const timelineData = [
        { year: '1985', event: 'Você nasceu', desc: 'O mundo ganhou uma pessoa especial, que mais tarde se tornaria a melhor mãe.', img: 'https://images.unsplash.com/photo-1503454537195-1dcabb1b49e0?w=200&h=200&fit=crop' },
        { year: '2002', event: 'Meu nascimento', desc: 'O dia em que você segurou meu pequeno corpo e prometeu me amar para sempre.', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop' },
        { year: '2005', event: 'Primeiros passos', desc: 'Você soltou minha mão por um segundo, mas nunca soltou meu coração.', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=200&h=200&fit=crop' },
        { year: '2010', event: 'Primeiro dia de aula', desc: 'Você me deu a mochila mais linda e um abraço que dura até hoje.', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&h=200&fit=crop' },
        { year: '2018', event: 'Momento difícil superado', desc: 'Você segurou minha mão com força e mostrou que juntos somos invencíveis.', img: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=200&h=200&fit=crop' },
        { year: '2026', event: 'Hoje e sempre', desc: 'Cada dia ao seu lado é um presente que eu valorizo mais que tudo.', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=200&h=200&fit=crop' }
    ];

    // Gallery images
    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=600&fit=crop', title: 'Sempre unidas', desc: 'Nossas mãos jamais se soltarão.' },
        { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=600&fit=crop', title: 'Abraço apertado', desc: 'O melhor lugar do mundo.' },
        { src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500&h=600&fit=crop', title: 'Riso solto', desc: 'Sua alegria ilumina minha vida.' },
        { src: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=500&h=600&fit=crop', title: 'Momentos simples', desc: 'A felicidade mora nos detalhes.' },
        { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=600&fit=crop', title: 'Cumplicidade', desc: 'Cúmplices de todas as horas.' },
        { src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=500&h=600&fit=crop', title: 'Força', desc: 'Você é meu exemplo de coragem.' },
        { src: 'https://images.unsplash.com/photo-1464863979621-258859e62245?w=500&h=600&fit=crop', title: 'Doçura', desc: 'Seu carinho transforma tudo.' },
        { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop', title: 'Olhar', desc: 'Um olhar que diz tudo.' }
    ];

    // Video data (placeholders)
    const videoData = [
        { title: 'Mensagem do coração', desc: 'Um recado especial que gravei para você.', thumb: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop' },
        { title: 'Nossa música', desc: 'A canção que sempre nos faz dançar.', thumb: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=250&fit=crop' },
        { title: 'Lembranças em vídeo', desc: 'Momentos que guardo com carinho.', thumb: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=400&h=250&fit=crop' }
    ];

    // Interactive messages
    const hiddenMessages = [
        'Você é a melhor mãe do universo! 💖',
        'Obrigado por cada abraço.',
        'Seu sorriso é meu sol.',
        'Mãe, você é minha heroína.',
        'Te amo além das palavras.',
        'Nunca se esqueça do quanto é amada.',
        'Você ilumina meus dias.',
        'Gratidão eterna por sua existência.'
    ];

    // Letter text parts
    const letterParagraphs = [
        'Mãe, desde o momento em que abri meus olhos, foi você quem me mostrou o que é o amor. Não o amor de filmes ou livros, mas aquele amor tranquilo que aquece a alma e faz a vida ter sentido.',
        'Lembro de cada noite em que você sacrificou seu sono pelo meu. De cada vez que você abriu mão de algo seu para que nada me faltasse. Sua força silenciosa construiu o chão que eu piso hoje.',
        'Houve dias difíceis, eu sei. Dias em que você chorou escondido, mas mesmo assim encontrou forças para me fazer sorrir. Você transformou suas lágrimas em adubo para que eu pudesse florescer. E eu floresci, mãe. Por sua causa.',
        'Sinto um orgulho imenso de chamar você de minha mãe. Não apenas pelo que você fez, mas pela pessoa maravilhosa que você é. Inteira, verdadeira, generosa. O mundo é melhor porque você existe, e eu sou a prova viva do seu amor.',
        'Esta carta é só um fragmento do que sinto. Não existem palavras suficientes para agradecer. Então, eu prometo honrar seu amor todos os dias, sendo a melhor versão de mim mesmo. Você é a raiz mais profunda da minha história.',
        'Te amo hoje, amanhã e em todas as vidas que eu tiver. Para sempre, sua cria.'
    ];

    // ---------- LOADING & COVER ----------
    // Simula carregamento
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    });

    // Sparkles cover
    function createCoverSparkles() {
        if (!coverSparkles) return;
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'cover-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 4 + 's';
            sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            sparkle.style.width = (Math.random() * 5 + 2) + 'px';
            sparkle.style.height = sparkle.style.width;
            coverSparkles.appendChild(sparkle);
        }
    }
    createCoverSparkles();

    // Cover Particles Canvas
    function initCoverParticles() {
        if (!coverParticlesCanvas) return;
        const ctx = coverParticlesCanvas.getContext('2d');
        coverParticlesCanvas.width = window.innerWidth;
        coverParticlesCanvas.height = window.innerHeight;
        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * coverParticlesCanvas.width,
                y: Math.random() * coverParticlesCanvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            if (coverScreen.classList.contains('hidden')) return;
            ctx.clearRect(0, 0, coverParticlesCanvas.width, coverParticlesCanvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > coverParticlesCanvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > coverParticlesCanvas.height) p.speedY *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201,151,107,${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
    initCoverParticles();
    window.addEventListener('resize', () => {
        if (coverParticlesCanvas) {
            coverParticlesCanvas.width = window.innerWidth;
            coverParticlesCanvas.height = window.innerHeight;
        }
    });

    // Open button
    openBtn.addEventListener('click', () => {
        coverScreen.classList.add('hidden');
        mainSite.classList.add('visible');
        document.body.style.cursor = 'none';
        // Iniciar música ao abrir
        bgMusic.play().catch(() => {});
        musicToggle.classList.remove('is-paused');
        // Disparar animações de entrada
        setTimeout(() => {
            revealSections();
            initBackgroundParticles();
            initLetterTypewriter();
            updateCounter();
            renderTimeline();
            renderGallery();
            renderVideos();
        }, 500);
    });

    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.remove('is-paused');
        } else {
            bgMusic.pause();
            musicToggle.classList.add('is-paused');
        }
    });

    // ---------- CUSTOM CURSOR ----------
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');
    if (cursor && cursorDot && window.matchMedia('(min-width: 601px)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.classList.add('click'));
        document.addEventListener('mouseup', () => cursor.classList.remove('click'));
        document.querySelectorAll('a, button, .gallery-item, .interactive-area, .timeline-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ---------- SCROLL REVEAL ----------
    function revealSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.style.transitionDelay = (Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1) + 's';
                    }
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.timeline-item, .gallery-item, .video-card, .counter-card, .letter-paper, .hero-text-content, .hero-image-wrapper').forEach(el => {
            observer.observe(el);
        });
    }

    // ---------- BACKGROUND PARTICLES ----------
    function initBackgroundParticles() {
        if (!bgParticlesCanvas) return;
        const ctx = bgParticlesCanvas.getContext('2d');
        bgParticlesCanvas.width = window.innerWidth;
        bgParticlesCanvas.height = window.innerHeight;
        const particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * bgParticlesCanvas.width,
                y: Math.random() * bgParticlesCanvas.height,
                radius: Math.random() * 1.5 + 0.8,
                speedY: Math.random() * 0.15 + 0.05,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, bgParticlesCanvas.width, bgParticlesCanvas.height);
            particles.forEach(p => {
                p.y += p.speedY;
                if (p.y > bgParticlesCanvas.height) { p.y = 0; p.x = Math.random() * bgParticlesCanvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
                ctx.fillStyle = `rgba(201,151,107,${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', () => {
            bgParticlesCanvas.width = window.innerWidth;
            bgParticlesCanvas.height = window.innerHeight;
        });
    }

    // ---------- STARS CANVAS (FINAL) ----------
    function initStars() {
        if (!starsCanvas) return;
        const ctx = starsCanvas.getContext('2d');
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        const stars = [];
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                radius: Math.random() * 2 + 0.8,
                twinkle: Math.random() * 0.05 + 0.02,
                opacity: Math.random()
            });
        }
        function animate() {
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            stars.forEach(s => {
                s.opacity += s.twinkle;
                if (s.opacity > 1 || s.opacity < 0.3) s.twinkle *= -1;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
                ctx.fillStyle = `rgba(255,255,240,${s.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
    initStars();

    // ---------- LETTER TYPING ----------
    function initLetterTypewriter() {
        if (!letterBody) return;
        letterBody.innerHTML = '';
        let fullText = letterParagraphs.join('\n\n');
        let index = 0;
        function type() {
            if (index < fullText.length) {
                letterBody.innerHTML += fullText.charAt(index) === '\n' ? '<br>' : fullText.charAt(index);
                index++;
                setTimeout(type, 30);
            } else {
                // Finalizar com parágrafos
                letterBody.innerHTML = letterParagraphs.map(p => `<p>${p}</p>`).join('');
            }
        }
        type();
    }

    // ---------- COUNTER ----------
    function updateCounter() {
        if (!daysCounter || !counterDetail) return;
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysCounter.textContent = diffDays.toLocaleString('pt-BR');
        counterDetail.textContent = `desde ${startDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }

    // ---------- TIMELINE ----------
    function renderTimeline() {
        if (!timelineContainer) return;
        timelineContainer.innerHTML = timelineData.map(item => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-event">${item.event}</div>
                    <div class="timeline-desc">${item.desc}</div>
                    ${item.img ? `<img src="${item.img}" alt="${item.event}" class="timeline-img" loading="lazy">` : ''}
                </div>
            </div>
        `).join('');
        // Re-observar após renderizar
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(el => {
                el.classList.add('visible');
            });
        }, 200);
    }

    // ---------- GALLERY ----------
    let currentGalleryIndex = 0;
    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = galleryImages.map((img, i) => `
            <div class="gallery-item" data-index="${i}">
                <img src="${img.src}" alt="${img.title}" loading="lazy">
                <div class="gallery-overlay"><span>${img.title}</span></div>
            </div>
        `).join('');

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                currentGalleryIndex = parseInt(item.dataset.index);
                openModal(currentGalleryIndex);
            });
        });
    }

    function openModal(index) {
        const img = galleryImages[index];
        modalImage.src = img.src;
        modalTitle.textContent = img.title;
        modalDesc.textContent = img.desc;
        galleryModal.classList.add('open');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        galleryModal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    modalClose.addEventListener('click', closeModal);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeModal();
    });
    modalPrev.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentGalleryIndex);
    });
    modalNext.addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        openModal(currentGalleryIndex);
    });
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'ArrowRight') modalNext.click();
    });

    // ---------- VIDEOS ----------
    function renderVideos() {
        if (!videoGrid) return;
        videoGrid.innerHTML = videoData.map(v => `
            <div class="video-card">
                <div class="video-placeholder">🎬</div>
                <div class="video-info">
                    <h4>${v.title}</h4>
                    <p>${v.desc}</p>
                </div>
            </div>
        `).join('');
        setTimeout(() => {
            document.querySelectorAll('.video-card').forEach(el => el.classList.add('visible'));
        }, 300);
    }

    // ---------- INTERACTIVE AREA ----------
    function spawnHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    interactiveArea.addEventListener('click', (e) => {
        const rect = interactiveArea.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        // Spawn multiple hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 40;
                const offsetY = (Math.random() - 0.5) * 40;
                spawnHeart(x + offsetX, y + offsetY);
            }, i * 50);
        }
        // Show random message
        const msg = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
        const msgEl = document.createElement('div');
        msgEl.className = 'interactive-msg';
        msgEl.textContent = msg;
        interactiveMessages.appendChild(msgEl);
        setTimeout(() => msgEl.remove(), 3000);
    });

    // Also allow touch
    interactiveArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY };
        interactiveArea.dispatchEvent(new CustomEvent('click', { detail: fakeEvent }));
    });

    // ---------- FINAL BUTTON ----------
    finalBtn.addEventListener('click', () => {
        finalOverlay.classList.add('active');
        // Chuva de corações
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-rain';
                heart.textContent = '❤️';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                finalHeartsRain.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }, i * 80);
        }
    });

    finalOverlay.addEventListener('click', (e) => {
        if (e.target === finalOverlay) {
            finalOverlay.classList.remove('active');
            finalHeartsRain.innerHTML = '';
        }
    });

    // ---------- UPDATE HERO IMAGE ----------
    if (heroImage && heroPhoto) {
        heroImage.src = heroPhoto;
    }

    // Footer year
    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()} · Homenagem Premium`;
    }
});