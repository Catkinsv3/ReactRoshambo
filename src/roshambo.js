import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';
import './css/index.css';
import UIfx from 'uifx';
// import beepFile from './audio/beep-07.mp3';
import beepWinFile from './audio/Mini Flagon Draw.mp3';
import beepLossFile from './audio/Mini Flagon Deny.mp3';
import beepDrawFile from './audio/Mini Flagon Win.mp3';
// import test from './audio/UI_MENU_main.wav';

const beepWin = new UIfx(
    beepWinFile,
    {
        volume: 1.0,
        throttleMs: 0
    }
);

const beepLoss = new UIfx(
    beepLossFile,
    {
        volume: 1.0,
        throttleMs: 0
    }
);

const beepDraw = new UIfx(
    beepDrawFile,
    {
        volume: 1.0,
        throttleMs: 0
    }
);

// const beep = new UIfx(beepFile);

// import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as yup from 'yup';

// investigate top npm packages:
// https://gist.github.com/anvaka/8e8fa57c7ee1350e3491?fbclid=IwAR0k_cs2ntn_gkEjYWiXB8qPnyFTLOxwjZB2Zq1ma25hfVWt_NDdYMgM0go

// after above, use styled components to style everything.
// then login screen and score tracking with formik/yup/amplify
// then lodash, then stripe api.

// const Grid = styled.div`
//   display: grid;
//   grid-template-areas: ". . . . ."
//                        ". p i a ."
//                        ". . . . .";
//   grid-template-rows: auto 50vh auto;
//   grid-template-columns: 5vw repeat(3, 30vw) 5vw;
// `;


const fadeGreen2 = keyframes`
  from {
    color: #5fff58;
  }
  to {
    color: #fff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-areas:
  "round"
  "score"
  "moves"
  "options";
  grid-template-rows: repeat(4, auto);
  grid-template-columns: minmax(400px, 600px);
  grid-gap: 2vh;
`;

const StyledContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    padding: 15px 15px;
    //border: solid 1px #675857;
    grid-area: ${props => (props.gridArea)};
    grid-auto-flow: column;
`;

const Container = ({classname, ...props}) => {
    return (
        <StyledContainer classname={classname}
                         {...props}/>
    )
};

const StyledText = styled.p`
  padding: 0;
  margin: 0;
  text-align: center;
  min-width: 70px;
  //color: ${props => (props.color)};
  //transition: color 500ms ease-out;
  //animation: 1s linear;
  // animation: ${props => (props.animation)} 1.5s linear;
  //filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));
`;

const Text = ({...props}) => {
    return (
        <StyledText
            {...props}/>
    )
};

const StyledButton = styled.button`
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: #EA3B7B;
  border-radius: 100px;
  background-color: #EA3B7B;
  color: #fff;
  width: 70px;
  height: 70px;
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(234,59,123,0.1));
  box-shadow: 0 0 10px #EA3B7B;
  transition: 500ms background-color, 500ms border-color, 500ms filter;
  
  &:hover {
    background-color: #121f2e;
    border-color: #4bb2e7;
    filter: drop-shadow(0 0 10px rgba(75, 178, 231, 0.3));
    transition: 500ms background-color, 500ms border-color, 500ms filter;
  }
`;

const Button = ({onClick, classname, text, ...props}) => {
    return (
        <StyledButton onClick={onClick}
                      classname={classname}
                      {...props}>
            {text}
        </StyledButton>
    )
};

const StyledMove = styled.p`
  color: #fff;
  font-size: 12rem;
  padding: 20px;
  margin: 0;
  //border: solid 1px #675857;
