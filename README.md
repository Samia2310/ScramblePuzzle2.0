<div align="center">

![Scramble Puzzle](https://readme-typing-svg.demolab.com?font=Raleway&weight=900&size=80&duration=1&pause=999999&color=FF8C00&center=true&vCenter=true&width=1200&height=120&lines=++SCRAMBLE+++++PUZZLE)

A modern, feature-rich sliding tile puzzle game built with React that combines intelligent algorithms with an engaging user interface!

<img width="700" height="600" alt="banner" src="https://github.com/user-attachments/assets/187e61bd-2914-4852-9a86-d0e467a93164" />

</div>

## 🎮 Live Demo

[Play Scramble Puzzle](https://scramble-puzzle2-0.vercel.app/) <!-- Add your deployed link -->

## 📖 About The Project

Scramble Puzzle is a React-based sliding tile game that brings the classic puzzle experience to modern web browsers. The game features intelligent puzzle generation ensuring every configuration is solvable, multiple difficulty levels, image selection, and persistent high score tracking.

**Warning: Highly addictive - one puzzle is never enough!** 🎮

### ✨ Key Features

- **4 Difficulty Levels**: Progressive challenges from 2x2 to 5x5 grids
  - Very Easy (2x2) - Perfect for beginners
  - Easy (3x3) - Classic puzzle size
  - Medium (4x4) - Getting challenging
  - Hard (5x5) - Expert level

- **Smart Puzzle Generation**: 
  - Fisher-Yates shuffle algorithm for randomization
  - Inversion count method ensures every puzzle is mathematically solvable
  - Different solvability rules for odd and even grid sizes

- **Multiple Puzzle Images**: Choose from various images through an elegant selection modal

- **High Score Tracking**: 
  - Persistent localStorage system
  - Tracks best scores for each difficulty level and image
  - Celebrates new personal records

- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices

- **Smooth Animations**: CSS3 animations for tile movements and UI transitions

- **Victory Modal**: Celebrates wins with move counts and high score achievements

## 🚀 Built With

- **React.js** - Frontend framework
- **CSS** - Styling and animations
- **JavaScript (ES6+)** - Core logic
- **localStorage API** - Persistent data storage

## 🎯 How It Works

### Puzzle Solvability Algorithm

Not every random arrangement of tiles can be solved! The game implements a sophisticated solvability check:

**For Odd-Sized Grids (3x3, 5x5):**
- Puzzle is solvable if the number of inversions is even

**For Even-Sized Grids (2x2, 4x4):**
- If blank tile is on an even row from bottom → inversions must be odd
- If blank tile is on an odd row from bottom → inversions must be even

**Inversion Count:**
An inversion occurs when a tile with a higher number appears before a tile with a lower number in the array (excluding the blank tile).

### Game Logic

1. **Initialization**: Generate a solvable puzzle using Fisher-Yates shuffle
2. **Tile Movement**: Only tiles adjacent to the empty space can be moved
3. **Win Condition**: All tiles must be in ascending order (0, 1, 2, ..., N²-1)
4. **Score Tracking**: Minimum moves are saved per difficulty and image

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/Samia2310/scramble-puzzle.git
cd scramble-puzzle
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Play

1. **Select Difficulty**: Choose from Very Easy, Easy, Medium, or Hard
2. **Pick an Image**: Select your preferred puzzle image from the modal
3. **Solve the Puzzle**: Click on tiles adjacent to the empty space to slide them
4. **Track Your Progress**: Monitor your move count and try to beat your best score
5. **Celebrate Victory**: Complete the puzzle to see your stats and high scores!

## 📁 Project Structure
```
scramble-puzzle/
├── public/
│   ├── images/        # Puzzle images
│   ├── audios         # Puzzle audios 
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Controls.js           # Move counter display
│   │   ├── GameOverModal.js      # Victory modal
│   │   ├── HighScores.js         # High scores display
│   │   ├── ImageSelectionModal.js # Image picker
│   │   ├── PuzzleBoard.js        # Main game board
│   │   └── StartPage.js          # Landing page
│   ├── utils/
│   │   ├── puzzleUtils.js        # Puzzle generation & solvability
│   │   └── scoreUtils.js         # Score management
│   ├── App.js                    # Main app component
│   ├── App.css                   # Global styles
│   └── index.js                  # Entry point
├── package.json
└── README.md
```

## 🧠 Core Algorithms

### Fisher-Yates Shuffle
```javascript
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
```

### Inversion Count
```javascript
function countInversions(puzzle) {
    let inversions = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (puzzle[i] > puzzle[j]) {
                inversions++;
            }
        }
    }
    return inversions;
}
```

## 🎨 Screenshots

<!-- Add your screenshots here -->
### Start Page
<div align="center">
<img width="300" height="540" alt="Screenshot 2026-02-09 213106" src="https://github.com/user-attachments/assets/243b598d-31db-4af1-8803-f8f817a106a6" />
</div>

### Game Board
<div align="center">
<img width="600" height="700" alt="Screenshot 2026-02-09 213211" src="https://github.com/user-attachments/assets/70d1b6c1-a52d-43a1-9271-f70d5ae901f3" />
</div>

### Victory Modal
<div align="center">
<img width="400" height="750" alt="Screenshot 2026-02-09 213423" src="https://github.com/user-attachments/assets/a4c8cd36-f91f-43cb-b9c9-085d9e268746" />
</div>

### Image Selection
<div align="center">
<img width="600" height="750" alt="Screenshot 2026-02-09 213323" src="https://github.com/user-attachments/assets/14d8ca8a-7e78-4cc1-8844-e96ba121e35b" />
</div>

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Samia Tabassum Chowdhury**
- Senior Executive, Event Management
- BRAC University Computer Club
- GitHub: [Samia2310](https://github.com/Samia2310)
- LinkedIn: [Samia Tabassum Chowdhury](https://www.linkedin.com/in/samia-tabassum-chowdhury-191229348)

## 🙏 Acknowledgments

- Inspired by the classic 15-puzzle game
- Solvability algorithm based on mathematical principles of permutation parity
- Thanks to the React community for excellent documentation

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- Email: chowdhurysamiatabassum@gmail.com
- LinkedIn: [Samia Tabassum Chowdhury](https://www.linkedin.com/in/samia-tabassum-chowdhury-191229348)

---

⭐ If you found this project helpful or interesting, please consider giving it a star!

**Can you solve the puzzle in under 50 moves, or will you keep scrambling?** 🧩
