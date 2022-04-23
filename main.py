from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import tensorflow_hub as hub
import time
import pandas as pd
from tensorflow import keras


model = keras.models.load_model("model_2")

app = Flask(__name__)
api = Api(app)
CORS(app)


class status (Resource):
    # print(url)
    def get(self, url):
        driver = Chrome()
        wait = WebDriverWait(driver, 10)

        if url != "favicon.ico":
            url = "https://www.youtube.com/watch?v=" + url
            driver.get(url)

            for item in range(10):  # by increasing the highest range you can get more content
                wait.until(EC.visibility_of_element_located((By.TAG_NAME, "body"))).send_keys(Keys.END)
                time.sleep(3)

            comment_list = []
            for comment in wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#comment #content-text"))):
                comment_list.append(comment.text)
            print(comment_list)

            df = pd.DataFrame(comment_list)
            data = model.predict(df)
            labels = ['o', 'p', 'q', 's']
            for i in range(len(data)):
                print(df.iloc[[i]][0].iloc[1])
            return {'data': comment_list}


api.add_resource(status, '/<path:url>')
# api.add_resource(Sum, '/add/<path:a>')

if __name__ == '__main__':
    app.run(debug=True)
