// import react modules
import React from 'react';
import ReactDOM from 'react-dom';
// import the css
import './index.css';

// component for each square
class Square extends React.Component {
  render() {
    return (
      // on* names for attributes
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// component to create the board and player turns
class Board extends React.Component {
  // add constructor to class to initialize state
  // make board component hold state instead of each square
  // aggregate data by moving state up from child to parent then back down via props, then child will be in sync with other child and parent
  constructor(props){
    // add super(props) line when defining constructor of subclass in JS classes
    super(props);
    this.state = {
      // initialize state with array of 9 nulls to the 9 squares
      squares: Array(9).fill(null);
    }
  }
  // handler method for clicking on square
  handleClick(i){
    // call slice because we will copy the squares array instead of mutating existing array for immutability
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        // since component state is considered private, cant update board state from square
        // pass down function from board to square that gets called when square is clicked
        // handle* for handler methods
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// render the game board along with history
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// load the game component to the root element
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
