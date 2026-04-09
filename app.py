from flask import Flask, request, jsonify
from flask_cors import CORS
from detector.ml_detector import predict_image

app = Flask(__name__)
CORS(app)

@app.route('/detect-image', methods=['POST'])
def detect_image():
    data = request.json
    image_url = data.get("image_url")

    if not image_url:
        return jsonify({"error": "No image URL"}), 400

    result = predict_image(image_url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)