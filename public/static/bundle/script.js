(()=>{"use strict";const e=function(e){var t=this;this.answers=[],this.addAnswer=function(e){t.answers.push(e)},this.toString=function(){return"Question: ".concat(t.question,", Answers: ").concat(t.answers.map((function(e){return e.text})).join(", "))},this.question=e},t=function(e){var t=this;this.isCurrent=!1,this.updateScore=function(e){t.score+=e},this.toString=function(){return"Player: ".concat(t.name," - Score: ").concat(t.score)},this.name=e,this.score=0};var n;!function(e){e.Api="API",e.Custom="Vrije ingave"}(n||(n={}));const o=function(){function e(e,t,o){this.quizDuration=0,this.questions=[],this.currentQuestionIndex=0,this.numberOfPlayers=1,this.players=[],this.questions=e,this.players=t,this.quizDuration=o,this.questionMode=n.Custom,this.currentPlayerIndex=0}return e.prototype.setQuestionMode=function(e){this.questionMode=e},e.prototype.addQuestion=function(e){this.questions.includes(e)||this.questions.push(e)},e.prototype.addPlayer=function(e){var n=new t(e);this.players.push(n),this.updatePlayerList()},e.prototype.removePlayer=function(e){this.players=this.players.filter((function(t){return t.name!==e})),this.updatePlayerList()},e.prototype.startQuiz=function(){this.currentQuestionIndex=0,this.nextQuestion()},e.prototype.testIfAnswerIsCorrect=function(e,t){var n=this.questions[e].answers.find((function(e){return e.isCorrect}));return(null==n?void 0:n.text)===t},e.prototype.nextQuestion=function(){this.currentQuestionIndex===this.questions.length?this.endQuiz():(this.showQuestion(this.currentQuestionIndex),this.currentQuestionIndex++)},e.prototype.updatePlayerList=function(e){void 0===e&&(e="player-list");var t=document.getElementById(e);t&&(t.innerHTML="",this.players.forEach((function(e){var n=document.createElement("li");n.textContent="".concat(e.name," ").concat(e.isCurrent?"(Current)":""),t.appendChild(n)})))},e.prototype.endQuiz=function(){this.hideQuiz(),this.showScoreBoard()},e.prototype.hideQuiz=function(){var e=document.getElementById("quiz-container");e&&e.classList.add("d-none")},e.prototype.showCurrentPlayer=function(){var e,t=document.getElementById("current-player-container"),n=document.getElementById("current-player-name");t&&n&&(n.textContent=null===(e=this.players[this.currentPlayerIndex])||void 0===e?void 0:e.name,t.classList.remove("d-none"))},e.prototype.sortPlayersOnScore=function(){return this.players.sort((function(e,t){return t.score-e.score}))},e.prototype.showScoreBoard=function(){document.getElementById("btnRestart").classList.remove("d-none");var e=document.getElementById("scoreboard-container"),t=document.getElementById("scoreboard");e&&(e.classList.remove("d-none"),this.sortPlayersOnScore().forEach((function(e){var n=document.createElement("li");n.textContent=e.toString(),t.appendChild(n)})))},e.prototype.showQuestion=function(e){var t=this.questions[e],n=document.getElementById("question");n&&(n.textContent=t.question);var o=document.getElementById("answer-container");o.innerHTML="",t.answers.forEach((function(e){var t=document.createElement("label"),n=document.createElement("input");n.type="radio",n.name="answer",n.value=e.text,t.appendChild(n),t.appendChild(document.createTextNode(e.text)),o.appendChild(t),t.style.display="block",t.style.marginBottom="10px"}))},e}();window.addEventListener("load",(function(){var t,i,r,s,d,u,a,c,l,m,y,v=new o([],[],0),h=[],p=document.getElementById("welcome-container"),f=document.getElementById("question-container"),E=document.getElementById("players-container"),g=document.getElementById("quiz-container"),I=document.getElementById("scoreboard-container"),B=document.getElementById("question-api-container"),q=document.getElementById("current-player-container");null===(t=document.getElementById("aQuestions"))||void 0===t||t.addEventListener("click",(function(){v.questionMode===n.Custom?Q(f):Q(B)})),null===(i=document.getElementById("aPlayers"))||void 0===i||i.addEventListener("click",(function(){Q(E);var e=document.getElementById("btn-start-quiz"),t=document.getElementById("btn-add-player");v.players.length===v.numberOfPlayers?(e.classList.remove("d-none"),t.classList.add("d-none")):(e.classList.add("d-none"),t.classList.remove("d-none"))})),null===(r=document.getElementById("aQuiz"))||void 0===r||r.addEventListener("click",(function(){v.players.length===v.numberOfPlayers&&v.startQuiz(),k(),Q(g),Q(q)})),null===(s=document.getElementById("aScoreboard"))||void 0===s||s.addEventListener("click",(function(){Q(I)})),null===(d=document.getElementById("btn-start-quiz"))||void 0===d||d.addEventListener("click",(function(){v.players.length===v.numberOfPlayers&&v.startQuiz(),k(),Q(g),Q(q)})),null===(u=document.getElementById("btn-next"))||void 0===u||u.addEventListener("click",(function(){Q(E)})),null===(a=document.getElementById("txtNumberQuestions"))||void 0===a||a.addEventListener("change",(function(e){var t=e.target,n=parseInt(t.value);v.quizDuration=n,document.getElementById("btnStart").disabled=n<=0})),null===(c=document.getElementById("btnStart"))||void 0===c||c.addEventListener("click",(function(){var e=document.getElementById("lstNavigation");null==e||e.classList.remove("d-none"),v.questionMode===n.Custom?(Q(f),document.getElementById("no-questions").innerText="No questions have been added yet. Add ".concat(v.quizDuration*v.numberOfPlayers," questions to start.")):Q(B)})),null===(l=document.getElementById("btn-add-question"))||void 0===l||l.addEventListener("click",(function(){var t=document.getElementById("txt-question"),n=document.getElementById("btnCloseModal");if(z(t.value,h)){var o=new e(t.value);h.forEach((function(e){return o.addAnswer(e)})),v.addQuestion(o),L(),x(),t.value="",v.quizDuration===v.questions.length&&Q(E),n.click(),C()}else alert("Please fill in the question and provide at least one answer with the correct option.")})),null===(m=document.getElementById("btn-add-answer"))||void 0===m||m.addEventListener("click",(function(){var e=document.getElementById("txt-answer"),t=document.getElementById("chk-correct"),n={text:e.value,isCorrect:t.checked};h.push(n),b(),e.value="",t.checked=!1})),null===(y=document.getElementById("btn-add-player"))||void 0===y||y.addEventListener("click",(function(){var e=document.getElementById("player-name"),t=e.value.trim();return""===t?(alert("Player name is required"),void(e.value="")):v.players.some((function(e){return e.name.toLowerCase()===t.toLowerCase()}))?(alert("Player name must be unique"),void(e.value="")):(v.addPlayer(t),e.value="",void(v.players.length===v.numberOfPlayers&&(k(),Q(g),v.startQuiz())))}));var L=function(){var e=document.getElementById("no-questions"),t=document.getElementById("question-list");t.innerHTML="",v.questions.forEach((function(e){var n=document.createElement("li");n.textContent=e.toString(),t.appendChild(n)})),e.classList.add("d-none")},b=function(){var e=document.getElementById("answers-list"),t=document.getElementById("correct-answer-list");e.innerHTML="",t.innerHTML="",h.forEach((function(t){var n=document.createElement("li");n.textContent=t.text,e.appendChild(n)}));var n=h.find((function(e){return e.isCorrect}));if(n){var o=document.createElement("li");o.textContent=n.text,t.appendChild(o)}w(n)},x=function(){h.length=0,b()},C=function(){var e=document.getElementById("btn-add-q");v.questions.length===v.quizDuration*v.numberOfPlayers&&(e.disabled=!0)},w=function(e){document.getElementById("btn-add-question").disabled=!e},P=function(e){[q,p,f,E,g,I,B].forEach((function(e){null!==e&&e.classList.add("d-none")})),e.classList.remove("d-none")},Q=function(e){if(P(e),e===B||e===f){var t=document.getElementById("btn-add-q"),o=document.getElementById("btn-next");return v.questionMode===n.Custom?(o.classList.add("d-none"),void t.classList.remove("d-none")):(o.classList.remove("d-none"),void t.classList.add("d-none"))}e!==g||k()},z=function(e,t){return!0},k=function(){var e,t;document.getElementById("current-player-container").classList.remove("d-none"),document.getElementById("current-player-name").innerText=null!==(t=null===(e=v.players[v.currentPlayerIndex])||void 0===e?void 0:e.name)&&void 0!==t?t:""};P(p)}))})();

