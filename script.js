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

const reveals = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up"
);

/*Reveal Script */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            // Animate in
            entry.target.classList.add("reveal-active");
        } else {
            // Reset animation when element leaves the viewport
            entry.target.classList.remove("reveal-active");
        }

    });
}, {
    threshold: 0.2
});

reveals.forEach(el => observer.observe(el));
reveals.forEach(el => observer.observe(el));
