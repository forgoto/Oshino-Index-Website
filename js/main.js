const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));
        navigation.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuButton.setAttribute("aria-expanded", "false");
            navigation.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    revealElements.forEach((element) => {
        if (!element.classList.contains("is-visible")) {
            revealObserver.observe(element);
        }
    });
}

const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const textToCopy = button.dataset.copy;
        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(textToCopy);
            button.textContent = "Copied";
        } catch {
            button.textContent = "Copy failed";
        }

        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1400);
    });
});