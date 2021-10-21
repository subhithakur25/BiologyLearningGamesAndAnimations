import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route, Link } from 'react-router-dom'

// homepage
import App from './App'

// game components
import FirstGame from './game-1/game-1';
import SecondGame from './game-2/game-2';

const routing = (
    <HashRouter>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/first_game">First Game</Link>
                </li>
                <li>
                    <Link to="/second_game">Second Game</Link>
                </li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/first_game" component={FirstGame} />
            <Route path="/second_game" component={SecondGame} />
        </div>
    </HashRouter>
)

render(routing, document.getElementById('root'))

