import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Game} from './roshambo';  // Import any const/class from any file, so long as it is export const.

// ======================================== //

ReactDOM.render(
    // Any element can be placed here instead of, or in addition to, Game.
    <Game/>,
    document.getElementById('root')
);
// ======================================== //