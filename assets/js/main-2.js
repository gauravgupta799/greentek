const header = document.querySelector(".header-desktop");
const hamburgerBtn = document.getElementById("hamburger-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const scrollingHeader = document.querySelector(".header");


gsap.registerPlugin(ScrollTrigger);

// Lenis Imported
// const lenis = new Lenis({
//     duration: 1.2,
//     smooth: true,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
// })


// ScrollTrigger.scrollerProxy(document.body, {
//     scrollTop(value) {
//       if (arguments.length) {
//         lenis.scroll = value
//       }
//       return lenis.scroll
//     },
//     getBoundingClientRect() {
//       return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//     }
// })
  
// ScrollTrigger.defaults({ scroller: document.body })


// // Toggle the header on scroll
// let prevScrollPos = lenis.scroll;
// function toggleHeader() {
//     let currentScrollPos = lenis.scroll;
//     if(prevScrollPos > currentScrollPos){
//         gsap.to(scrollingHeader,{
//             y:0,
//             duration:0.5,
//             ease:"none"
//         })
//     }else{
//         gsap.from(scrollingHeader,{
//             y:-150,
//             duration:0.5,
//             ease:"none"
//         })
//     }
//     prevScrollPos = currentScrollPos;
// }

// //====== Sticky Header start ==========
// function stickyHeader() {
//   const scrollY = lenis.scroll;
//   scrollY > 20 ? header.classList.add("sticky") : header.classList.remove("sticky");
// }
// //======= Sticky Header End ===========


// lenis.on('scroll', (e) => {
//     toggleHeader();
//     stickyHeader();
// });


// function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);


//====== Sticky Header start ==========
function stickyHeader(){
    const scrollY = window.scrollY;
    scrollY > 20 ? header.classList.add("sticky") : header.classList.remove("sticky");
}
//======= Sticky Header End ===========

let prevScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
function toggleHeader() {
    let currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    if(prevScrollPos > currentScrollPos){
        gsap.to(scrollingHeader,{
            y:0,
            duration:0.5,
            ease:"none"
        })
    }else{
        gsap.from(scrollingHeader,{
            y:-150,
            duration:0.5,
            ease:"none"
        })
    }
    prevScrollPos = currentScrollPos;
}

window.onscroll = ()=>{
    stickyHeader();
    toggleHeader();
}


// ----=== Loader Start ----=========
window.onload = function(){

    const revealText = new SplitType(".reveal-p");

    const tl = gsap.timeline();
    const loader = document.querySelector(".loader-container");
    loader.style.display = "none";

    tl.from(".header__logo", {
        opacity:0,
        duration:1.5,
        delay:-0.95,
        ease:"power3.out",
    })
    tl.from(".nav", {
        opacity:0,
        duration:1,
        delay:-0.8,
        ease:"power3.out",
    })
    tl.from(".nav__link", {
        opacity:0,
        y:30,
        stagger:0.01,
        duration:1,
        delay:-0.85,
        ease:"power3.out",
    })
    tl.from(".h-title-reveal", {
        opacity:0,
        backgroundPositionX:"0%",
        duration:1.15,
        delay:-0.9,
        ease:"power3.out",
    })
    tl.from(".h-reveal-btn", {
        opacity:0,
        y:30,
        duration:1,
        delay:-0.92,
        ease:"power3.out",
    })
    revealText.lines.forEach(line => {
        tl.from(line,{
            opacity:0,
            y: 100,
            rotation: 10,
            duration: 1.25,
            stagger: 0.1,
            delay:-0.95,
            ease: "expo.out",
        });
    })
    tl.from(".hero-banner__wrapper img", {
        opacity:0,
        y:60,
        duration:1.5,
        delay:-2,
        ease: "power3.inOut"
    })
}
// ----=== Loader End ----=========


//====== Active Page Link Start ======
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((navLink) => {
    const navLinkPathname = new URL(navLink.href).pathname;
    if((windowPathname === navLinkPathname) || (windowPathname === "./index.html" && navLinkPathname === "/")){
        navLink.classList.add("active");
    }
})
//====== Active Page Link End ======


//====== Toggle Mobile Menu Start ==========
function toggleMenu(){
    mobileMenu.classList.toggle("is-open");
}

hamburgerBtn.addEventListener("click",  toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
//====== Toggle Mobile Menu End ==========


// ============ Swipers Start =================
const swiper1 = new Swiper(".mySwiper", {
    slidePerView:1,
    navigation:{
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev ",
    }
})
// ============ Swipers End =================


// ======== Accordian Toggle Start ========
const accordions = document.querySelectorAll(".accordion__title-wrapper");
accordions && accordions.forEach((accordion)=>{
    accordion.addEventListener("click", function(){
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
        }else{
            content.style.maxHeight = content.scrollHeight + "px";
        }

        accordions.forEach((acdnItem)=>{
            if(acdnItem !== accordion){
                acdnItem.classList.remove("active");
                acdnItem.nextElementSibling.style.maxHeight = null;
            }
        })
    });

})
// ======== Accordian Toggle End ========


// ============ Custom select box start ============
const optionsContainer = document.querySelector(".options-container");
const selected = document .querySelector(".selected");
const optionsList = document.querySelectorAll(".option");

selected && selected.addEventListener("click", ()=>{
    optionsContainer.classList.toggle("active");
});

optionsList && optionsList.forEach((option)=>{
    option.addEventListener("click", ()=>{
        selected.innerHTML = option.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    })
});
// ============ Custom select box end ============


// ========== Counter script start ============
// const counterSections = document.querySelectorAll(".counter-section");
// counterSections && counterSections.forEach((counterSection)=>{
//     const counters = counterSection.querySelectorAll(".counter-number");
//     if(counterSection && counters) {
//         let CounterObserver = new IntersectionObserver(
//             (entries, observer)=>{
//                 let [entry] = entries;
//                 if(!entry.isIntersecting) return;
        
//                 let speed = 200;
//                 counters.forEach((counter, index) => {
//                     const updateCounter = () =>{
//                         let targetNumber = +counter.dataset.target;
//                         let initialNumber = +counter.innerText;
//                         let incPerCount = targetNumber / speed;
//                         if(initialNumber  < targetNumber ){
//                             counter.innerText = Math.ceil(initialNumber + incPerCount);
//                             setTimeout(updateCounter, 40);
//                         }
//                     }
//                     updateCounter();
//                 })
//                 observer.unobserve(counterSection);
//             },{
//                 root:null,
//                 threshold:0.4,
//             }
//         );
//         CounterObserver.observe(counterSection);
//     }
// })
// ============ Counter script end ============


// ========= Animation Starts =========
//  animation fade in 
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
    const anim = gsap.fromTo(mainContent,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power3.in" }
    );
    ScrollTrigger.create({
        trigger: mainContent,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.5,
        stagger:0.1,
        ease: "power3.in"
    });
});

