// ==============================
// 🔥 MODERN BADGE UI
// ==============================
function createBadge(img, label, confidence) {
    const parent = img.parentElement;
    if (!parent) return;

    if (parent.querySelector(".deepshield-badge")) return;

    parent.style.position = "relative";

    const badge = document.createElement("div");
    badge.className = "deepshield-badge";

    // 🎨 Label styling
    let color, text, glow;

    if (label === "FAKE") {
        text = "AI GENERATED";
        color = "#ff4d4f";
        glow = "rgba(255,77,79,0.6)";
    } else if (label === "FILTERED") {
        text = "FILTERED";
        color = "#fadb14";
        glow = "rgba(250,219,20,0.6)";
    } else {
        text = "REAL";
        color = "#52c41a";
        glow = "rgba(82,196,26,0.6)";
    }

    // 🧠 UI Content
    badge.innerHTML = `
        <div style="
            backdrop-filter: blur(10px);
            background: rgba(0,0,0,0.65);
            border-radius: 12px;
            padding: 8px 12px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            border: 1px solid ${color};
            box-shadow: 0 0 10px ${glow};
            font-family: 'Segoe UI', sans-serif;
        ">
            <span style="
                font-size: 11px;
                color: ${color};
                font-weight: 600;
                letter-spacing: 0.5px;
            ">
                ${text}
            </span>

            <span style="
                font-size: 10px;
                color: #ddd;
            ">
                ${confidence}% confidence
            </span>
        </div>
    `;

    // 📍 Position
    badge.style.position = "absolute";
    badge.style.top = "12px";
    badge.style.right = "12px";
    badge.style.zIndex = "9999";
    badge.style.transition = "all 0.3s ease";
    badge.style.opacity = "0";
    badge.style.transform = "translateY(-5px)";

    parent.appendChild(badge);

    // ✨ Animation
    setTimeout(() => {
        badge.style.opacity = "1";
        badge.style.transform = "translateY(0)";
    }, 100);
}


// ==============================
// 🔍 IMAGE ANALYSIS
// ==============================
function analyzeImages() {
    const images = document.querySelectorAll("article img");

    images.forEach(img => {
        if (img.dataset.checked) return;

        // Ignore small icons
        if (img.width < 200 || img.height < 200) return;

        if (!img.src) return;

        img.dataset.checked = "true";

        fetch("http://127.0.0.1:5000/detect-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image_url: img.src
            })
        })
        .then(res => res.json())
        .then(data => {
            createBadge(img, data.label, data.confidence);
        })
        .catch(err => console.log("DeepShield Error:", err));
    });
}


// ==============================
// 🔁 AUTO RUN
// ==============================
setInterval(analyzeImages, 4000);


// ==============================
// 🧪 DEBUG
// ==============================
console.log("🚀 DeepShield UI Loaded");