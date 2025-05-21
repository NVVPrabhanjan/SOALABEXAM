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
