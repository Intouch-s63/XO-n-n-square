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

  Column(size,j){
    const col = []
    for(var i = j*size ; i < size*(1+j);i++){
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
      value:3
      
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
    const winner = calculateWinner(current.squares,this.state.value);
 

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner== "X") {
      status = "winner: " + winner;
    }  else if (winner == "O"){
        status = "winner: " + winner;
    }

     else {
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

function calculateWinner(squares,size){
  let field = []
  for (let x = 0 ; x < size ; x++){
    let row = []
    for ( let y = 0 ; y < size ; y++){
      row.push(squares[x*size+y])
    }
  field.push(row)
  }
  
for (let x = 0; x< size ; x++){
  let horizon = []
  for (let y = 0; y< size ; y++){
    horizon.push(field[x][y])
  }
  if (horizon.every((Win)=>Win==='X')){
    return 'X'
  } else if (horizon.every((Win)=>Win==='O')){
      return 'O'
  } 
}

for (let x = 0; x< size ; x++){
  let verticle = []
  for (let y = 0; y< size ; y++){
    verticle.push(field[y][x])
  }
  if (verticle.every((Win)=>Win==='X')){
    return 'X'
  } else if (verticle.every((Win)=>Win==='O')){
      return 'O'
  }
}

for (let x = 0; x< size ; x++){
  let diagonal = []
  for (let y = 0; y< size ; y++){
    diagonal.push(field[y][y])
  }
  if (diagonal.every((Win)=>Win==='X')){
    return 'X'
  } else if (diagonal.every((Win)=>Win==='O')){
      return 'O'
  }
}

for (let x = 0; x< size ; x++){
  let reversediagonal = []
  for (let y = 0; y< size ; y++){
    reversediagonal.push(field[y][size-y-1])
  }
  if (reversediagonal.every((Win)=>Win==='X')){
    return 'X'
  } else if (reversediagonal.every((Win)=>Win==='O')){
      return 'O'
  }
}
  return null;
}