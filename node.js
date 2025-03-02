document.addEventListener("DOMContentLoaded", function () {
    const taskCountElement = document.getElementById("taskCount"); 
    const tasksAssignedElement = document.getElementById("tasksAssigned");
    const logContainer = document.getElementById("logContainer"); 
    const completeButtons = document.querySelectorAll(".complete-btn");
    const themeButton = document.querySelector(".header-right img:nth-child(3)"); // Theme button (colorful icon)
    const body = document.body; // Get body element
    const infoBox = document.querySelector(".info-box"); // Redirect button

    let totalTasks = completeButtons.length;
    let remainingTasks = totalTasks; 
    let completedTasks = 0; 
    let isDarkMode = false;

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    function updateDate() {
        const currentDateElement = document.getElementById("currentDate");
        const today = new Date();
        const options = { weekday: "short", month: "long", day: "numeric", year: "numeric" };
        currentDateElement.textContent = today.toLocaleDateString("en-US", options);
    }

    updateDate(); 

    completeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            if (!button.disabled) {
                completedTasks++;
                remainingTasks--;

                // Update UI
                button.textContent = "Completed"; 
                button.style.backgroundColor = "#ccc"; 
                button.style.color = "#666"; 
                button.disabled = true; 

                // Update counters
                tasksAssignedElement.textContent = remainingTasks;
                taskCountElement.textContent = parseInt(taskCountElement.textContent) + 1;

                // Add to activity log with real-time timestamp
                const logEntry = document.createElement("p");
                logEntry.textContent = `[${getCurrentTime()}] Task "${button.parentElement.parentElement.querySelector("h3").textContent}" marked as completed.`;
                logContainer.appendChild(logEntry);

                // Show alert for each task completion
                alert(`Task "${button.parentElement.parentElement.querySelector("h3").textContent}" is completed!`);

                // Final alert when all tasks are completed
                if (completedTasks === totalTasks) {
                    setTimeout(() => {
                        alert("🎉 All tasks are successfully completed! Great job!");
                    }, 500);
                }
            }
        });
    });

    // Clear Activity Log
    document.getElementById("clearHistory").addEventListener("click", function () {
        logContainer.innerHTML = "";
    });

    // Theme Switcher (Dark & Light Mode)
    themeButton.addEventListener("click", function () {
        if (!isDarkMode) {
            body.style.background = "linear-gradient(130.7deg, rgb(15, 23, 42) 0.419%, rgb(30, 41, 59) 52.66%, rgb(51, 65, 85) 99.733%)"; // Dark theme
        } else {
            body.style.background = "linear-gradient(130.7deg, rgb(55, 82, 253) 0.419%, rgb(108, 127, 250) 52.66%, rgb(155, 168, 248) 99.733%)"; // Light theme
        }
        isDarkMode = !isDarkMode;
    });

    // Redirect to Blog Page on Info Box Click
    infoBox.addEventListener("click", function () {
        window.location.href = "blog.html";
    });

});
