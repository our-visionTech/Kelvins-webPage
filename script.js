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

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const items = entry.target.querySelectorAll(
            ".reveal-left, .reveal-right, .reveal-up"
        );

        if (entry.isIntersecting) {
            items.forEach(item => item.classList.add("reveal-active"));
        } else {
            items.forEach(item => item.classList.remove("reveal-active"));
        }
    });
}, {
    threshold: 0.35
});

sections.forEach(section => observer.observe(section));
