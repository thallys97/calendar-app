document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-event");
    const modal = document.getElementById("event-modal");
    const modalBackground = document.querySelector(".modal-background");

    addButton.addEventListener("click", function () {
        modal.style.display = "block";
        modalBackground.style.display = "block";
    });

    const closeModalButton = document.getElementById("close-modal");

    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
        modalBackground.style.display = "none";
    });
});
