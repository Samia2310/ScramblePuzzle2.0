import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import PuzzleBoard from './components/PuzzleBoard';
import Controls from './components/Controls';
import GameOverModal from './components/GameOverModal';
import StartPage from './components/StartPage';
import ImageSelectionModal from './components/ImageSelectionModal';
import { generateSolvablePuzzle, isSolved } from './utils/puzzleUtils';
import {
    updateHighScore as updateLocalHighScore,
    getBestScoreForImage as getLocalBestScoreForImage,
} from './utils/scoreUtils';
import './App.css';

function App() {
    const [level, setLevel] = useState(4);
    const [currentImage, setCurrentImage] = useState(0);
    const [puzzle, setPuzzle] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [hasPlayedVictorySound, setHasPlayedVictorySound] = useState(false);
    const [currentPage, setCurrentPage] = useState('startPage');
    const [isImageSelectionModalOpen, setIsImageSelectionModalOpen] = useState(false);

    const images = useMemo(() => [
        '/images/morning_sunflower.jpg', '/images/garden_whisper.jpg',
        '/images/country_road.jpg', '/images/acoustic_rhapsody.jpg',
        '/images/sunset_sips_&_snacks.jpg', '/images/whimsy_popaye.jpg',
        '/images/lilac_scoop.jpg', '/images/retro_ride.jpg',
        '/images/sugarplum_brew.jpg', '/images/frienemies_forever.jpg',
        '/images/playful_world.jpg', '/images/road_to_success.jpg',
        '/images/bloom_&_capture.jpg', '/images/paper_pilot.jpg',
        '/images/morning_flavors.jpg', '/images/happy_haul.jpg',
        '/images/toasted_morning.jpg', '/images/floral_timepiece.jpg',
        '/images/crispy_fizz_craving.jpg', '/images/mystic_melodies.jpg',
        '/images/pink_parcel_express.jpg', '/images/latte_canvas.jpg',
        '/images/adorable_jerry.jpg', '/images/old-school_call.jpg',
        '/images/FRIENDS.jpg', '/images/autumn_serenity.jpg',
        '/images/scooby_adventure.jpg', '/images/miniature_monsoon.jpg',
        '/images/daisy_time_ride.jpg', '/images/tranquil_voyage.jpg',
        '/images/emergency_escape.jpg', '/images/whispercore.jpg',
        '/images/paper_sky_&_beyond.jpg', '/images/mathematics_melodies.jpg',
        '/images/crimson_clouds.jpg', '/images/wanderLens.jpg',
        '/images/sunny_side_ride.jpg', '/images/sweet_slice.jpg',
        '/images/chromatic_cassette.jpg', '/images/capture_moments.jpg',
        '/images/crafty_kit.jpg', '/images/creative_corner.jpg',
        '/images/bean_&_teddy.jpg', '/images/countryside_cafe.jpg',
        '/images/spring_toast.jpg', '/images/storybook_sanctuary.jpg',
        '/images/roadside_tastes.jpg', '/images/painted_panorama.jpg',
        '/images/mystical_moonlight.jpg', '/images/gifting_happiness.jpg'
    ], []);

    const slideAudioRef = useRef(null);
    const levelSolvedAudioRef = useRef(null);
    const startPageClickAudioRef = useRef(null);
    const buttonClickAudioRef = useRef(null);

    const formatImageName = useCallback((imagePath) => {
        const filename = imagePath.split('/').pop();
        const nameWithoutExtension = filename.split('.')[0];
        const withSpaces = nameWithoutExtension.replace(/_/g, ' ');
        return withSpaces
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }, []);

    useEffect(() => {
        slideAudioRef.current = new Audio('/audios/puzzleSlide.wav');
        slideAudioRef.current.volume = 1.0;
        levelSolvedAudioRef.current = new Audio('/audios/victory.wav');
        levelSolvedAudioRef.current.volume = 0.5;
        levelSolvedAudioRef.current.playbackRate = 1.2;
        startPageClickAudioRef.current = new Audio('/audios/startPageClick.wav');
        startPageClickAudioRef.current.volume = 1.0;
        buttonClickAudioRef.current = new Audio('/audios/click.wav');
        buttonClickAudioRef.current.volume = 1.0;
    }, []);

    const startNewGame = useCallback(() => {
        const newPuzzle = generateSolvablePuzzle(level);
        setPuzzle(newPuzzle);
        setMoves(0);
        setGameOver(false);
        setIsNewHighScore(false);
        setHasPlayedVictorySound(false);
    }, [level]);

    const handleStartPageButtonClick = useCallback(() => {
        if (startPageClickAudioRef.current) {
            startPageClickAudioRef.current.currentTime = 0;
            startPageClickAudioRef.current.play().catch(e =>
                console.error("Start page click sound error:", e)
            );
        }
    }, []);

    const handleButtonClick = useCallback(() => {
        if (buttonClickAudioRef.current) {
            buttonClickAudioRef.current.currentTime = 0;
            buttonClickAudioRef.current.play().catch(e =>
                console.error("Button click sound error:", e)
            );
        }
    }, []);

    const handleSelectLevel = useCallback((selectedLevel) => {
        handleStartPageButtonClick();
        setLevel(selectedLevel);
        setCurrentImage(Math.floor(Math.random() * images.length));
        setCurrentPage('gamePage');
    }, [images.length, handleStartPageButtonClick]);

    const handleImageSelected = useCallback((index) => {
        handleButtonClick();
        setCurrentImage(index);
        setIsImageSelectionModalOpen(false);
        setGameOver(false);
        setMoves(0);
        setIsNewHighScore(false);
        setHasPlayedVictorySound(false);
    }, [handleButtonClick]);

    const checkAndSubmitHighScore = useCallback(() => {
        const levelKey =
            level === 2 ? 'veryEasy' :
            level === 3 ? 'easy' :
            level === 4 ? 'medium' : 'hard';

        const rawImageName = images[currentImage].split('/').pop();
        const newScoreSet = updateLocalHighScore(levelKey, rawImageName, moves);

        setIsNewHighScore(newScoreSet);
    }, [moves, level, currentImage, images]);

    useEffect(() => {
        if (currentPage === 'gamePage') {
            startNewGame();
        }
    }, [level, currentImage, currentPage, startNewGame]);

    useEffect(() => {
        if (puzzle.length > 0 && isSolved(puzzle, level)) {
            if (!hasPlayedVictorySound) {
                setHasPlayedVictorySound(true);
                if (levelSolvedAudioRef.current) {
                    levelSolvedAudioRef.current.currentTime = 0;
                    levelSolvedAudioRef.current.play().catch(e =>
                        console.error("Victory sound error:", e)
                    );
                    setTimeout(() => {
                        levelSolvedAudioRef.current.pause();
                        levelSolvedAudioRef.current.currentTime = 0;
                    }, 8000);
                }
                setTimeout(() => {
                    setGameOver(true);
                    checkAndSubmitHighScore();
                }, 2000);
            }
        }
    }, [puzzle, level, checkAndSubmitHighScore, hasPlayedVictorySound]);

    const handleTileClick = (index) => {
        if (gameOver) return;
        const emptyIndex = puzzle.indexOf(level * level - 1);
        const row = Math.floor(index / level);
        const col = index % level;
        const emptyRow = Math.floor(emptyIndex / level);
        const emptyCol = emptyIndex % level;
        const canMove =
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow);

        if (canMove) {
            const newPuzzle = [...puzzle];
            [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
            setPuzzle(newPuzzle);
            setMoves(m => m + 1);
            if (slideAudioRef.current) {
                slideAudioRef.current.currentTime = 0;
                slideAudioRef.current.play().catch(err =>
                    console.warn("Slide sound error:", err)
                );
            }
        }
    };

    const handleNextLevel = () => {
        handleButtonClick();
        if (currentImage < images.length - 1) {
            setCurrentImage(prev => prev + 1);
            startNewGame();
        } else {
            alert("You've completed all images! Returning to home.");
            handleExitToHome();
        }
    };

    const handleShuffle = () => {
        handleButtonClick();
        startNewGame();
    };

    const handleExitToHome = () => {
        handleButtonClick();
        setGameOver(false);
        setCurrentPage('startPage');
        setPuzzle([]);
        setMoves(0);
        setIsNewHighScore(false);
        setHasPlayedVictorySound(false);
    };

    const levelKey =
        level === 2 ? 'veryEasy' :
        level === 3 ? 'easy' :
        level === 4 ? 'medium' : 'hard';

    const rawImageName = images[currentImage].split('/').pop();
    const bestScore = getLocalBestScoreForImage(levelKey, rawImageName);

    return (
        <>
            {currentPage === 'startPage' && (
                <StartPage onSelectLevel={handleSelectLevel} />
            )}
            {currentPage === 'gamePage' && (
                <div className="game-page-layout">
                    <div className="game-controls-and-highscores-top-right">
                        <Controls moves={moves} />
                    </div>
                    {bestScore > 0 && (
                        <div className="best-score-display">
                            🏆 Best Score for this level: {bestScore}
                        </div>
                    )}
                    <div className="puzzle-board-center">
                        <PuzzleBoard
                            puzzle={puzzle}
                            level={level}
                            image={images[currentImage]}
                            onTileClick={handleTileClick}
                        />
                    </div>
                    <div className="puzzle-action-buttons">
                        <button onClick={handleNextLevel} className="next-image-button">
                            Next Image →
                        </button>
                        <button onClick={handleShuffle} className="shuffle-button">
                            Shuffle
                        </button>
                        <button onClick={handleExitToHome} className="go-to-homepage-button">
                            Go to Homepage
                        </button>
                    </div>
                    <div className="current-image-preview-bottom-left">
                        <img
                            src={images[currentImage]}
                            alt={`Current Puzzle Reference: ${formatImageName(images[currentImage])}`}
                        />
                        <p>{formatImageName(images[currentImage])}</p>
                        <button
                            onClick={() => {
                                handleButtonClick();
                                setIsImageSelectionModalOpen(true);
                            }}
                            className="choose-image-button"
                        >
                            Choose Image
                        </button>
                    </div>

                    {gameOver && (
                        <GameOverModal
                            image={images[currentImage]}
                            moves={moves}
                            isNewHighScore={isNewHighScore}
                            onPlayAgain={startNewGame}
                            onNextLevel={handleNextLevel}
                            onExitToHome={handleExitToHome}
                            bestScore={bestScore}
                            onButtonClick={handleButtonClick}
                        />
                    )}

                    {isImageSelectionModalOpen && (
                        <ImageSelectionModal
                            images={images}
                            onClose={() => {
                                handleButtonClick();
                                setIsImageSelectionModalOpen(false);
                            }}
                            onSelectImage={handleImageSelected}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default App;