`;

const Move = ({onClick, classname, text, ...props}) => {
    return (
        <StyledMove onClick={onClick}
                    classname={classname}
                    {...props}>
            {text}
        </StyledMove>
    )
};

// const Alert = (play) => {
//     // const myRef = React.createRef();
//     if (play) {
//         return (
//             <audio src={test} controls autoPlay={true}/>
//         )
//     }
// };

export const Game = props => {
    const initialRound = 1;
    const [round, setRound] = useState(initialRound);
    const initialPlayerMove = null;
    const [playerMove, setPlayerMove] = useState(initialPlayerMove);
    const initialAiMove = null;
    const [aiMove, setAiMove] = useState(initialAiMove);
    const initialWinner = null;
    const [winner, setWinner] = useState(initialWinner);
    const initialWins = 0;
    const [wins, setWins] = useState(initialWins);
    const initialLosses = 0;
    const [losses, setLosses] = useState(initialLosses);
    const initialDraws = 0;
    const [draws, setDraws] = useState(initialDraws);
    const initialWinFlash = false;
    const [winFlash, setWinFlash] = useState(initialWinFlash);
    const initialLossFlash = false;
    const [lossFlash, setLossFlash] = useState(initialLossFlash);
    const initialDrawFlash = false;
    const [drawFlash, setDrawFlash] = useState(initialDrawFlash);
    //useReducer to replace useState

    // useEffect runs any specified function before and after render.
    // In this case it updates the tab title with the scores.
    // It only runs the effect if any of the specified input variables have changed
    // since it last ran. They are in the square brackets at the end.
    useEffect(() => {
        document.title = `Wins: ${wins} \u00A0\u00A0 Losses: ${losses}`;
    }, [wins, losses, draws]);

    // useEffect(() => {
    //     const timer = setTimeout(() => setWinFlash(false), 1000);
    //     return () => clearTimeout(timer);
    // }, [wins]);

    // useEffect(() => {
    //     const timer = setTimeout(() => setLossFlash(false), 1000);
    //     return () => clearTimeout(timer);
    // }, [losses]);
    //
    // useEffect(() => {
    //     const timer = setTimeout(() => setDrawFlash(false), 1000);
    //     return () => clearTimeout(timer);
    // }, [draws]);

    const handleMouseDown = newPlayerMove => {
        const newRound = round + 1;
        setRound(newRound);

        setPlayerMove(newPlayerMove);

        const newAiMove = AiMove();
        setAiMove(newAiMove);

        const newWinner = calculateWinner(newPlayerMove, newAiMove);
        if (newWinner === "player") {
            beepWin.play();
            setWins(wins + 1);
            setWinFlash(true);
        } else if (newWinner === "computer") {
            beepLoss.play();
            setLosses(losses + 1);
            setLossFlash(true);
        } else if (newWinner === "draw") {
            beepDraw.play();
            setDraws(draws + 1);
            setDrawFlash(true);
        } else {
            console.error(newWinner);
        }
        setWinner(newWinner);
    };

    const handleMouseUp = () => {
        setWinFlash(false);
        setLossFlash(false);
        setDrawFlash(false);
    };

    return (
        <Grid>
            <Container className="round" gridArea={"round"}>
                <Text color={"#EA3B7B"}>ROUND<br/><br/>
                    <span style={{fontSize: 5 + 'rem'}}>{round}</span>
                </Text>
            </Container>
            <Container className="stats" gridArea={"score"}>
                {/*<div>{playerMove} vs {aiMove}</div>*/}
                {/*<div>Winner: {winner}</div>*/}
                {/*<Text animation={(winFlash) ? fadeGreen : null}>Wins<br/><br/>*/}
                {/*    <span style={{fontSize: 5 + 'rem'}}>{wins}</span>*/}
                {/*</Text>*/}
                <Text className={winFlash ? "green" : "initial"}>WINS<br/><br/>
                    <span style={{fontSize: 5 + 'rem'}}>{wins}</span>
                </Text>
                <Text className={drawFlash ? "yellow" : "initial"}>DRAWS<br/><br/>
                    <span style={{fontSize: 5 + 'rem'}}>{draws}</span>
                </Text>
                <Text className={lossFlash ? "red" : "initial"}>LOSSES<br/><br/>
                    <span style={{fontSize: 5 + 'rem'}}>{losses}</span>
                </Text>
            </Container>
            <Container className="moves" gridArea={"moves"}>
                <Move classname={"playerMove"} text={playerMove ? mapMoveToSymbol(playerMove) : "\u00A0"}/>
                <Move classname={"aiMove"} text={aiMove ? mapMoveToSymbol(aiMove) : "\u00A0"}/>
            </Container>
            <Container className="options" gridArea={"options"}>
                {/*<img src={}/> player move img*/}
                <Button text={"\u270a"}
                        onMouseDown={() => handleMouseDown("rock")}
                        onMouseUp={() => handleMouseUp()}/>
                <Button text={"\u270b"}
                        onMouseDown={() => handleMouseDown("paper")}
                        onMouseUp={() => handleMouseUp()}/>
                <Button text={"\u270c"}
                        onMouseDown={() => handleMouseDown("scissors")}
                        onMouseUp={() => handleMouseUp()}/>
            </Container>
            {/*<Alert/>*/}
        </Grid>
    );
};


// ======================================== //
ReactDOM.render(
    // Any element can be placed here instead of, or in addition to, Game.
    <Game/>,
    document.getElementById('root')
);

// ======================================== //

/**
 * Generate random AI move.
 *
 * @return {string} move
 */
function AiMove() {
    // Picks random number between 0 and 2.
    const max = 3;
    let x = Math.floor(Math.random() * Math.floor(max));
    switch (x) {
        case 0:
            console.log("AI went rock");
            return "rock";
        case 1:
            console.log("AI went paper");
            return "paper";
        case 2:
            console.log("AI went scissors");
            return "scissors";
        default:
            console.error("error making AI move");
            return "error";
    }
}

/**
 * Determine winner given two moves to compare.
 *
 * @param firstMove: player move
 * @param secondMove: ai move
 * @returns {string}: who won, else draw
 */
function calculateWinner(firstMove, secondMove) {
    if (firstMove === "scissors") {
        if (secondMove === "scissors") {
            return "draw";
        } else if (secondMove === "paper") {
            return "player";
        } else if (secondMove === "rock") {
            return "computer";
        }
    } else if (firstMove === "paper") {
        if (secondMove === "scissors") {
            return "computer";
        } else if (secondMove === "paper") {
            return "draw";
        } else if (secondMove === "rock") {
            return "player";
        }
    } else if (firstMove === "rock") {
        if (secondMove === "scissors") {
            return "player";
        } else if (secondMove === "paper") {
            return "computer";
        } else if (secondMove === "rock") {
            return "draw";
        }
    } else {
        return "error calculating winner";
    }
}

function mapMoveToSymbol(move) {
    if (move === "rock") {
        return "\u270a";
    } else if (move === "paper") {
        return "\u270b";
    } else if (move === "scissors") {
        return "\u270c";
    } else {
        return move;
    }
}