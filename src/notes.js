import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as yup from 'yup';

const useState = React.useState;

// Base element
const Square = props => {
    /* props.value is what is displayed in each square.
       It is initially null, and then X when clicked.
       It is passed to us in props. value is defined in Board, which in turn
       had it passed to it by Game.*/
    return (
        // A square is a button, that displays a value that is passed to it.
        <button
            className="square"
            // onClick is defined in Game as handleClick. It is passed here by Board.
            onClick={props.onClick}
        >

            {props.value}
        </button>
    );
};

// Board is a series of squares. Possibly it could be removed when there is only 1 square.
const Board = props => {
    const renderSquare = i => {
        return (
            <Square
                // contents is defined in Game.
                value={props.contents}
                // onClick is defined in Game.
                onClick={() => props.onClick(i)}
            />
        );
    };

    /* More squares would be placed here */
    return (
        <div>
            <div className="board-row">

                {renderSquare(0)}
            </div>
        </div>
    );
};

// Game controls all state, and passes props to all children.
const Game = props => {
    // square starts off empty.
    const initialSquare = null;
    // defining useState hook for square. When setSquare is used, it triggers
    // a re-render of the DOM.
    const [square, setSquare] = useState(initialSquare);

    // When a square is clicked, it sets it to X with setSquare hook, thus triggering
    // a DOM refresh.
    const handleClick = i => {
        const newSquare = 'X';
        setSquare(newSquare);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    // Passes contents of square to Board.
                    // In board, square can be accessed with props.contents.
                    contents={square}
                    // Also passes the handleClick function to Board.
                    // can be accessed with props.onClick.
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{square}</div>
                <ol>{square}</ol>
            </div>
        </div>
    );
};

// ========================================

ReactDOM.render(
    // Any element can be placed here instead of, or in addition to, Game.
    <Game />,
    document.getElementById('root')
);