// error message: Please set the data

document.getElementById("reset").onclick = () => {
    document.getElementById("exercise-time").value = "";
    // document.getElementById("reset-time").value = ""; // temp
    document.getElementById("set-count").value = "";
}

document.getElementById("start").onclick = () => {
    let exerciseTime = +document.getElementById("exercise-time").value;
    // let resetTime = +document.getElementById("reset-time").value; // temp
    let resetTime = 10; // temp
    let setCount = +document.getElementById("set-count").value;

    if (exerciseTime == 0 || resetTime == 0 || setCount == 0) {
        document.getElementById("error-message").innerHTML = "Please set the data";
        return;
    } else {
        document.getElementById("error-message").innerHTML = "";

        exerciseTime = exerciseTime < 5 ? 5 : exerciseTime;
        exerciseTime = exerciseTime > 60 ? 60 : exerciseTime;
        resetTime = resetTime < 5 ? 5 : resetTime;
        resetTime = resetTime > 60 ? 60 : resetTime;
        setCount = setCount > 60 ? 60 : setCount;
    }

    let blinkBeforeStart = setInterval(function() {
        let inspireText = document.getElementById("inspire-text");
        if (inspireText.getAttribute("class") == "mt-4 text-primary") {
            inspireText.setAttribute("class", "mt-4 text-danger fw-bold");
            inspireText.innerHTML = "Get Ready!";
        } else {
            inspireText.setAttribute("class", "mt-4 text-primary");
            inspireText.innerHTML = "Get Ready!";
        }
    }, 200);

    setTimeout(function() {
        clearInterval(blinkBeforeStart);
        document.getElementById("inspire-text").setAttribute("class", "d-none");

        let content = document.getElementById("content");
        content.innerHTML = `
            <span id="exercise-info" data-type="exercise"></span>
            <i class="fas fa-dumbbell mb-2 text-success exercise-icons" id="exercise-icon"></i>
            <span class="h1 fw-bold text-success" id="exercise-counter-container"><span class="h1 fw-bold text-success" id="exercise-counter">0</span>s</span>
            <span class="h6 text-secondary">set <span id="set-counter">1</span></span>

            <button type="button" class="btn btn-sm btn-danger" id="stop">
                <span>Cancel </span>
                <i class="fas fa-ban"></i>
            </button>
        `;

        document.getElementById("stop").onclick = () => {
            clearInterval(exerciseInterval);
            content.innerHTML = `
                <h1 class="mt-4 text-primary" id="inspire-text">Get Ready!</h1>
            `;
        }

        let set = 1;
        let count = 0;
        let exerciseInterval = setInterval(function() {
            document.getElementById("exercise-counter").innerHTML = count;
            document.getElementById("set-counter").innerHTML = set;
            count++;

            if (count > exerciseTime) {

                if (set > setCount) {
                    clearInterval(exerciseInterval);
                    content.innerHTML = `<h1 class="mt-4 text-success" id="inspire-text">Good job!</h1>`;
                }

                let type = document.getElementById("exercise-info");

                if (type.dataset.type == "exercise") {
                    set++;
                    count = 0;
                    content.innerHTML = `
                        <span id="exercise-info" data-type="rest"></span>
                        <i class="fas fa-heart-pulse mb-2 text-danger exercise-icons"></i>
                        <span class="h1 fw-bold text-danger" id="exercise-counter-container"><span class="h1 fw-bold text-danger" id="exercise-counter"></span>s</span>
                        <span class="h6 text-secondary">set <span id="set-counter"></span></span>

                        <button type="button" class="btn btn-sm btn-danger" id="stop">
                            <span>Cancel </span>
                            <i class="fas fa-ban"></i>
                        </button>
                    `;
                } else {
                    count = 0;
                    content.innerHTML = `
                        <span id="exercise-info" data-type="exercise"></span>
                        <i class="fas fa-dumbbell mb-2 text-success exercise-icons"></i>
                        <span class="h1 fw-bold text-success" id="exercise-counter-container"><span class="h1 fw-bold text-success" id="exercise-counter"></span>s</span>
                        <span class="h6 text-secondary">set <span id="set-counter"></span></span>
            
                        <button type="button" class="btn btn-sm btn-danger" id="stop">
                            <span>Cancel </span>
                            <i class="fas fa-ban"></i>
                        </button>
                    `;
                }
            }

        }, 1000);

    }, 3000);
}
