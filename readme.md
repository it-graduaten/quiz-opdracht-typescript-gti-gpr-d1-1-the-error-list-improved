[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QzE4UYQv)
# Happy Coding Quiz App

This is a simple quiz application designed for happy coding and learning purposes. The app allows users to create custom questions, fetch questions from an API, manage players, and conduct quizzes in both single-player and multiplayer modes. The app is built using HTML, CSS, and JavaScript, and it is designed to be simple, user-friendly, and easy to customize. The app is responsive and can be used on any device. Enjoy coding and learning!

## Features

- **Game Modes**: Choose between Single Player and Multiplayer modes.
- **Question Modes**: Select between Free Input for custom questions or API mode for fetching questions from an external API.
- **Number of Players**: Set the number of players for multiplayer mode.
- **API Configuration**: Configure the API to fetch questions based on difficulty and category.
- **Add Questions**: Add custom questions with multiple answers, and designate the correct answer.
- **Player Management**: Add and manage players for multiplayer mode.
- **Quiz Navigation**: Navigate through different sections of the quiz (Questions, Players, Quiz, Scoreboard).
- **Quiz Restart**: Restart the quiz game at any time.

## How to Use

1. **Welcome Screen**:
   - Configure the game mode (Single Player or Multiplayer) and the number of players.
   - Choose between Free Input (custom questions) or API mode.
   - Enter the number of questions per player.

2. **Questions**:
   - Add custom questions and answers using the "Add Question" button.
   - Use the "Next" button to move to the next screen.

3. **API Configuration**:
   - If using the API mode, configure difficulty and category, and click "Fetch Questions."

4. **Players**:
   - Add players by entering their names and clicking "Add Player."
   - Start the quiz when all players are added.

5. **Quiz**:
   - Answer questions and submit your response.
   - Multiplayer mode will switch to the next player after each question.

6. **Scoreboard**:
   - View the scoreboard to see the players' scores.

## Additional Information

- **Restart Game Button**:
   - Use the "Restart Game" button to restart the quiz at any time.
  
- **Alerts**:
   - An alert will be displayed if you try to navigate while the quiz is running.

## Dependencies

- Bootstrap 5.3.3: [Bootstrap](https://getbootstrap.com/)
- Quiz App Script: [script.js](../static/bundle/script.js)

## Getting Started

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to build the project.
4. Open the HTML file in a web browser.
5. Configure the game settings and start enjoying the quiz.

## Authors

- Mitch Van Vlierberghe

Feel free to customize and extend the code to fit your specific needs. Happy coding!
