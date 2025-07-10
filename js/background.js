document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.velocity = 0.1 + Math.random() * 0.3;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = 1 + Math.random() * 3;
            this.opacity = 0.1 + Math.random() * 0.4;
            this.speed = 1 + Math.random() * 3;
            this.angle = Math.random() * Math.PI * 2;
            this.radius = 2 + Math.random() * 2;
            this.color = `hsla(${200 + Math.random() * 60}, 70%, 60%, ${this.opacity})`;
            this.waveAmplitude = 1 + Math.random() * 3;
            this.waveFrequency = 0.001 + Math.random() * 0.003;
            this.originalX = this.x;
        }
        
        update() {
            this.y += this.speed;
            this.angle += 0.01;
            this.x = this.originalX + Math.sin(this.y * this.waveFrequency) * this.waveAmplitude;
            
            if (this.y > canvas.height + 20) {
                this.reset();
                this.y = -20;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Glow effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 3
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    // Connection lines
    class Connection {
        static draw(p1, p2, distance) {
            const opacity = 1 - (distance / 150);
            if (opacity > 0) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    // Initialize particles
    const particles = [];
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    Connection.draw(particles[i], particles[j], distance);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});
