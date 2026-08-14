/* =========================================================
   CLOUTZ — MAIN SCRIPT
   Smooth animations / settings / particles / interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const settingsButton =
        document.querySelector(".settings-button");

    const settingsPanel =
        document.querySelector(".settings-panel");

    const closeSettings =
        document.querySelector(".close-settings");

    const themeButton =
        document.querySelector("[data-theme]");

    const animationButton =
        document.querySelector("[data-animations]");

    const cursorButton =
        document.querySelector("[data-cursor]");

    const particlesContainer =
        document.querySelector("#particles");

    const pageLoader =
        document.querySelector(".page-loader");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 650);

    });


    /* =====================================================
       SETTINGS PANEL
    ===================================================== */

    function openSettings() {

        if (!settingsPanel) return;

        settingsPanel.classList.add("open");

    }


    function closeSettingsPanel() {

        if (!settingsPanel) return;

        settingsPanel.classList.remove("open");

    }


    if (settingsButton) {

        settingsButton.addEventListener("click", (event) => {

            event.stopPropagation();

            settingsPanel?.classList.toggle("open");

        });

    }


    if (closeSettings) {

        closeSettings.addEventListener(
            "click",
            closeSettingsPanel
        );

    }


    document.addEventListener("click", (event) => {

        if (!settingsPanel) return;

        if (
            settingsPanel.classList.contains("open") &&
            !settingsPanel.contains(event.target) &&
            !settingsButton?.contains(event.target)
        ) {

            closeSettingsPanel();

        }

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeSettingsPanel();

        }

    });


    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    const savedTheme =
        localStorage.getItem("cloutz-theme");


    function updateThemeButton() {

        if (!themeButton) return;

        const isLight =
            body.classList.contains("light");

        themeButton.textContent =
            isLight ? "Dark" : "Light";

    }


    function setTheme(theme) {

        if (theme === "light") {

            body.classList.add("light");

            localStorage.setItem(
                "cloutz-theme",
                "light"
            );

        } else {

            body.classList.remove("light");

            localStorage.setItem(
                "cloutz-theme",
                "dark"
            );

        }

        updateThemeButton();

    }


    if (savedTheme === "light") {

        body.classList.add("light");

    } else {

        body.classList.remove("light");

    }


    updateThemeButton();


    if (themeButton) {

        themeButton.addEventListener("click", () => {

            const isLight =
                body.classList.contains("light");

            setTheme(
                isLight
                    ? "dark"
                    : "light"
            );

            showToast(
                isLight
                    ? "Dark mode enabled"
                    : "Light mode enabled"
            );

        });

    }


    /* =====================================================
       ANIMATION TOGGLE
    ===================================================== */

    const savedAnimations =
        localStorage.getItem("cloutz-animations");


    if (savedAnimations === "off") {

        body.classList.add("no-animations");

    }


    function updateAnimationButton() {

        if (!animationButton) return;

        const disabled =
            body.classList.contains("no-animations");

        animationButton.textContent =
            disabled
                ? "Off"
                : "On";

    }


    updateAnimationButton();


    if (animationButton) {

        animationButton.addEventListener("click", () => {

            body.classList.toggle(
                "no-animations"
            );

            const disabled =
                body.classList.contains(
                    "no-animations"
                );

            localStorage.setItem(
                "cloutz-animations",
                disabled
                    ? "off"
                    : "on"
            );

            updateAnimationButton();

            showToast(
                disabled
                    ? "Animations disabled"
                    : "Animations enabled"
            );

        });

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const savedCursor =
        localStorage.getItem("cloutz-cursor");


    if (savedCursor === "off") {

        body.classList.add("no-cursor-glow");

    }


    function updateCursorButton() {

        if (!cursorButton) return;

        const disabled =
            body.classList.contains(
                "no-cursor-glow"
            );

        cursorButton.textContent =
            disabled
                ? "Off"
                : "On";

    }


    updateCursorButton();


    if (cursorButton) {

        cursorButton.addEventListener("click", () => {

            body.classList.toggle(
                "no-cursor-glow"
            );

            const disabled =
                body.classList.contains(
                    "no-cursor-glow"
                );

            localStorage.setItem(
                "cloutz-cursor",
                disabled
                    ? "off"
                    : "on"
            );

            updateCursorButton();

            showToast(
                disabled
                    ? "Cursor glow disabled"
                    : "Cursor glow enabled"
            );

        });

    }


    /* =====================================================
       SMOOTH CURSOR GLOW
    ===================================================== */

    let targetMouseX =
        window.innerWidth / 2;

    let targetMouseY =
        window.innerHeight / 2;

    let currentMouseX =
        targetMouseX;

    let currentMouseY =
        targetMouseY;


    let mouseMoving = false;


    document.addEventListener(
        "mousemove",
        (event) => {

            targetMouseX =
                event.clientX;

            targetMouseY =
                event.clientY;

            mouseMoving = true;

        },
        { passive: true }
    );


    function updateMouseGlow() {

        const dx =
            targetMouseX -
            currentMouseX;

        const dy =
            targetMouseY -
            currentMouseY;


        currentMouseX += dx * 0.085;
        currentMouseY += dy * 0.085;


        document.documentElement.style.setProperty(
            "--mouse-x",
            `${currentMouseX}px`
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            `${currentMouseY}px`
        );


        requestAnimationFrame(
            updateMouseGlow
        );

    }


    updateMouseGlow();


    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles() {

        if (!particlesContainer) return;


        particlesContainer.innerHTML = "";


        const mobile =
            window.innerWidth <= 600;


        const particleCount =
            mobile ? 14 : 26;


        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "particle";


            const size =
                Math.random() * 3 + 1;


            const left =
                Math.random() * 100;


            const top =
                Math.random() * 100;


            const duration =
                9 + Math.random() * 9;


            const delay =
                Math.random() * -15;


            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${left}%`;

            particle.style.top =
                `${top}%`;

            particle.style.animationDuration =
                `${duration}s`;

            particle.style.animationDelay =
                `${delay}s`;

            particle.style.opacity =
                `${0.2 + Math.random() * 0.5}`;


            fragment.appendChild(
                particle
            );

        }


        particlesContainer.appendChild(
            fragment
        );

    }


    createParticles();


    let particleResizeTimeout;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                particleResizeTimeout
            );


            particleResizeTimeout =
                setTimeout(
                    createParticles,
                    250
                );

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       STAGGER CARD ANIMATIONS
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".link-card, .mini-stat"
        );


    cards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 35, 280)}ms`;

        }
    );


    /* =====================================================
       3D CARD TILT
       Very subtle — only on desktop
    ===================================================== */

    const canTilt =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (canTilt) {

        const tiltCards =
            document.querySelectorAll(
                ".link-card, .discord-card, .featured-card"
            );


        tiltCards.forEach((card) => {

            let frame = null;


            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        body.classList.contains(
                            "no-animations"
                        )
                    ) return;


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const percentX =
                        x / rect.width;


                    const percentY =
                        y / rect.height;


                    const rotateY =
                        (percentX - 0.5) * 4;


                    const rotateX =
                        (0.5 - percentY) * 4;


                    if (frame) {

                        cancelAnimationFrame(
                            frame
                        );

                    }


                    frame =
                        requestAnimationFrame(
                            () => {

                                card.style.transform =
                                    `perspective(900px)
                                     rotateX(${rotateX}deg)
                                     rotateY(${rotateY}deg)
                                     translateY(-5px)`;

                            }
                        );

                },
                { passive: true }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (frame) {

                        cancelAnimationFrame(
                            frame
                        );

                    }


                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       RIPPLE EFFECT
    ===================================================== */

    const rippleElements =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .quick-social, .setting-control"
        );


    rippleElements.forEach(
        (element) => {

            element.addEventListener(
                "click",
                function (event) {

                    const rect =
                        this.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "click-ripple";


                    ripple.style.left =
                        `${event.clientX - rect.left}px`;


                    ripple.style.top =
                        `${event.clientY - rect.top}px`;


                    this.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        700
                    );

                }
            );

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        let toast =
            document.querySelector(
                ".toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );


            toast.className =
                "toast";


            toast.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span></span>
            `;


            document.body.appendChild(
                toast
            );

        }


        const text =
            toast.querySelector(
                "span"
            );


        if (text) {

            text.textContent =
                message;

        }


        clearTimeout(
            toastTimer
        );


        toast.classList.add(
            "show"
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver"
        in window
    ) {

        const navObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) return;


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                (link) => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-20% 0px -60% 0px"
                }
            );


        sections.forEach(
            (section) => {

                navObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            }
        );

    });


    /* =====================================================
       PREVENT DOUBLE CLICK JANK
    ===================================================== */

    document.querySelectorAll(
        "button, a"
    ).forEach((element) => {

        element.addEventListener(
            "dragstart",
            (event) => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       VISIBILITY OPTIMIZATION
       Stop expensive effects when tab isn't visible
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                body.classList.add(
                    "page-hidden"
                );

            } else {

                body.classList.remove(
                    "page-hidden"
                );

            }

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUT
       Press S to open settings
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key.toLowerCase() ===
                "s" &&
                !["INPUT", "TEXTAREA"].includes(
                    document.activeElement?.tagName
                )
            ) {

                settingsPanel?.classList.toggle(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c CLOUTZ ",
        `
        background: linear-gradient(
            135deg,
            #8b5cf6,
            #d946ef
        );
        color: white;
        padding: 8px 14px;
        border-radius: 8px;
        font-weight: 800;
        font-size: 16px;
        `
    );


    console.log(
        "%cWelcome to Cloutz Haven.",
        "color: #a78bfa; font-weight: 700;"
    );

});
