import React, { useState } from "react";

const generateBoard = (size) => {
    let newBoard = [];

    for (let i = 0; i < size; i++) {
        newBoard.push(Array.from({ length: size }, undefined));
    }

    return newBoard;
};

const checkRows = (board) => {
    for (let i = 0; i < board.length; i++) {
        let set = new Set(board[i]);

        if (set.size === 1 && !set.has(undefined)) {
            return true;
        }
    }

    return false;
};

const rowsToColumns = (board) => {
    let newBoard = [];
    let column = 0;

    while (column < board.length) {
        let newRow = [];

        for (let row = 0; row < board.length; row++) {
            newRow.push(board[row][column]);
        }

        newBoard.push(newRow);
        column++;
    }

    return newBoard;
};

const diagonalToRows = (board) => {
    let newBoard = [[], []];

    let increment = 0;
    let decrement = board.length - 1;

    while (increment < board.length) {
        newBoard[0].push(board[increment][increment]);
        newBoard[1].push(board[increment][decrement]);

        increment++;
        decrement--;
    }

    return newBoard;
};

const checkWin = (board) => {
    // Horizontal Check
    if (checkRows(board)) {
        return true;
    }

    // Vertical Check
    if (checkRows(rowsToColumns(board))) {
        return true;
    }

    // Diagonal Check
    if (checkRows(diagonalToRows(board))) {
        return true;
    }

    return false;
};

const TicTacToe = () => {
    let boardSize = 3;
    const [board, setBoard] = useState(generateBoard(boardSize));
    const [player, setPlayer] = useState("X");
    const [winner, setWinner] = useState("");

    const clickHandle = (row, column) => {
        board[row][column] = player;
        setBoard([...board]);

        if (checkWin(board)) {
            setWinner(`Player ${player} Wins!!!!`);
        } else {
            setPlayer(player === "X" ? "O" : "X");
        }
    };

    const clearHandler = () => {
        setPlayer("X");
        setWinner("");
        setBoard(generateBoard(boardSize));
    };

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <div>
                {board.map((row, r) => {
                    return (
                        <div key={r} style={{ display: "flex" }}>
                            {row.map((cell, c) => {
                                return (
                                    <div
                                        key={c}
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            fontSize: "30px",
                                            border: "1px solid black",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => clickHandle(r, c)}
                                    >
                                        {cell}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div style={{ height: "60px" }}>
                <h2>{winner}</h2>
            </div>
            <button
                onClick={clearHandler}
                style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "80px",
                    fontSize: "15px",
                }}
            >
                Clear
            </button>
        </>
    );
};

export default TicTacToe;
