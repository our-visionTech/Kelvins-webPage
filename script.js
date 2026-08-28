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
