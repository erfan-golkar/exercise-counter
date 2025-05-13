// error message: Please set the data

document.getElementById("reset").onclick = () => {
    document.getElementById("exercise-time").value = "";
    document.getElementById("reset-time").value = "";
    document.getElementById("set-count").value = "";
}

document.getElementById("start").onclick = () => {
    let exerciseTime = +document.getElementById("exercise-time").value;
    let resetTime = +document.getElementById("reset-time").value;
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
        setCount = setCount < 5 ? 5 : setCount;
        setCount = setCount > 60 ? 60 : setCount;
    }


    console.log(exerciseTime);
}

