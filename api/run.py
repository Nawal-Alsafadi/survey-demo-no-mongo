import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
#############################################################
from flask import Flask
from flask_cors import CORS
from api.routes.appRoutes import app_routes

app = Flask(__name__)
app.debug = True
CORS(app)
app_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
