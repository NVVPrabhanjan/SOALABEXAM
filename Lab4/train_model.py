# train_model.py (run this separately if needed)
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib

texts = ["I love it", "This is bad", "Amazing product", "Horrible experience"]
labels = [1, 0, 1, 0]  # 1 = Positive, 0 = Negative

vec = CountVectorizer()
X = vec.fit_transform(texts)

model = MultinomialNB()
model.fit(X, labels)

joblib.dump(vec, 'vectorizer.pkl')
joblib.dump(model, 'sentiment_model.pkl')