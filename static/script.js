var fileInput = document.getElementById("fileInput");
var preview = document.getElementById("previewContainer");
var results = document.getElementById("results");

var realCount = 0;
var fakeCount = 0;
var filteredCount = 0;

// OPEN FILE
function openFile() {
    fileInput.click();
}

// HANDLE FILE SELECT
fileInput.addEventListener("change", function () {
    preview.innerHTML = "";
    results.innerHTML = "";

    Array.from(fileInput.files).forEach(file => {
        uploadFile(file);
    });
});

// UPLOAD + ANALYZE
function uploadFile(file) {

    var formData = new FormData();
    formData.append("file", file);

    var img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => showResult(data))
    .catch(err => console.log(err));
}

// SHOW RESULT
function showResult(data) {

    var color = data.label.toLowerCase();

    if (color === "real") realCount++;
    if (color === "fake") fakeCount++;
    if (color === "filtered") filteredCount++;

    updateStats();

    var card = document.createElement("div");
    card.className = "result-box " + color;

    card.innerHTML =
        "<div class='badge'>" + data.label + "</div>" +
        "<div class='progress'>" +
        "<div class='progress-bar' style='width:" + data.confidence + "%'></div>" +
        "</div>" +
        "<div>" + data.confidence + "% confidence</div>";

    results.appendChild(card);

    updateChart();
}

// UPDATE STATS
function updateStats() {
    document.getElementById("realCount").innerText = realCount;
    document.getElementById("fakeCount").innerText = fakeCount;
    document.getElementById("filteredCount").innerText = filteredCount;
}

// CHART
var chart;

function updateChart() {

    var data = {
        labels: ["Real", "Fake", "Filtered"],
        datasets: [{
            data: [realCount, fakeCount, filteredCount]
        }]
    };

    if (chart) {
        chart.data = data;
        chart.update();
        return;
    }

    chart = new Chart(document.getElementById("chart"), {
        type: "bar",
        data: data
    });
}