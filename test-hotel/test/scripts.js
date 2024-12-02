document.addEventListener("DOMContentLoaded", () => {
  const rooms = document.querySelectorAll(".room");

  rooms.forEach((room) => {
    const button = room.querySelector(".room__button");

    button.addEventListener("click", () => {
      if (room.dataset.status === "available") {
        room.dataset.status = "selected";
        button.textContent = "Выбрано";
      }
    });

    room.addEventListener("mouseleave", () => {
      if (room.dataset.status === "selected") {
        room.dataset.status = "reserved";
        room.classList.add("room--reserved");
      }
    });

    room.addEventListener("click", () => {
      if (room.dataset.status === "reserved") {
        room.dataset.status = "available";
        room.classList.remove("room--reserved");
        button.textContent = "Забронировать";
      }
    });
  });
});
