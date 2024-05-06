import Question from "./models/Question";
import QuizApp from "./models/Quiz";
import {GameMode} from "./types/enum/GameMode";
import {QuestionMode} from "./types/enum/QuestionMode";
import {IAnswer} from "./types/interfaces/IAnswer";

window.addEventListener('load', () => {

    const quizApp = new QuizApp([], [], 0);
    const questionAnswers: IAnswer[] = [];
    const divWelcome = document.getElementById("welcome-container") as HTMLElement;
    const divQuestionsContainer = document.getElementById("question-container") as HTMLElement;
    const divPlayersContainer = document.getElementById("players-container") as HTMLElement;
    const divQuizContainer = document.getElementById("quiz-container") as HTMLElement;
    const divScoreboardContainer = document.getElementById("scoreboard-container") as HTMLElement;
    const divQuestionApiContainer = document.getElementById("question-api-container") as HTMLElement;
    const divCurrentPlayer = document.getElementById("current-player-container") as HTMLElement;

    //navigatie
    document.getElementById("aQuestions")?.addEventListener('click', () => {
        quizApp.questionMode === QuestionMode.Custom ? updateVisibleItem(divQuestionsContainer) : updateVisibleItem(divQuestionApiContainer);
    });

    document.getElementById("aPlayers")?.addEventListener('click', () => {
        updateVisibleItem(divPlayersContainer);
        const btn = document.getElementById("btn-start-quiz") as HTMLButtonElement;
        const btnAddPlayer = document.getElementById("btn-add-player") as HTMLButtonElement;

        if (quizApp.players.length === quizApp.numberOfPlayers) {
            btn.classList.remove('d-none');
            btnAddPlayer.classList.add('d-none');
        } else {
            btn.classList.add('d-none');
            btnAddPlayer.classList.remove('d-none');
        }

    });

    document.getElementById("aQuiz")?.addEventListener('click', () => {

        if (quizApp.players.length === quizApp.numberOfPlayers)
            quizApp.startQuiz();
        showCurrentPlayerBlock();
        updateVisibleItem(divQuizContainer);
        updateVisibleItem(divCurrentPlayer);

    });

    document.getElementById("aScoreboard")?.addEventListener('click', () => {
        updateVisibleItem(divScoreboardContainer);
    });

    document.getElementById("btn-start-quiz")?.addEventListener('click', () => {
        if (quizApp.players.length === quizApp.numberOfPlayers)
            quizApp.startQuiz();
        showCurrentPlayerBlock();
        updateVisibleItem(divQuizContainer);
        updateVisibleItem(divCurrentPlayer);
    });

    document.getElementById("btn-next")?.addEventListener('click', () => {
        updateVisibleItem(divPlayersContainer);
    });

    // implement logic to set the game mode
    document.getElementById("gameMode")?.addEventListener("click", () => {
        let modeSwitch = document.getElementById("gameMode") as HTMLInputElement;
        const modeSwitchLabel = document.getElementById("txtGameMode") as HTMLSpanElement;
        if (modeSwitch.checked) modeSwitchLabel.innerText = GameMode.Multi;
        else modeSwitchLabel.innerText = GameMode.Single;
    })
    // implement logic to set the number of players

    document.getElementById("txtNumberQuestions")?.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const number = parseInt(target.value);
        quizApp.quizDuration = number;
        const btn = document.getElementById("btnStart") as HTMLButtonElement;
        btn.disabled = number <= 0;
    });

    // implement logic to set the question mode
    // implement logic to fetch questions from api

    document.getElementById("btnStart")?.addEventListener("click", () => {
        const navigation = document.getElementById("lstNavigation")
        navigation?.classList.remove('d-none')
        if (quizApp.questionMode === QuestionMode.Custom) {
            updateVisibleItem(divQuestionsContainer);
            const noQuestionText = document.getElementById("no-questions") as HTMLElement;
            noQuestionText.innerText = `No questions have been added yet. Add ${quizApp.quizDuration * quizApp.numberOfPlayers} questions to start.`;
        } else updateVisibleItem(divQuestionApiContainer);


    });

    document.getElementById("btn-add-question")?.addEventListener("click", () => {
        const q = document.getElementById("txt-question") as HTMLInputElement;
        const btnCloseModal = document.getElementById("btnCloseModal") as HTMLButtonElement;
        if (!validateQuestionInput(q.value, questionAnswers)) {
            alert("Please fill in the question (atleast 5 words long) and provide at least one answer with the correct option (minimum 2 answers).");
            return;
        }
        const question = new Question(q.value);
        questionAnswers.forEach(a => question.addAnswer(a));
        quizApp.addQuestion(question);
        updateQuestionList();
        clearAnwsersList();
        q.value = '';

        quizApp.quizDuration === quizApp.questions.length ? updateVisibleItem(divPlayersContainer) : null;
        btnCloseModal.click();
        toggleAddQuestionButton();
    });

    document.getElementById("btn-add-answer")?.addEventListener('click', () => {
        const answer = document.getElementById("txt-answer") as HTMLInputElement;
        const chkAnswer = document.getElementById("chk-correct") as HTMLInputElement;
        if (answer.value.trim() === "") {
            alert("Answer cannot be empty.");
            return;
        }
        const a: IAnswer = {
            text: answer.value,
            isCorrect: chkAnswer.checked
        }

        questionAnswers.push(a);
        updateAnswersList();

        answer.value = '';
        chkAnswer.checked = false;
    });

    document.getElementById("btn-add-player")?.addEventListener("click", () => {
        const input = document.getElementById("player-name") as HTMLInputElement;
        const name = input.value.trim();

        if (name ===""){
            alert("Player name is required");
            input.value = "";
            return;
        }
        if(quizApp.players.some(player => player.name.toLowerCase() === name.toLowerCase())){
            alert("Player name must be unique");
            input.value = "";
            return;
        }
        quizApp.addPlayer(name);
        input.value = "";

        if (quizApp.players.length === quizApp.numberOfPlayers) {
            showCurrentPlayerBlock();
            updateVisibleItem(divQuizContainer);
            quizApp.startQuiz();
        }
    });

    // implement logic to submit the answer, update the score and move to the next question
    // implement logic to restart the game

    const updateQuestionList = () => {
        const noQuestions = document.getElementById("no-questions") as HTMLElement;
        const list = document.getElementById("question-list") as HTMLElement;

        list.innerHTML = '';

        quizApp.questions.forEach(q => {
            const li = document.createElement("li");
            li.textContent = q.toString();
            list.appendChild(li);
        });
        noQuestions.classList.add('d-none');
    };

    const updateAnswersList = () => {
        const answersList = document.getElementById("answers-list") as HTMLElement;
        const correctAnswerList = document.getElementById("correct-answer-list") as HTMLElement;

        answersList.innerHTML = '';
        correctAnswerList.innerHTML = '';

        questionAnswers.forEach(a => {
            const li = document.createElement("li");
            li.textContent = a.text;
            answersList.appendChild(li);
        });

        const correctAnswer = questionAnswers.find(a => a.isCorrect)
        if (correctAnswer) {
            const li = document.createElement("li");
            li.textContent = correctAnswer.text;
            correctAnswerList.appendChild(li);
        }

        toggleAddButton(correctAnswer);
    };

    const clearAnwsersList = () => {
        questionAnswers.length = 0;
        updateAnswersList();
    };

    const toggleAddQuestionButton = () => {
        const btn = document.getElementById("btn-add-q") as HTMLButtonElement;
        if (quizApp.questions.length === quizApp.quizDuration * quizApp.numberOfPlayers) {
            btn.disabled = true;
        }
    };

    const toggleAddButton = (correctAnswer: IAnswer | undefined) => {
        const btn = document.getElementById("btn-add-question") as HTMLButtonElement;
        btn.disabled = correctAnswer ? false : true;
    };

    const hideAllElementsExcept = (element: HTMLElement) => {
        const elementsToHide = [divCurrentPlayer, divWelcome, divQuestionsContainer, divPlayersContainer, divQuizContainer, divScoreboardContainer, divQuestionApiContainer];
        elementsToHide.forEach(e => {
            if (e !== null)
                e.classList.add('d-none')
        });
        element.classList.remove('d-none');
    };

    const updateVisibleItem = (element: HTMLElement) => {
        hideAllElementsExcept(element);

        if (element === divQuestionApiContainer || element === divQuestionsContainer) {
            const btnAdd = document.getElementById("btn-add-q") as HTMLButtonElement;
            const btnNext = document.getElementById("btn-next") as HTMLButtonElement;
            if (quizApp.questionMode === QuestionMode.Custom) {
                btnNext.classList.add("d-none");
                btnAdd.classList.remove("d-none");
                return;
            } else {
                btnNext.classList.remove("d-none");
                btnAdd.classList.add("d-none");
                return;
            }
        }

        if (element === divQuizContainer) {
            showCurrentPlayerBlock();
            return;
        }
    };

    const validateQuestionInput = (questionText: string, answers: IAnswer[]): boolean => {
        const words = questionText.trim().split(/\s+/);
        if (words.length < 5) {
            return false;
        }
        if (answers.length < 2) {
            return false;
        }
        return answers.some(answer => answer.isCorrect);
    };

    const showCurrentPlayerBlock = () => {
        const currentPlayer = document.getElementById("current-player-container") as HTMLElement;
        currentPlayer.classList.remove("d-none");
        const currentPlayerName = document.getElementById("current-player-name") as HTMLElement;
        currentPlayerName.innerText = quizApp.players[quizApp.currentPlayerIndex]?.name ?? '';
    }

    const init = () => {
        hideAllElementsExcept(divWelcome);
    }

    init();


});
