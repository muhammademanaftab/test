// CrossGuard CI demo — well-supported modern JavaScript

const cards = document.querySelectorAll(".card");
const form = document.querySelector(".signup");
const emailInput = document.querySelector("#email");

// Persist last-clicked card ID to localStorage
const STORAGE_KEY = "ci-demo:last-clicked-card";

cards.forEach((card) => {
    card.addEventListener("click", (event) => {
        const cardId = card.dataset.cardId;
        const priority = card.dataset.priority;
        console.log(`Card clicked → id=${cardId}, priority=${priority}`);
        localStorage.setItem(STORAGE_KEY, cardId);
        card.classList.add("active");
        setTimeout(() => card.classList.remove("active"), 300);
    });
});

// Restore highlight for the last-clicked card on load
const restored = localStorage.getItem(STORAGE_KEY);
if (restored) {
    const target = document.querySelector(`.card[data-card-id="${restored}"]`);
    if (target) {
        target.style.borderLeft = "4px solid #4c6ef5";
    }
}

// Form handling with destructuring + template literals
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { value } = emailInput;
    if (!value.includes("@")) {
        console.warn("Invalid email address");
        return;
    }
    const payload = JSON.stringify({ email: value, ts: new Date().toISOString() });
    console.log(`Subscribed: ${payload}`);
    emailInput.value = "";
});

// Keyboard navigation between cards
const cardArray = Array.from(cards);
let activeIndex = 0;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        activeIndex = (activeIndex + 1) % cardArray.length;
    } else if (event.key === "ArrowLeft") {
        activeIndex = (activeIndex - 1 + cardArray.length) % cardArray.length;
    } else {
        return;
    }
    cardArray.forEach((c) => c.classList.remove("focused"));
    cardArray[activeIndex].classList.add("focused");
});

// Helper using Array.find + String.includes
function findHighPriority() {
    return cardArray.find((c) => c.dataset.priority?.includes("high"));
}

const highPriorityCard = findHighPriority();
if (highPriorityCard) {
    console.log("High priority card detected:", highPriorityCard.dataset.cardId);
}
