# DeepShield-Deepfake-Detector
 # 🛡️ DeepShield - AI Deepfake Detection System

DeepShield is a full-stack AI system that detects whether an image is **REAL**, **AI-GENERATED (FAKE)**, or **FILTERED**.

It works in:

* 🌐 Website (upload media)
* 🧩 Chrome Extension (real-time Instagram detection)

---

## 🚀 Features

* 🔍 Detects AI-generated images
* 🎨 Detects filtered / edited images
* 🖼️ Real-time detection on Instagram (Chrome Extension)
* 📤 Upload images via website
* 🤖 Custom-trained EfficientNet model (PyTorch)

---

## 🧠 Tech Stack

* Python (Flask)
* PyTorch (EfficientNet)
* OpenCV
* JavaScript (Chrome Extension)
* HTML/CSS (Website UI)

---

## 📁 Project Structure

```
DeepShieldBackend/
│
├── app.py
├── train_model.py
├── deepfake_model.pth
│
├── detector/
│   └── ml_detector.py
│
├── dataset/
│   ├── train/
│   │   ├── real/
│   │   ├── fake/
│   │   └── filtered/
│   │
│   └── val/
│       ├── real/
│       ├── fake/
│       └── filtered/
│
├── templates/
│   └── index.html
│
└── extension/
    ├── manifest.json
    └── content.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/yourusername/DeepShield.git
cd DeepShield
```

---

### 2️⃣ Create Virtual Environment

```
python -m venv .venv
```

Activate:

```
.venv\Scripts\activate
```

---

### 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## 🧠 Training the Model (Optional)

If you want to retrain:

```
python train_model.py
```

Make sure dataset is structured as:

```
dataset/train/real
dataset/train/fake
dataset/train/filtered
```

---

## ▶️ Run Backend Server

```
python app.py
```

Server runs on:

```
http://127.0.0.1:5000
```

---

## 🌐 Use Website

Open in browser:

```
http://127.0.0.1:5000
```

Upload image → get result

---

## 🧩 Chrome Extension Setup (DeepShield)

Follow these steps to use the DeepShield extension:

### 📥 Step 1: Download the Extension

After cloning the repo, navigate to:

```
extension/
```

---

### ⚙️ Step 2: Open Chrome Extensions

Go to:

```
chrome://extensions/
```

---

### 🔧 Step 3: Enable Developer Mode

* Toggle **Developer Mode** (top right)

---

### 📦 Step 4: Load Extension

* Click **Load unpacked**
* Select the `extension/` folder from this project

---

### ▶️ Step 5: Start Backend

Make sure backend is running:

```
python app.py
```

---

### 🌐 Step 6: Use on Instagram

* Open Instagram in Chrome

* Scroll posts

* You will see:

* 🔴 AI GENERATED

* 🟡 FILTERED

* 🟢 REAL

displayed on images automatically

---

### ⚠️ Important Notes

* Backend must be running (`http://127.0.0.1:5000`)
* Extension works only on Chrome (Developer Mode)
* If nothing appears → reload extension

---


## 📸 How It Works

```
Image → Flask API → ML Model → Prediction → UI
```

### Classes:

* 🟢 REAL
* 🔴 FAKE (AI Generated)
* 🟡 FILTERED

---

## ⚠️ Limitations

* Model accuracy depends on dataset quality
* Some AI images may be classified as FILTERED
* Video detection is basic (frame-based)

---

## 🚀 Future Improvements

* Face detection before classification
* Video deepfake detection
* Cloud deployment (Render / AWS)
* Mobile app integration

---

## 👨‍💻 Author

Developed by **Ankit Kumar Jha**

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🤝 Contribute

---

