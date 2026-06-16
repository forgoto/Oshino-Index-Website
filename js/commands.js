const searchInput = document.querySelector("#command-search");
const filterButtons = document.querySelectorAll(".filter-button");
const commandRows = document.querySelectorAll(".command-row");
const emptyMessage = document.querySelector("#empty-message");
const visibleCount = document.querySelector("#visible-count");

let activeFilter = "all";

function updateCommands() {
    const searchValue = searchInput?.value.trim().toLowerCase() ?? "";
    let count = 0;

    commandRows.forEach((row) => {
        const category = row.dataset.category;
        const searchableText = row.dataset.search.toLowerCase();

        const matchesFilter =
            activeFilter === "all" || category === activeFilter;

        const matchesSearch =
            searchValue === "" || searchableText.includes(searchValue);

        const shouldShow = matchesFilter && matchesSearch;

        row.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
            count += 1;
        }
    });

    if (visibleCount) {
        visibleCount.textContent = String(count).padStart(2, "0");
    }

    if (emptyMessage) {
        emptyMessage.hidden = count !== 0;
    }
}

searchInput?.addEventListener("input", updateCommands);

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.toggle("active", item === button);
        });

        updateCommands();
    });
});

document.querySelectorAll(".copy-command").forEach((button) => {
    button.addEventListener("click", async () => {
        const command = button.dataset.command;
        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(command);
            button.textContent = "Copied";
        } catch {
            button.textContent = command;
        }

        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1300);
    });
});

updateCommands();


document.querySelectorAll(".copy-link").forEach((button) => {
    button.addEventListener("click", async () => {
        const target = button.dataset.target;
        const link = `${window.location.origin}${window.location.pathname}#${target}`;
        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(link);
            button.textContent = "Link copied";
        } catch {
            button.textContent = "Copy failed";
        }

        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1300);
    });
});

function highlightLinkedCommand() {
    const targetId = window.location.hash.slice(1);

    document.querySelectorAll(".command-row").forEach((row) => {
        row.classList.toggle("linked-command", row.id === targetId);
    });

    if (targetId) {
        const target = document.getElementById(targetId);

        if (target) {
            window.setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 120);
        }
    }
}

window.addEventListener("hashchange", highlightLinkedCommand);
highlightLinkedCommand();
