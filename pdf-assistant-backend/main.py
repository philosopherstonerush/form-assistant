from flask import Flask, request, jsonify, make_response
import base64
import pathlib
from baml_client.sync_client import b
from baml_client.types import Form
from baml_py import Image

app = Flask(__name__)

def image_to_base64(image_path):
    image_path = pathlib.Path(image_path)
    if not image_path.is_file():
        raise FileNotFoundError(f"No file found at {image_path}")

    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    return base64_string

@app.route('/api/extract', methods=['POST', 'OPTIONS'])
def upload_image():
    
    if request.method == "OPTIONS": 
        return _build_cors_preflight_response()
    else:
        req_data = request.get_json()
        base64_images = req_data.get("images", "")
        
        questions = []
        
        for i in range(len(base64_images)):
            base64_string = base64_images[i].split(",")[1]
            try:
                llm_resp = b.ExtractQuestions(Image.from_base64(base64=base64_string, media_type="image/png"))
            except Exception as e:
                return jsonify({"error": str(e)}), 400

            q = llm_resp.questions
            for i in range(len(q)):
                questions.append(q[i].model_dump_json())
                
        return _corsify_actual_response(jsonify(questions)), 200
    

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    # image_path = "./assets/ex1.png"
    # base64_string = image_to_base64(image_path)
    # resp = b.ExtractQuestions(Image.from_base64(base64=base64_string,
    #             media_type="image/png"))
    # breakpoint()

    app.run(debug=True)






