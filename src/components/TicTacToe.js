import React, { useState } from 'react';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setXTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningSquares, setWinningSquares] = useState([]);

    const renderSquare = (index) => {
        const highlight = winningSquares.includes(index) ? 'highlight' : '';
        return (
            <button 
                className={`square ${highlight}`} 
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </button>
        );
    };

    const handleClick = (index) => {
        if (board[index] != null || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);
        setXTurn(!isXTurn);

        const winnerCombination = checkWinner(newBoard);
        if (winnerCombination) {
            setWinner(newBoard[winnerCombination[0]]);
            setWinningSquares(winnerCombination);
        } else if (newBoard.every(cell => cell != null)) {
            setWinner('Tie');
        }
    };

    const checkWinner = (newBoard) => {
        const combination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < combination.length; i++) {
            const [a, b, c] = combination[i];
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return combination[i];
            }
        }
        return null;
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setWinningSquares([]);
        setXTurn(true);
    };

    return (
        <div className="tic-tac-toe-container">
            <h1>Tic Tac Toe</h1>

            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            {!winner && (
    <div className="turn">
        Next Player: <span>{isXTurn ? 'X' : 'O'}</span>
    </div>
)}

            <div className="message">
    {winner && (
        <div className="winner">
            {winner === 'Tie' ? 'Match is a Tie! 🤝' : `${winner} Wins! 🎉`}
        </div>
    )}
</div>

            <button className="reset-butn" onClick={handleReset}>Reset Game</button>
        </div>
    );
}

export default TicTacToe;