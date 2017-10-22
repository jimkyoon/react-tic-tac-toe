// import react modules
import React from 'react';
import ReactDOM from 'react-dom';
// import the css
import './index.css';

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
// replaced square class with function because of functional components
// // component for each square
// class Square extends React.Component {
//   render() {
//     return (
//       // on* names for attributes
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// component to create the board and player turns
class Board extends React.Component {
  // no longer need constructor because initial state is in game component
  // // add constructor to class to initialize state
  // // make board component hold state instead of each square
  // // aggregate data by moving state up from child to parent then back down via props, then child will be in sync with other child and parent
  // constructor(props){
  //   // add super(props) line when defining constructor of subclass in JS classes
  //   super(props);
  //   this.state = {
  //     // initialize state with array of 9 nulls to the 9 squares
  //     squares: Array(9).fill(null),
  //     // make player X go first by default in constructor
  //     xIsNext: true,
  //   };
  // }

  // handle* for handler methods
  // handler method for clicking on square
  // no longer needed in board component, moved to game component
  // handleClick(i){
  //   // call slice because we will copy the squares array instead of mutating existing array for immutability
  //   const squares = this.state.squares.slice();
  //   // ignore click if there is a winner or square is already clicked
  //   if(calculateWinner(squares) || squares[i]){
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X':'O';
  //   this.setState({
  //     squares: squares,
  //     // flip the boolean value and save player state
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        // since component state is considered private, cant update board state from square
        // pass down function from board to square that gets called when square is clicked
        // now from props because game component handles state
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // no longer needed since status is done in the game component
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if(winner){
    //   status = 'Winner: ' + winner;
    // }
    // else{
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
    // }
    return (
      <div>
        {/* <div className="status">{status}</div> */}
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
  // adding in constructor to set up initial state in game
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i){
    // now need history to know the step number
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    // call slice because we will copy the squares array instead of mutating existing array for immutability
    const squares = current.squares.slice();
    // ignore click if there is a winner or square is already clicked
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      // state now knows what step number
      stepNumber: history.length,
      // flip the boolean value and save player state
      xIsNext: !this.state.xIsNext,
    });
  }
  // jumpto method to set the state at a certain time
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    });
  }
  render() {
    // add in history, the current state, and the winner if there is
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // render multiple items in react by passing an array of react elements
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if(winner){
      status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// finding the winner of the game
function calculateWinner(squares){
  // possible combinations to win
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

// ========================================

// load the game component to the root element
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
