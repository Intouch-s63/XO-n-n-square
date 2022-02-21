import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  Column(size,size2){
    const col = []
    for(var i = size2*size ; i < size*(1+size2);i++){
      col.push(this.renderSquare(i))
    }
    return(col);
  }
  Row(size){
    const row = []
    for(var i = 0 ; i<size ; i++){
      row.push(<div className='board-row'>{this.Column(size,i)}</div>)
    }
    return(row);
  }
  render() {
    return (
      <div>
        <div>
          {this.Row(this.props.input)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      value:''
      
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});}



  

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
 

    const moves = history.map((step, move) => {
      const desc = move ?
        'go to move #' + move :
        'go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
      
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            input ={this.state.value}
          />
        </div>
        <div className="game-info">

        NxN:
        <select class='input' value={this.state.value} onChange={this.handleChange}>
        <option name="3"> 3</option>
        <option name="4"> 4</option>
        <option name="5"> 5</option>
        <option name="6"> 6</option>
        <option name="7"> 7</option>
        <option name="8"> 8</option>
        <option name="9"> 9</option>
        <option name="10"> 10</option>
        </select>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}