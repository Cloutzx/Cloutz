/* =========================================================
   CLOUTZ WEBSITE — SCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const settingsButton =
    document.getElementById("settings-button");

const settingsPanel =
    document.getElementById("settings-panel");

const closeSettings =
    document.getElementById("close-settings");

const themeToggle =
    document.getElementById("theme-toggle");

const animationToggle =
    document.getElementById("animation-toggle");

const cursorToggle =
    document.getElementById("cursor-toggle");

const pageLoader =
    document.getElementById("page-loader");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");

const particles =
    document.getElementById("particles");

const twitchLink =
    document.getElementById("twitch-link");

const twitchQuickLink =
    document.getElementById("twitch-quick-link");

const discordLink =
    document.getElementById("discord-link");


/* =========================================================
   SETTINGS
========================================================= */

let settings = {
    theme:
        localStorage.getItem("cloutz-theme") || "dark",

    animations:
        localStorage.getItem("cloutz-animations") !== "off",

    cursor:
        localStorage.getItem("cloutz-cursor") !== "off"
};


/* =========================================================
   APPLY SETTINGS
========================================================= */

function applySettings() {

    /* Theme */

    if (settings.theme === "light") {

        body.classList.add("light");

        if (themeToggle) {
            themeToggle.textContent = "Light";
        }

    } else {

        body.classList.remove("light");

        if (themeToggle) {
            themeToggle.textContent = "Dark";
        }
    }


    /* Animations */

    if (settings.animations) {

        body.classList.remove("no-animations");

        if (animationToggle) {
            animationToggle.textContent = "On";
        }

    } else {

        body.classList.add("no-animations");

        if (animationToggle) {
            animationToggle.textContent = "Off";
        }
    }


    /* Cursor */

    if (settings.cursor) {

        body.classList.remove("no-cursor-glow");

        if (cursorToggle) {
            cursorToggle.textContent = "On";
        }

    } else {

        body.classList.add("no-cursor-glow");

        if (cursorToggle) {
            cursorToggle.textContent = "Off";
        }
    }
}


applySettings();


/* =========================================================
   SETTINGS PANEL
========================================================= */

function openSettings() {

    if (!settingsPanel) return;

    settingsPanel.classList.add("open");

}


function closeSettingsPanel() {

    if (!settingsPanel) return;

    settingsPanel.classList.remove("open");

}


if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            settingsPanel.classList.toggle("open");

        }
    );

}


if (closeSettings) {

    closeSettings.addEventListener(
        "click",
        () => {

            closeSettingsPanel();

        }
    );

}


/* Close when clicking outside */

document.addEventListener(
    "click",
    (event) => {

        if (!settingsPanel) return;

        if (
            settingsPanel.classList.contains("open") &&
            !settingsPanel.contains(event.target) &&
            !settingsButton.contains(event.target)
        ) {

            closeSettingsPanel();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeSettingsPanel();

        }

    }
);


/* =========================================================
   THEME SWITCH
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            settings.theme =
                settings.theme === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "cloutz-theme",
                settings.theme
            );

            applySettings();

            showToast(
                settings.theme === "light"
                    ? "Light mode enabled"
                    : "Dark mode enabled"
            );

        }
    );

}


/* =========================================================
   ANIMATION SWITCH
========================================================= */

if (animationToggle) {

    animationToggle.addEventListener(
        "click",
        () => {

            settings.animations =
                !settings.animations;

            localStorage.setItem(
                "cloutz-animations",
                settings.animations
                    ? "on"
                    : "off"
            );

            applySettings();

            showToast(
                settings.animations
                    ? "Animations enabled"
                    : "Animations disabled"
            );

            if (settings.animations) {

                createParticles();

                observeRevealElements();

            }

        }
    );

}


/* =========================================================
   CURSOR GLOW SWITCH
========================================================= */

if (cursorToggle) {

    cursorToggle.addEventListener(
        "click",
        () => {

            settings.cursor =
                !settings.cursor;

            localStorage.setItem(
                "cloutz-cursor",
                settings.cursor
                    ? "on"
                    : "off"
            );

            applySettings();

            showToast(
                settings.cursor
                    ? "Cursor glow enabled"
                    : "Cursor glow disabled"
            );

        }
    );

}


/* =========================================================
   TOAST SYSTEM
========================================================= */

let toastTimeout;


function showToast(message) {

    if (!toast) return;

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(
        () => {

            toast.classList.remove("show");

        },
        2500
    );
}


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                if (!pageLoader) return;

                pageLoader.classList.add("loaded");

                setTimeout(
                    () => {

                        pageLoader.style.display =
                            "none";

                    },
                    700
                );

            },
            900
        );

    }
);


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    if (!particles) return;

    particles.innerHTML = "";

    if (!settings.animations) return;


    const particleCount =
        window.innerWidth < 700
            ? 18
            : 32;


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
            Math.random() * 4 + 1;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        particle.style.animationDuration =
            `${Math.random() * 8 + 8}s`;


        particle.style.opacity =
            `${Math.random() * 0.55 + 0.15}`;


        particles.appendChild(
            particle
        );

    }

}