// animate fade in up
const textContainers = gsap.utils.toArray(".fade-in-up");
textContainers.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, y: 60},
        { opacity: 1, y: 0, duration: 1.15, ease: "power4.out"  }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.15,
        stagger:0.75,
        ease: "power4.out"
    });
});


// Heading Animation 
function animateHeadings(selector){
    const headings = document.querySelectorAll(selector);
    headings.forEach((heading) => {
        const anim = gsap.fromTo(heading,
            {
                backgroundPositionX:"100%",
            },
            {
                backgroundPositionX:"0%",
                duration:1,
                ease:"power3.inOut"
             }
        );
        ScrollTrigger.create({
            trigger:heading,
            animation:anim,
            toggleActions:"play",
            start:"top 98%",
            end:"bottom 40%",
            duration:1,
            scrub:true,
            ease:"power3.inOut"
        })
    })
}

// Aimate the different headings
animateHeadings(".headings-reveal");
animateHeadings(".headings-reveal-2");
animateHeadings(".headings-reveal-3");


// ANimate Dividers
function animateDividers(selector) {
    const dividers = gsap.utils.toArray(selector);
    dividers.forEach((divider) => {
        const anim = gsap.fromTo(divider,
            { opacity: 0, width:"0%"},
            { opacity: 1, width:"100%", duration: 1, ease:"power3.inOut" }
        );
        ScrollTrigger.create({
            trigger: divider,
            animation: anim,
            toggleActions:"play",
            once: true,
            duration:1,
            stagger:1,
            ease:"power3.inOut"
        });
    });
}


// Animate the different dividers
animateDividers(".divider");
animateDividers(".divider-grey") 
animateDividers(".divider-secondary"); 



// $(".progress").each(function(){

//     var $bar = $(this).find(".bar");
//     var $val = $(this).find("span");
//     var perc = parseInt( $val.text(), 10);

//     $({p:0}).animate({p:perc}, {
//         duration: 3000,
//         easing: "swing",
//         step: function(p) {
//         $bar.css({
//             transform: "rotate("+ (45+(p*1.8)) +"deg)", // 100%=180° so: ° = % * 1.8
//             // 45 is to add the needed rotation to have the green borders at the bottom
//         });
//         $val.text(p|0);
//         }
//     });
// });


 
// const update = (time, deltaTime, frame) => {
//     lenis.raf(time * 1000)
//   }

// gsap.ticker.add(update)



// Update ScrollTrigger on Lenis scroll
//  lenis.on('scroll', ScrollTrigger.update);

// lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
//     ScrollTrigger.update()
// });


//  gsap.ticker.lagSmoothing(0);