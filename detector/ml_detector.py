import torch
import torch.nn as nn
from torchvision import models, transforms
import cv2
import numpy as np
import requests

# =========================
# LOAD MODEL
# =========================
model = models.efficientnet_b0(pretrained=False)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, 3)

model.load_state_dict(torch.load("deepfake_model.pth", map_location="cpu"))
model.eval()

# =========================
# TRANSFORM
# =========================
transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

labels_map = ["REAL", "FAKE", "FILTERED"]

# =========================
# MAIN FUNCTION
# =========================
def predict_image(image_url):
    try:
        resp = requests.get(image_url, timeout=5)
        img_array = np.frombuffer(resp.content, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        if img is None:
            return {"label": "ERROR", "confidence": 0}

        img_t = transform(img)
        img_t = img_t.unsqueeze(0)

        with torch.no_grad():
            outputs = model(img_t)

        probs = torch.softmax(outputs, dim=1)[0]

        real_prob = probs[0].item()
        fake_prob = probs[1].item()
        filtered_prob = probs[2].item()

        # 🔥 SMART LOGIC
        if fake_prob > 0.55:
            label = "FAKE"
        elif fake_prob > 0.30 and filtered_prob > 0.30:
            label = "FAKE"
        elif filtered_prob > real_prob + 0.15:
            label = "FILTERED"
        else:
            label = "REAL"

        confidence = max(real_prob, fake_prob, filtered_prob)

        return {
            "label": label,
            "confidence": round(confidence * 100, 2)
        }

    except Exception as e:
        return {
            "label": "ERROR",
            "confidence": 0,
            "error": str(e)
        }