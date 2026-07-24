const btn = document.getElementById("btn");
const countText = document.getElementById("count");

let count = 0;

const colors = [
    "#1f2937",
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#f59e0b",
    "#14b8a6"
];

btn.addEventListener("click", () => {
    count++;

    countText.textContent = `Đã nhấn: ${count} lần`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.background = randomColor;
});
