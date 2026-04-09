from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from detector.ml_detector import predict_image
import cv2
import numpy as np

# =========================
# CREATE APP FIRST (IMPORTANT)
# =========================
app = Flask(__name__)
CORS(app)

# =========================
# HOME PAGE (WEBSITE)
# =========================
@app.route('/')
def home():
    return render_template("index.html")


# =========================
# EXTENSION API (URL INPUT)
# =========================
@app.route('/detect-image', methods=['POST'])
def detect_image():
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL"}), 400

    result = predict_image(image_url)
    return jsonify(result)


# =========================
# WEBSITE UPLOAD API
# =========================
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')

    if not file:
        return jsonify({"label": "ERROR", "confidence": 0})

    filepath = "temp.jpg"
    file.save(filepath)

    try:
        result = predict_image(filepath)

        return jsonify({
            "label": result.get("label", "REAL"),
            "confidence": result.get("confidence", 0)
        })

    except Exception as e:
        print(e)
        return jsonify({"label": "ERROR", "confidence": 0})

# =========================
# RUN SERVER
# =========================
if __name__ == '__main__':
    app.run(debug=True)