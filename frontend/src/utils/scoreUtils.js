// src/utils/scoreUtils.js

const HIGH_SCORES_KEY = 'slidePuzzleHighScores';

function initializeDefaultHighScores() {
    return {
        veryEasy: {},
        easy: {},
        medium: {},
        hard: {}
    };
}

export const sanitizeImageNameForStorage = (imageName) =>
    imageName.replace(/\./g, '_').replace(/\//g, '_');

export function getHighScores() {
    try {
        const scores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY));
        if (scores) {
            const defaultScores = initializeDefaultHighScores();
            for (const level in defaultScores) {
                if (!scores[level]) {
                    scores[level] = {};
                }
            }
            return scores;
        }
    } catch (e) {
        console.error("Error parsing high scores from Local Storage, initializing new.", e);
    }
    return initializeDefaultHighScores();
}

function saveHighScores(scores) {
    try {
        localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    } catch (e) {
        console.error("Error saving high scores to Local Storage.", e);
    }
}

export function updateHighScore(level, imageName, moves) {
    const scores = getHighScores();
    const sanitizedImageName = sanitizeImageNameForStorage(imageName);

    if (!scores[level]) {
        scores[level] = {};
    }

    const currentScore = scores[level][sanitizedImageName] || Infinity;

    if (moves > 0 && moves < currentScore) {
        scores[level][sanitizedImageName] = moves;
        saveHighScores(scores);
        return true;
    }
    return false;
}

export function getBestScoreForImage(level, imageName) {
    const scores = getHighScores();
    const sanitizedImageName = sanitizeImageNameForStorage(imageName);
    return scores[level]?.[sanitizedImageName];
}