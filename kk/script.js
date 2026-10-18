        /* -------------------------------------------------------------
           1. Dynamic Girlfriend Name Updating
        ------------------------------------------------------------- */
        function updateName(name) {
            const formattedName = name.trim() !== "" ? name : "Sophia";
            document.getElementById('heroName').innerText = formattedName;

            // Update greeting love letter recipient dynamically
            const greetingArea = document.getElementById('customGreeting');
            const lines = greetingArea.value.split('\n');
            if (lines.length > 0 && lines[0].startsWith('My Dearest')) {
                lines[0] = `My Dearest ${formattedName},`;
                greetingArea.value = lines.join('\n');
            }
        }

        /* -------------------------------------------------------------
           2. Candle Blow Out Interaction
        ------------------------------------------------------------- */
        let candleBlown = false;

        function blowOutCandle() {
            if (candleBlown) return;

            document.getElementById('candleFlame').style.display = 'none';
            document.getElementById('candleSmoke').style.display = 'block';
            document.getElementById('wishBanner').classList.remove('hidden');

            candleBlown = true;

            triggerLoveBurst();
            playChimeSound();
        }

        /* -------------------------------------------------------------
           3. Love Note Gift Boxes Reveal
        ------------------------------------------------------------- */
        const giftOpened = [false, false, false];

        function openGift(index) {
            if (giftOpened[index - 1]) return;

            const giftTitle = document.getElementById(`giftTitle${index}`);
            const giftContent = document.getElementById(`giftContent${index}`);
            const giftIcon = document.getElementById(`giftIcon${index}`);

            giftTitle.classList.add('hidden');
            giftIcon.className = "fas fa-heart text-5xl text-rose-600 mb-3 animate-bounce";
            giftContent.classList.remove('hidden');

            giftOpened[index - 1] = true;

            triggerLoveBurst();
            playChimeSound();
        }

        /* -------------------------------------------------------------
           4. Image File Upload Preview for Polaroid Frame
        ------------------------------------------------------------- */
        function previewImage(event, targetId) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(targetId).src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        }

        /* -------------------------------------------------------------
           5. Love & Heart Burst Effect (Fixed & Resolved Function)
        ------------------------------------------------------------- */
        function triggerLoveBurst() {
            var scalar = 2.2;
            var heart = confetti.shapeFromText({ text: '❤️', scalar: scalar });
            var rose = confetti.shapeFromText({ text: '🌹', scalar: scalar });
            var sparkle = confetti.shapeFromText({ text: '✨', scalar: scalar });

            var defaults = {
                spread: 360,
                ticks: 120,
                gravity: 0.7,
                decay: 0.94,
                startVelocity: 30,
                shapes: [heart, rose, sparkle],
                scalar: scalar
            };

            confetti({
                ...defaults,
                particleCount: 35,
                origin: { y: 0.6 }
            });

            confetti({
                ...defaults,
                particleCount: 25,
                origin: { y: 0.7 }
            });

            playChimeSound();
        }

        /* -------------------------------------------------------------
           6. Web Audio API Synthesized Romantic Music
        ------------------------------------------------------------- */
        let audioCtx = null;
        let isPlayingMusic = false;

        function initAudio() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playNote(freq, duration, delay) {
            return setTimeout(() => {
                if (!isPlayingMusic || !audioCtx) return;
                
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

                    gain.gain.setValueAtTime(0.14, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);

                    osc.start();
                    osc.stop(audioCtx.currentTime + duration);
                } catch(e) {}
            }, delay * 1000);
        }

        // Happy Birthday Melodic Frequencies
        const melody = [
            { f: 264, d: 0.4 }, { f: 264, d: 0.4 }, { f: 297, d: 0.8 }, { f: 264, d: 0.8 }, { f: 352, d: 0.8 }, { f: 330, d: 1.2 },
            { f: 264, d: 0.4 }, { f: 264, d: 0.4 }, { f: 297, d: 0.8 }, { f: 264, d: 0.8 }, { f: 396, d: 0.8 }, { f: 352, d: 1.2 },
            { f: 264, d: 0.4 }, { f: 264, d: 0.4 }, { f: 528, d: 0.8 }, { f: 440, d: 0.8 }, { f: 352, d: 0.8 }, { f: 330, d: 0.8 }, { f: 297, d: 0.8 },
            { f: 466, d: 0.4 }, { f: 466, d: 0.4 }, { f: 440, d: 0.8 }, { f: 352, d: 0.8 }, { f: 396, d: 0.8 }, { f: 352, d: 1.2 }
        ];

        function toggleMusic() {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const musicText = document.getElementById('musicText');
            const musicIcon = document.getElementById('musicIcon');

            if (isPlayingMusic) {
                isPlayingMusic = false;
                musicText.innerText = "Love Melody 🎵";
                musicIcon.className = "fas fa-music";
            } else {
                isPlayingMusic = true;
                musicText.innerText = "Pause Melody ⏸️";
                musicIcon.className = "fas fa-pause";
                playMelodySequence();
            }
        }

        function playMelodySequence() {
            if (!isPlayingMusic) return;

            let currentTime = 0;
            melody.forEach((note) => {
                playNote(note.f, note.d, currentTime);
                currentTime += note.d + 0.1;
            });

            setTimeout(() => {
                if (isPlayingMusic) playMelodySequence();
            }, currentTime * 1000);
        }

        function playChimeSound() {
            initAudio();
            if (!audioCtx) return;
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.5); // C6
                
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.5);
            } catch(e) {}
        }

        /* -------------------------------------------------------------
           7. Copy Text & Toast Notification
        ------------------------------------------------------------- */
        function copyGreeting() {
            const letterText = document.getElementById('customGreeting').value;
            
            const tempArea = document.createElement('textarea');
            tempArea.value = letterText;
            document.body.appendChild(tempArea);
            tempArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempArea);

            showToast("Love letter copied to clipboard! 📋❤️");
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = message;
            
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        /* -------------------------------------------------------------
           8. Background Floating Hearts Particles Canvas
        ------------------------------------------------------------- */
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class HeartParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 20;
                this.size = Math.random() * 12 + 8;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * -1 - 0.5;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.color = ['#f43f5e', '#fb7185', '#f472b6', '#ffffff'][Math.floor(Math.random() * 4)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.y < -20) {
                    this.y = canvas.height + 20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                const d = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
                ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
                ctx.fill();
                ctx.restore();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 45; i++) {
                particles.push(new HeartParticle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        window.onload = function() {
            initParticles();
            animateParticles();
        };