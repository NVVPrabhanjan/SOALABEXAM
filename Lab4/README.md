# 🧐 SOA Lab 4: AI and ML Integration with Flask and Docker

## 🎯 Objective

Build an AI-based microservice using a sentiment analysis model, wrap it with Flask for REST inference, containerize with Docker, and explore MLOps concepts.

---

## ✅ Step-by-Step Lab Guide

### 🔹 Step 1: Develop or Load a Pre-trained Model

#### Python script (`train_model.py`):

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

texts = ["I love it", "This is bad", "Amazing product", "Horrible experience"]
labels = [1, 0, 1, 0]

vec = CountVectorizer()
X = vec.fit_transform(texts)

model = MultinomialNB()
model.fit(X, labels)

joblib.dump(vec, 'vectorizer.pkl')
joblib.dump(model, 'sentiment_model.pkl')
```

---

### 🔹 Step 2: Create Flask API (`app.py`)

```python
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

vec = joblib.load('vectorizer.pkl')
model = joblib.load('sentiment_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data['text']
    X = vec.transform([text])
    pred = model.predict(X)[0]
    return jsonify({'prediction': 'positive' if pred else 'negative'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

---

### 🚧 Step 3: Dockerize the Flask Service

#### Dockerfile

```Dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install flask scikit-learn joblib
EXPOSE 5000
CMD ["python", "app.py"]
```

#### Build and Run:

```bash
docker build -t ai-service .
docker run -p 5000:5000 ai-service
```

---

### 📲 Step 4: Test with Postman or curl

**Endpoint**:

* POST `http://localhost:5000/predict`

**Request Body**:

```json
{
  "text": "I absolutely loved it"
}
```

**Response**:

```json
{
  "prediction": "positive"
}
```

---

### 🚂 Step 5: MLOps Concepts

* **Model Versioning**: Use filenames like `sentiment_model_v1.pkl`, `v2.pkl`, etc.
* **Model Registry**: Use tools like MLflow (optional).
* **Automation**: Write tests for model loading & response format.
* **Scalability**: Deploy via Docker Compose or Kubernetes.

---
