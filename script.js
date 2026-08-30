import { GoogleGenAI } from '@google/genai';

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
            // Deferred to Gemini AI handler below
            return;
            
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

// Initialize Gemini API
// Replace 'YOUR_GEMINI_API_KEY' with your actual key from Google AI Studio
const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6KG7vUQ-qNq-4ztrl8bYqe-sEtprDCz3O6e6Qrc3tgI7g' });

/* =========================================================
   SYSTEM PROMPT (YOUR PORTFOLIO KNOWLEDGE BASE)
   ========================================================= */
const SYSTEM_INSTRUCTION = `
You are Kelvin's personal AI assistant on his portfolio website.
Your role is to answer questions from visitors, recruiters, and clients about Kelvin's skills, experience, and projects.

KNOWLEDGE BASE ABOUT KELVIN:
- Full Name: Kelvin
- Role: Integration Engineer & Full-Stack Developer
- Core Expertise: ASP.NET Core, React.js, Python, JavaScript, Cloud Computing, API Development, Cybersecurity, VAPT, Database Design.
- Key Skills:
  * Full-Stack: Node.js, C#, ASP.NET Core (MVC & Web API), PHP, Python, React.js, React Native, WordPress.
  * Integration & Databases: REST APIs, Postman, PostgreSQL, SQL Server, MySQL, phpMyAdmin.
  * Security & Cloud: Penetration Testing (VAPT), Vulnerability Scanning (NVD API), Linux/Windows Server, GCP, DNS Tunneling.
- Featured Projects:
  1. Advanced Security Scanning & Load Testing Tool (Python, NVD API integration for CVE scanning, VAPT).
  2. learningtreasury.org (WordPress, custom deployment, SEO & GEO optimization, DNS mapping).

BEHAVIOR RULES:
- Keep answers professional, friendly, and concise (under 3-4 sentences).
- Always speak positively about Kelvin's technical capabilities.
- If asked about hiring, freelance inquiries, or scheduling a meeting, direct them to use the links in the footer to email kelvinkadzenje@gmail.com or message via LinkedIn.
- If asked unrelated questions, politely bring the conversation back to Kelvin's engineering work.
`;

/* =========================================================
   LIVE CHAT ENGINE
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const chatMessageForm = document.getElementById('chatMessageForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Create a persistent chat session with Gemini
    const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
        }
    });

    if (chatMessageForm) {
        chatMessageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userText = chatInput.value.trim();
            if (!userText) return;

            // 1. Display User Message
            appendMessage('user', userText);
            chatInput.value = '';

            // 2. Display Typing Indicator
            const typingIndicator = appendMessage('reply', 'Typing...');

            try {
                // 3. Send message to Gemini API
                const response = await chatSession.sendMessage({
                    message: userText
                });

                // 4. Update typing indicator with AI response
                typingIndicator.innerText = response.text;

            } catch (error) {
                console.error('Gemini AI Error:', error);
                typingIndicator.innerText = "Sorry, I ran into an error connecting to AI. Please email Kelvin directly via kelvinkadzenje@gmail.com!";
            }
        });
    }

    function appendMessage(sender, text) {
        const msgElement = document.createElement('div');
        msgElement.className = `chat-msg ${sender}`;
        msgElement.innerText = text;
        chatMessages.appendChild(msgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgElement;
    }
});
