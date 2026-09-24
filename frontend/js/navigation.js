document.addEventListener("DOMContentLoaded", function () {

    const navigationContainer = document.createElement("div");

    navigationContainer.style.position = "fixed";
    navigationContainer.style.bottom = "20px";
    navigationContainer.style.left = "20px";
    navigationContainer.style.right = "20px";
    navigationContainer.style.display = "flex";
    navigationContainer.style.justifyContent = "space-between";
    navigationContainer.style.alignItems = "center";
    navigationContainer.style.zIndex = "99999";
    navigationContainer.style.pointerEvents = "none";

    const backButton = document.createElement("button");

    backButton.innerHTML = "←";

    backButton.type = "button";

    backButton.style.pointerEvents = "auto";
    backButton.style.padding = "10px 20px";
    backButton.style.background = "white";
    backButton.style.color = "#1d4ed8";
    backButton.style.border = "2px solid #1d4ed8";
    backButton.style.borderRadius = "6px";
    backButton.style.fontFamily = "Times New Roman";
    backButton.style.fontSize = "16px";
    backButton.style.fontWeight = "bold";
    backButton.style.cursor = "pointer";

    const forwardButton = document.createElement("button");

    forwardButton.innerHTML = "→";

    forwardButton.type = "button";

    forwardButton.style.pointerEvents = "auto";
    forwardButton.style.padding = "10px 20px";
    forwardButton.style.background = "white";
    forwardButton.style.color = "#1d4ed8";
    forwardButton.style.border = "2px solid #1d4ed8";
    forwardButton.style.borderRadius = "6px";
    forwardButton.style.fontFamily = "Times New Roman";
    forwardButton.style.fontSize = "16px";
    forwardButton.style.fontWeight = "bold";
    forwardButton.style.cursor = "pointer";

    backButton.addEventListener("click", function () {
        window.history.back();
    });

    forwardButton.addEventListener("click", function () {
        window.history.forward();
    });

    navigationContainer.appendChild(backButton);
    navigationContainer.appendChild(forwardButton);

    document.body.appendChild(navigationContainer);

});