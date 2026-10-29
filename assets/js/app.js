/**
 * variables
 */
// elements
let inputs = document.querySelectorAll("input");
let startBtn = document.querySelector("#start");
let clearBtn = document.querySelector("#clear");
let stopBtn = document.querySelector(".stop-btn");
let resetBtn = document.querySelector(".reset-btn");
let continueBtn = document.querySelector(".continue-btn");
let titleContainer = document.querySelector(".title-container");
let exerciseContainer = document.querySelector(".exercise-container");
let dumbbellIcon = document.querySelector(".dumbbell-icon");
let heartIcon = document.querySelector(".heart-icon");
let exerciseCounterContainer = document.querySelector(".counter");
let exerciseCounter = document.querySelector(".counter > span.number");
let setCounterContainer = document.querySelector(".set-counter");
let setCounter = document.querySelector(".set-counter span.number");
let h1 = document.querySelector("h1");

// user values
let userExerciseTime = document.querySelector("#exercise-time");
let userResetTime = document.querySelector("#reset-time");
let userSet = document.querySelector("#set-count");

// count values
let exerciseTime = 0;
let restTime = 0;
let set = 1;
let status = "exercise"; // exercise, rest
let app; // app interval variable

/**
 * functions
 */
function clearInputs() {
    if (clearBtn.classList.contains("disabled")) return;
    
    inputs.forEach(input => {
        if (input.value.length > 0) input.value = "";
    });
}

function removeTips() {
    document.querySelectorAll(".tip").forEach(tip => tip.classList.add("d-none"));
}

function disableBtns(btns) {
    btns.forEach(btn => btn.classList.add("disabled"));
}

function enableBtns(btns) {
    btns.forEach(btn => btn.classList.remove("disabled"));
}

function appIsReady() {
    if (startBtn.classList.contains("disabled")) {
        return false;
    }
    
    for (let input of inputs) {
        if (input.value.length <= 0) {
            return false;
        }
    
        if (typeof input.valueAsNumber != "number") {
            return false;
        }
    
        if (!Number.isInteger(+input.value)) {
            return false;
        }

        if (
            (input.id == "exercise-time" || input.id == "reset-time") &&
            (input.value > 60 || input.value < 5)
        ) {
            return false;
        }

        if (input.id == "set-count" && input.value > 60) {
            return false;
        }
    }

    return true;
}

function getReady() {
    let btns = document.querySelectorAll(".row1-btns");
    let timer;

    userExerciseTime = +userExerciseTime.value;
    userResetTime = +userResetTime.value;
    userSet = +userSet.value;
    h1.innerText = "GET READY";
    h1.classList.remove("text-success");

    removeTips();
    disableBtns(btns);
    
    timer = setInterval(function() {
        h1.classList.toggle("text-danger");
    }, 160);

    setTimeout(function() {
        clearInterval(timer);
    }, 3000);
}

function isExerciseEnd() {
    if (
        set == userSet &&
        status == "exercise" &&
        exerciseTime > userExerciseTime
    ) {
        return true;
    }

    return false;
}

function end() {
    // show title, hide app
    titleContainer.classList.remove("d-none");
    exerciseContainer.classList.add("d-none");

    // title text
    h1.classList.add("text-success");
    h1.innerText = "GOOD JOB";

    // btns
    enableBtns([clearBtn, startBtn]);

    // these variables was change during process. should return to default
    userExerciseTime = document.querySelector("#exercise-time");
    userResetTime = document.querySelector("#reset-time");
    userSet = document.querySelector("#set-count");

    // default app variables
    exerciseTime = 0;
    restTime = 0;
    set = 1;
    status = "exercise";

    // stop the app
    clearInterval(app);
}

function runApp() {
    // remove title, show app
    titleContainer.classList.add("d-none");
    exerciseContainer.classList.remove("d-none");

    // icons
    if (status == "exercise") {
        dumbbellIcon.classList.remove("d-none");
        heartIcon.classList.add("d-none");
    } else {
        dumbbellIcon.classList.add("d-none");
        heartIcon.classList.remove("d-none");
    }

    // counter
    setCounter.innerHTML = set;

    if (status == "exercise") {
        exerciseCounterContainer.classList.remove("text-danger");
        exerciseCounterContainer.classList.add("text-success");
        exerciseCounter.innerHTML = exerciseTime;
    } else {
        exerciseCounterContainer.classList.add("text-danger");
        exerciseCounterContainer.classList.remove("text-success");
        exerciseCounter.innerHTML = restTime;
    }

    // btns
    stopBtn.classList.remove("d-none");
    resetBtn.classList.add("d-none");
    continueBtn.classList.add("d-none");

    // app
    if (status == "exercise") {
        exerciseTime++;

        if (set == userSet && exerciseTime > userExerciseTime) {
            end();
            return;
        }

        if (exerciseTime > userExerciseTime) {
            exerciseTime = 0;
            status = "rest";
        }

    } else { // status == "rest"
        restTime++;

        if (restTime > userResetTime) {
            restTime = 0;
            set++;
            status = "exercise";
        }
    }
}

function updateContent() {
    if (isExerciseEnd()) {
        end();
    } else {
        runApp();
    }
}

function run() {
    setTimeout(function() { // run the app after getReady() function (delay is 3s)
        app = setInterval(updateContent, 1000);
    }, 3000);
}

function continueApp() {
    resetBtn.classList.add("d-none");
    continueBtn.classList.add("d-none");
    stopBtn.classList.remove("d-none");
    
    app = setInterval(updateContent, 1000);
}

function stopApp() {
    resetBtn.classList.remove("d-none");
    continueBtn.classList.remove("d-none");
    stopBtn.classList.add("d-none");

    clearInterval(app);
}

/**
 * events
 */
// clear inputs
clearBtn.addEventListener("pointerup", () => clearInputs());

// start app
startBtn.addEventListener("pointerup", () => {
    if (!appIsReady()) return;

    getReady();
    run();
});

// stop app
stopBtn.addEventListener("pointerup", () => stopApp());

// reset app
resetBtn.addEventListener("pointerup", () => end());

// continue app
continueBtn.addEventListener("pointerup", () => continueApp());