document.querySelectorAll(".link").forEach((link) => {
  link.addEventListener("click", function (event) {
    this.classList.add("visited");
  });
});

function saveCardState(index, status) {
  localStorage.setItem(`room-card-${index}`, status);
}

function loadCardStates() {
  const roomCards = document.querySelectorAll(".room-card");
  roomCards.forEach((card, index) => {
    const savedStatus = localStorage.getItem(`room-card-${index}`);
    if (savedStatus) {
      card.dataset.status = savedStatus;
    }
  });
}

document.querySelectorAll(".room-card").forEach((card, index) => {
  const button = card.querySelector(".room-card__button");

  button.addEventListener("click", (event) => {
    if (card.dataset.status === "active") {
      card.dataset.status = "selected";
      saveCardState(index, "selected");
    }
  });

  card.addEventListener("click", (event) => {
    if (card.dataset.status === "selected") {
      card.addEventListener(
        "mouseleave",
        () => {
          card.dataset.status = "reserved";
          saveCardState(index, "reserved");
        },
        { once: true }
      );
    } else if (
      card.dataset.status === "reserved" &&
      !event.target.closest(".link")
    ) {
      card.dataset.status = "active";
      saveCardState(index, "active");
    }
  });
});

loadCardStates();