createParticles();


/* Rebuild particles when screen changes */

let resizeTimeout;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(
            () => {

                createParticles();

            },
            250
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

let revealObserver;


function observeRevealElements() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!settings.animations) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    if (revealObserver) {

        revealObserver.disconnect();

    }


    revealObserver =
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
                threshold: 0.08,
                rootMargin: "0px 0px -30px 0px"
            }
        );


    elements.forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 45, 350)}ms`;

            revealObserver.observe(
                element
            );

        }
    );

}


observeRevealElements();


/* =========================================================
   CURSOR GLOW
========================================================= */

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function animateCursorGlow() {

    if (
        settings.cursor &&
        settings.animations
    ) {

        currentX +=
            (mouseX - currentX) * 0.08;

        currentY +=
            (mouseY - currentY) * 0.08;


        document.documentElement.style.setProperty(
            "--mouse-x",
            `${currentX}px`
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            `${currentY}px`
        );

    }


    requestAnimationFrame(
        animateCursorGlow
    );

}


animateCursorGlow();


/* =========================================================
   CARD 3D EFFECT
========================================================= */

function setupCardEffects() {

    const cards =
        document.querySelectorAll(
            ".link-card"
        );


    cards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (!settings.animations)
                        return;


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    const rotateX =
                        ((centerY - y) /
                            centerY) *
                        3;


                    card.style.transform =
                        `
                        translateY(-5px)
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        scale(1.012)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


setupCardEffects();


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const target =
            event.target.closest(
                ".primary-button, .secondary-button, .setting-control, .quick-social"
            );


        if (!target) return;

        if (!settings.animations)
            return;


        const ripple =
            document.createElement(
                "span"
            );


        ripple.className =
            "click-ripple";


        const rect =
            target.getBoundingClientRect();


        ripple.style.left =
            `${event.clientX - rect.left}px`;


        ripple.style.top =
            `${event.clientY - rect.top}px`;


        target.appendChild(
            ripple
        );


        setTimeout(
            () => {

                ripple.remove();

            },
            650
        );

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        settings.animations
                            ? "smooth"
                            : "auto",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   TWITCH PLACEHOLDER
========================================================= */

function twitchPlaceholder(event) {

    event.preventDefault();

    showToast(
        "Add your Twitch URL to script.js"
    );

}


if (twitchLink) {

    twitchLink.addEventListener(
        "click",
        twitchPlaceholder
    );

}


if (twitchQuickLink) {

    twitchQuickLink.addEventListener(
        "click",
        twitchPlaceholder
    );

}


/* =========================================================
   DISCORD PLACEHOLDER
========================================================= */

if (discordLink) {

    discordLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showToast(
                "Add your Discord invite to script.js"
            );

        }
    );

}


/* =========================================================
   PARALLAX BACKGROUND
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (!settings.animations)
            return;


        const x =
            (event.clientX /
                window.innerWidth -
                0.5) *
            2;


        const y =
            (event.clientY /
                window.innerHeight -
                0.5) *
            2;


        const glows =
            document.querySelectorAll(
                ".glow"
            );


        glows.forEach(
            (glow, index) => {

                const multiplier =
                    (index + 1) * 8;


                glow.style.transform =
                    `
                    translate(
                        ${x * multiplier}px,
                        ${y * multiplier}px
                    )
                    `;

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        navLinks.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const active =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );


                        if (active) {

                            active.classList.add(
                                "active"
                            );

                        }

                    }

                }
            );

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   CARD MAGNETIC EFFECT
========================================================= */

function setupMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".primary-button, .secondary-button, .quick-social"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    if (!settings.animations)
                        return;


                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );

}


setupMagneticButtons();


/* =========================================================
   RANDOM PARTICLE MOVEMENT
========================================================= */

function animateParticles() {

    if (
        !settings.animations ||
        !particles
    ) {

        requestAnimationFrame(
            animateParticles
        );

        return;

    }


    const particleElements =
        particles.querySelectorAll(
            ".particle"
        );


    particleElements.forEach(
        (particle) => {

            if (!particle.dataset.offset) {

                particle.dataset.offset =
                    Math.random() * 100;

            }

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.title =
                "Cloutz";

        } else {

            document.title =
                "Cloutz — Official";

        }

    }
);


/* =========================================================
   PREVENT ACCIDENTAL DRAGGING
========================================================= */

document.querySelectorAll(
    "a, button"
).forEach(
    (element) => {

        element.addEventListener(
            "dragstart",
            (event) => {

                event.preventDefault();

            }
        );

    }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
`
%c CLOUTZ
%c
Welcome to the Cloutz website.

Gaming • Content • Community
`,
"color:#a78bfa;font-size:30px;font-weight:800;",
"color:#c4b5fd;font-size:13px;"
);


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeSite() {

    applySettings();

    createParticles();

    observeRevealElements();

    setupCardEffects();

    setupMagneticButtons();

}


initializeSite();
