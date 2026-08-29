function openModal(){
    document.getElementById("skillsModal").classList.add("active");
}

function closeModal(){
    document.getElementById("skillsModal").classList.remove("active");
}

window.onclick=function(e){
    if(e.target.id==="skillsModal"){
        closeModal();
    }
}

function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

/* SHOW BUTTON ONLY AFTER SCROLL */
window.addEventListener("scroll", function(){
    const btn = document.querySelector(".top-btn");

    if(window.scrollY > 300){
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
});

/* REVEAL ANIMATIONS*/
const sections = document.querySelectorAll("section, footer");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        const items = entry.target.querySelectorAll(
            ".reveal-left, .reveal-right, .reveal-up"
        );

        if (entry.isIntersecting) {

            items.forEach(item => {
                item.classList.add("reveal-active");
            });

        } else {

            items.forEach(item => {
                item.classList.remove("reveal-active");
            });

        }

    });
}, {
    threshold: 0.2
});

sections.forEach(section => observer.observe(section));

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.getElementById('closeMobileMenu');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const mobileBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Open menu & show transparent backdrop
    menuBtn.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        mobileBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    });

    // Close menu & hide transparent backdrop
    const closeMenu = () => {
        mobileOverlay.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    closeBtn.addEventListener('click', closeMenu);
    mobileBackdrop.addEventListener('click', closeMenu); // Close on clicking backdrop

    // Close when clicking any menu link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
/* =========================================================
   FLOATING BUTTON RANDOM SCREEN MOVEMENT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const fab = document.getElementById('floatingMsgBtn');
    const drawer = document.getElementById('chatDrawer');
    const backdrop = document.getElementById('chatBackdrop');
    const closeBtn = document.getElementById('closeChatBtn');

    if (fab) {
        let isHovered = false;

        fab.addEventListener('mouseenter', () => { isHovered = true; });
        fab.addEventListener('mouseleave', () => { isHovered = false; });

        // Random subtle displacement
        setInterval(() => {
            if (!isHovered && !drawer.classList.contains('active')) {
                const randomX = Math.floor(Math.random() * 50) - 25;
                const randomY = Math.floor(Math.random() * 50) - 25;
                fab.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }, 2500);

        // Open Chat Drawer
        fab.addEventListener('click', () => {
            drawer.classList.add('active');
            backdrop.classList.add('active');
        });
    }

    // Close Chat Drawer
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChatDrawer);
    }
    if (backdrop) {
        backdrop.addEventListener('click', closeChatDrawer);
    }

    function closeChatDrawer() {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
    }

    /* =========================================================
       CHAT AUTHENTICATION TABS & FORM
       ========================================================= */

    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');
    const nameFieldGroup = document.getElementById('nameFieldGroup');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const chatAuthForm = document.getElementById('chatAuthForm');

    const authContainer = document.getElementById('chatAuthContainer');
    const sessionContainer = document.getElementById('chatSessionContainer');

    let currentMode = 'login';

    if (loginTabBtn && signupTabBtn) {
        loginTabBtn.addEventListener('click', () => {
            currentMode = 'login';
            loginTabBtn.classList.add('active');
            signupTabBtn.classList.remove('active');
            nameFieldGroup.style.display = 'none';
            authSubmitBtn.innerText = 'Login to Chat';
        });

        signupTabBtn.addEventListener('click', () => {
            currentMode = 'signup';
            signupTabBtn.classList.add('active');
            loginTabBtn.classList.remove('active');
            nameFieldGroup.style.display = 'flex';
            authSubmitBtn.innerText = 'Create Account & Chat';
        });
    }

    // Submit Auth Form
    if (chatAuthForm) {
        chatAuthForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Transition from Auth view to Chat view
            authContainer.style.display = 'none';
            sessionContainer.style.display = 'flex';
        });
    }

    /* =========================================================
       LIVE CHAT MESSAGING
       ========================================================= */

    const chatMessageForm = document.getElementById('chatMessageForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (chatMessageForm) {
        chatMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            // Render User Message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.innerText = text;
            chatMessages.appendChild(userMsg);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulated Automated Response
            setTimeout(() => {
                const replyMsg = document.createElement('div');
                replyMsg.className = 'chat-msg reply';
                replyMsg.innerText = "Thanks for reaching out! Kelvin has received your message and will reply via your email shortly.";
                chatMessages.appendChild(replyMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }
});
