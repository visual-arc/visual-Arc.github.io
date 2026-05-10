// ========== LOADER ==========
function loaderAnimation() {
    const tl = gsap.timeline();
    gsap.set(".t-left", { x: "-100%" });
    gsap.set(".t-right", { x: "100%" });
    gsap.to(".camera-model", { y: "-=30", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    tl.to(".t-left, .t-right", { x: "0%", duration: 1.4, ease: "expo.out", stagger: 0.1 });
    let count = { val: 0 };
    tl.to(count, {
        val: 100, duration: 3.8, ease: "power1.inOut",
        onUpdate: () => { document.getElementById("percentage").innerHTML = Math.floor(count.val); },
        onComplete: () => {
            gsap.to(".center-content h1", { y: -120, opacity: 0, duration: 0.8, ease: "power4.in" });
            gsap.to("#loader", { y: "-100%", duration: 1.2, ease: "expo.inOut", onComplete: () => {
                document.body.classList.remove("no-scroll");
                ScrollTrigger.refresh();
            } });
        }
    });
    gsap.to(".side-reel span", { y: 45, duration: 2.8, repeat: -1, yoyo: true, ease: "linear" });
}
loaderAnimation();

// ========== GSAP INIT ==========
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Cursor
    const cursor = document.querySelector("#cursor");
    const follower = document.querySelector("#cursor-follower");
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.3 });
    });

    // Magnetic nav
    document.querySelectorAll(".mag-text").forEach(text => {
        text.addEventListener("mousemove", (e) => {
            const rect = text.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            gsap.to(text, { x: x*0.6, y: y*0.6, duration: 0.3 });
            gsap.to(follower, { scale: 2.2, opacity: 0.4 });
        });
        text.addEventListener("mouseleave", () => {
            gsap.to(text, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
            gsap.to(follower, { scale: 1, opacity: 0.8 });
        });
    });

    // Video preview
    const videoPreview = document.querySelector(".video-preview");
    if(videoPreview) {
        videoPreview.addEventListener("mouseenter", () => {
            gsap.to(".camera-frame", { opacity: 1, scale: 1.02, duration: 0.4 });
            gsap.to(follower, { width: 85, height: 85, backgroundColor: "transparent", border: "2px solid red", borderRadius: "0%" });
        });
        videoPreview.addEventListener("mouseleave", () => {
            gsap.to(".camera-frame", { opacity: 0, scale: 1, duration: 0.4 });
            gsap.to(follower, { width: 40, height: 40, backgroundColor: "#fff", border: "none", borderRadius: "50%" });
        });
    }

    // Hero text
    gsap.from(".shutter-text", { y: 220, skewY: 8, opacity: 0, duration: 1.4, stagger: 0.25, ease: "expo.out" });

    // Page 2 video scale
    gsap.to(".dev video", {
        scale: 1,
        scrollTrigger: { trigger: "#page2", start: "top 90%", end: "top 10%", scrub: 1.2 }
    });

    // Page 3 projects
    gsap.utils.toArray(".project-category").forEach(cat => {
        gsap.from(cat, { y: 80, opacity: 0, duration: 1, scrollTrigger: { trigger: cat, start: "top 85%" } });
    });

    // Video play on hover WITH sound (after user interaction)
    let userInteracted = false;
    window.addEventListener('click', () => {
        userInteracted = true;
        document.querySelectorAll('.project-card video').forEach(v => v.muted = false);
    });

    document.querySelectorAll('.project-card video').forEach(vid => {
        vid.addEventListener('mouseenter', () => {
            if (userInteracted) vid.muted = false;
            vid.play();
        });
        vid.addEventListener('mouseleave', () => {
            vid.pause();
            vid.currentTime = 0;
        });
        // Click play with sound (reliable)
        vid.addEventListener('click', () => {
            vid.muted = false;
            vid.play();
        });
    });

    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }
}); // <-- YAHI CLOSING BRACKET MISSING THA