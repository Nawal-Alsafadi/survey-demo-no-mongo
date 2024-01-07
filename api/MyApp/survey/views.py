import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import json
from flask import render_template, request, redirect, url_for
from flask import  request, render_template, redirect, url_for

from api.routes.survey_bluePrint import survey_bp

survey_data = {
    "name": "",
    "age": "",
    "email": "",
    "course": "",
    "problems_in_course": "",
    "join_another_course": "",
    "courses_to_join": "",
    "comment": "",
    "overall_rating": "",
}

with open('api/survey.json', 'r') as file:
    survey_questions_from_file = json.load(file)
    
survey_questions = survey_questions_from_file

all_responses = []

@survey_bp.route('/')
def home():
    return render_template('index.html')

@survey_bp.route('/survey', methods=['POST'])
def survey():
    user_input = request.form.to_dict()
    survey_data.update(user_input)
    next_question = determine_next_question(user_input)

    if next_question == "thank_you":
        all_responses.append(survey_data.copy())
        return redirect(url_for('survey.summary'))
    else:    return render_template('survey.html', question=survey_questions[next_question], question_id=next_question, message=survey_data.get('cold_start_message', ''), user_input=user_input)

@survey_bp.route('/summary', methods=['GET'])
def summary():
    return render_template('summary.html', all_responses=all_responses)


def determine_next_question(user_input):
    current_question = user_input.get("current_question", "cold_start_message")

    if current_question in survey_questions:
        question_data = survey_questions[current_question]
        user_response = user_input.get(question_data.get("field", ""), "").lower()

        if "yes_no" in question_data["type"]:
            next_question = question_data.get("next_question_yes" if user_response == "yes" else "next_question_no", "")
        else:
            next_question = question_data.get("next_question", "")

        return next_question

    return "thank_you"
