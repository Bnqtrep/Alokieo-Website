
//script.js
// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Auto language detection and redirect
(function() {
    try {
        const LS_KEY = 'preferredLang';
        // If user already set a preference, don't auto-redirect
        const pref = localStorage.getItem(LS_KEY);
        const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
        const detected = navLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';

        // Determine current page (filename)
        const path = window.location.pathname.split('/').pop().toLowerCase();
        const onEn = path === '' || path === 'index-en.html' || path === 'index.html';
        const onZh = path === 'index-zh.html';

        // Only redirect when no explicit preference and when we are on the opposite language page
        if (!pref) {
            if (detected === 'zh' && !onZh) {
                // Redirect to Chinese page
                window.location.replace('index-zh.html');
            } else if (detected === 'en' && !onEn) {
                // Redirect to English page
                window.location.replace('index-en.html');
            }
        }
    } catch (e) {
        // Fail silently
        console.warn('Language auto-detect failed', e);
    }
})();

// Remember explicit language choice when users click language links
document.addEventListener('DOMContentLoaded', function() {
    try {
        const LS_KEY = 'preferredLang';
        document.querySelectorAll('a.language-switch').forEach(a => {
            a.addEventListener('click', function() {
                const href = (this.getAttribute('href') || '').toLowerCase();
                if (href.includes('index-zh')) {
                    localStorage.setItem(LS_KEY, 'zh');
                } else if (href.includes('index-en')) {
                    localStorage.setItem(LS_KEY, 'en');
                }
            });
        });
    } catch (e) {
        // ignore
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


// Join buttons interaction
document.querySelectorAll('.join-option .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const option = this.closest('.join-option');
        const optionName = option.querySelector('h3').textContent;
        
        // Show loading state
        const originalText = this.textContent;
        this.textContent = 'Redirecting...';
        this.disabled = true;
        
        // Simulate redirect delay
        setTimeout(() => {
            alert(`You're joining: ${optionName}\nThis would normally redirect to our ${optionName} page!`);
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fun typing effect for the quote
const funQuote = document.querySelector('.fun-quote');
if (funQuote) {
    const originalText = funQuote.textContent;
    funQuote.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            funQuote.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
}

// Join Our Team button in nav
document.querySelector('.nav-cta').addEventListener('click', function() {
    document.querySelector('#join').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyles);

// Student project easter egg
console.log(`%c 
    Alokieo - Student AI Project
    ----------------------------
    Built by curious students learning AI
    Come join us at Alokieo!
    
    "Come on, this is your chance to develop a real LLM in a team, please join us!"
`, 'background: #ff6b35; color: white; padding: 10px; border-radius: 5px; font-weight: bold;');