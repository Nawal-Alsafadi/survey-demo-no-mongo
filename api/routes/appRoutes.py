# from api.routes.survey_bluePrint import survey_bp

from api.MyApp.survey.views import survey_bp
from flask import Flask
from flask_cors import CORS
def app_routes(app):
    app.register_blueprint(survey_bp)
    
