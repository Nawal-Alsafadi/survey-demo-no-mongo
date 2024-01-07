// $(document).ready(function() {
//     let currentQuestionIndex = 0;
//     let userResponses = {};
//     let question;

//     function loadQuestion(index) {
//         $.ajax({
//             url: `/get_question/${index}`,
//             type: 'GET',
//             success: function(data) {
//                 question = data;
//                 console.log("Received question from the server:", question);

//                 $('#question-container').text(question.text);

//                 if (question.type === 'info') {
//                     console.log("Rendering info fields");
//                     $('#question-container').append('<br>');
//                     question.fields.forEach(function(field) {
//                         $('#question-container').append(
//                             `<label>${field.charAt(0).toUpperCase() + field.slice(1)}:</label> <input type="text" name="${field}" required> `
//                         );
//                     });
//                 } else if (question.type === 'choice') {
//                     console.log("Rendering choice options");
//                     $('#question-container').append('<br>');
//                     question.choices.forEach(function(choice) {
//                         $('#question-container').append(
//                             `<input type="radio" name="answer" value="${choice}">${choice} `
//                         );
//                     });
//                 } else if (question.type === 'comment') {
//                     console.log("Rendering comment field");
//                     $('#question-container').append('<br>');
//                     $('#question-container').append(
//                         `<textarea id="comment" rows="4" cols="50" placeholder="Enter your comment"></textarea>`
//                     );
//                 }
//             }
//         });
//     }

//     function saveResponse() {
//         if (currentQuestionIndex === 1 && question) {
//             console.log("Saving info fields");
//             userResponses[currentQuestionIndex] = {};
//             if (question.fields) {
//                 question.fields.forEach(function(field) {
//                     userResponses[currentQuestionIndex][field] = $(`input[name="${field}"]`).val();
//                 });
//             }
//         } else if (question) {
//             console.log("Saving answer or comment");
//             const answer = $('input[name="answer"]:checked').val() || $('#comment').val();
//             userResponses[currentQuestionIndex] = answer;
//         }
//     }

//     function nextQuestion() {
//         saveResponse();

//         // Check for a follow-up question and update currentQuestionIndex accordingly
//         if (question.follow_up) {
//             const answer = $('input[name="answer"]:checked').val() || $('#comment').val();
//             if (question.follow_up[answer]) {
//                 currentQuestionIndex = question.follow_up[answer].id;
//             }
//         } else {
//             currentQuestionIndex++;
//         }

//         console.log(`Moving to question ${currentQuestionIndex}`);

//         if (currentQuestionIndex < surveyQuestions.length) {
//             loadQuestion(currentQuestionIndex);
//         } else {
//             console.log("Survey completed. Sending responses to the server.");

//             $.ajax({
//                 url: '/submit_survey',
//                 type: 'POST',
//                 contentType: 'application/json',
//                 data: JSON.stringify(userResponses),
//                 success: function(response) {
//                     console.log("Server response:", response);
//                     alert('Survey completed! Thank you for your responses.');
//                 }
//             });
//         }
//     }

//     $.ajax({
//         url: '/get_survey',
//         type: 'GET',
//         success: function(survey) {
//             console.log("Received survey data from the server:", survey);
//             surveyQuestions = survey.questions;
//             loadQuestion(currentQuestionIndex);
//         }
//     });

//     $('#next-button').on('click', function() {
//         nextQuestion();
//     });
// });
