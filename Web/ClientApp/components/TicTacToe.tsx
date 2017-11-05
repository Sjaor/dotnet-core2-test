import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import _ from 'lodash';

const SIZE = 4;

export class TicTacToe extends React.Component<RouteComponentProps<{}>> {

    public render() {
        return <Game />
    }
}

class Game extends React.Component<any, any> {
    constructor() {
        super();
        var board = [];
        for (var index = 0; index < SIZE; index++) {
            board.push(_.fill(Array(SIZE), ''));
        }

        this.state = {
            currentPlayer: 'X',
            history: [board],
            stepNumber: 0
        };

    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step: any, move: any) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        var status = '';
        var winner = this.whoIsTheWinner(current);
        if (winner) {
            status = winner + ' is the winner';
        }
        else {
            status = 'Next player: ' + this.state.currentPlayer;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current} onSelect={(x: number, y: number) => this.onSelect(x, y)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.reset()}>reset</button>
                </div>
            </div>
        );
    }
    onSelect(x: number, y: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = _.cloneDeep(history[history.length - 1]);

        if (current[x][y] != '' || this.whoIsTheWinner(current)) {
            return;
        }
        current[x][y] = this.state.currentPlayer;
        var nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';

        this.setState((prevState, props) => {
            return {
                currentPlayer: nextPlayer,
                history: history.concat([current]),
                stepNumber: history.length,
            };
        });
    }

    whoIsTheWinner(current: string[][]) {
        var r1 = [current[0][0], current[0][1], current[0][2]];
        if (r1[0] != '' && r1[0] === r1[1] && r1[1] === r1[2]) {
            return r1[0];
        }

        var r2 = [current[1][0], current[1][1], current[1][2]];
        if (r2[0] != '' && r2[0] === r2[1] && r2[1] === r2[2]) {
            return r2[0];
        }

        var r3 = [current[2][0], current[2][1], current[2][2]];
        if (r3[0] != '' && r3[0] === r3[1] && r3[1] === r3[2]) {
            return r3[0];
        }

        var d1 = [current[0][0], current[1][1], current[2][2]];
        if (d1[0] != '' && d1[0] === d1[1] && d1[1] === d1[2]) {
            return d1[0];
        }

        var d2 = [current[0][2], current[1][1], current[2][0]];
        if (d2[0] != '' && d2[0] === d2[1] && d2[1] === d2[2]) {
            return d2[0];
        }

        var c1 = [current[0][0], current[1][0], current[2][0]];
        if (c1[0] != '' && c1[0] === c1[1] && c1[1] === c1[2]) {
            return c1[0];
        }
        var c2 = [current[0][1], current[1][1], current[2][1]];
        if (c2[0] != '' && c2[0] === c2[1] && c2[1] === c2[2]) {
            return c2[0];
        }

        var c3 = [current[0][2], current[1][2], current[2][2]];
        if (c3[0] != '' && c3[0] === c3[1] && c3[1] === c3[2]) {
            return c3[0];
        }
    }


    jumpTo(move: any) {
        var player = (move % 2) === 0 ? 'X' : 'O';
        this.setState((prevState, props) => {
            return {
                currentPlayer: player,
                stepNumber: move,
            };
        });
    }

    reset() {
        this.setState((prevState, props) => {
            var board = [];
            for (var index = 0; index < SIZE; index++) {
                board.push(_.fill(Array(SIZE), ''));
            }
            return {
                currentPlayer: 'X',
                history: [board],
                stepNumber: 0,
            };
        });
    }

}

class Board extends React.Component<any, any> {
    renderSquare(x: number, y: number) {
        return <Square key={x + '' + y} marker={this.props.squares[x][y]} onSelect={() => this.props.onSelect(x, y)} />;
    }

    render() {
        var rowElements = [];
        for (var row = 0; row < SIZE; row++) {
            var columnElements = [];
            for (var column = 0; column < SIZE; column++) {
                columnElements.push(this.renderSquare(row, column));
            }
            rowElements.push(<div className="board-row" key={row}>{columnElements}</div>);
        }
        return (
            <div>
                <div className="status">{status}</div>
                {rowElements}
            </div>
        );
    }
}

interface SquareProps {
    marker: string;
    onSelect: () => void;
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onSelect}>
            {props.marker}
        </button>
    );
}


