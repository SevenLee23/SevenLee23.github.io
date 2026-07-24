function callphone() {
    Swal.fire({
        icon: "success",
        title: "0376983570",
        html: `
            <p>𝑇ℎ𝑖𝑠 𝑖𝑠 𝑚𝑦 𝑝ℎ𝑜𝑛𝑒 𝑛𝑢𝑚𝑏𝑒𝑟 𝑎𝑛𝑑 𝑍𝑎𝑙𝑜 𝑎𝑐𝑐𝑜𝑢𝑛𝑡!</p>
            <b>Contact me now 💖</b>
        `,
        confirmButtonText: "Oke nhe",

        // Giữ nguyên vị trí của toàn bộ trang
        scrollbarPadding: false,
        heightAuto: false,

        // Hiệu ứng
        showClass: {
            popup: "animate__animated animate__zoomIn"
        },
        hideClass: {
            popup: "animate__animated animate__zoomOut"
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("startOverlay");
    const video0 = document.querySelector(".autovideo0");

    overlay.addEventListener("click", async () => {

        overlay.classList.add("hide");

        try {

            if (video0) {
                video0.muted = false;
                await video0.play();
            }

        } catch (e) {
            console.log(e);
        }

    });

});