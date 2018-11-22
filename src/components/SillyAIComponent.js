
import React from 'react';

class SillyAIComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xMax: 200,
      yMax: 200,
    }
  }

  getSign(signSensitive) {
    if(!signSensitive) return 1;
    return Math.round(Math.random() *100) % 2 === 0
        ? 1
        : -1;
    }

  generatePoints(amount, signSensitive, multiplier = 1 ) {
    const pointsArray = [];

    for(let i = 0; i<amount; i++){
      pointsArray.push({
        x: Math.random() * this.getSign(signSensitive) * multiplier,
        y: Math.random() * this.getSign(signSensitive) * multiplier,
      })
    }
    return pointsArray;
  }

  //const rand = (high, low) => Math.random() * (high - low) + low

  //////////////////////////////////////////////

  guess(weights, point) {
    const sum =
          point.x * weights.x +
          point.y * weights.y
    const team = sum >= 0 ? 1 : -1
    return team
  }

  train(weights, point, team) {
     const guessResult = this.guess(weights, point) // 1
     const error = team - guessResult
     const learningRate = 0.1
     return {
       x: weights.x + point.x * error * learningRate,
       y: weights.y + point.y * error * learningRate,
     }
  }

  team( point) {
    return point.x > point.y ? 1 : -1
  }

  drawBoard(randomPoints){
    return randomPoints.map(point=>this.drawCircle(point))
  }

  drawCircle(point){
    const fillColour = this.team(point) === 1 ? 'red' : 'blue' ;
    return(
        <circle key={'key_'+point.x} r='3' cx={point.x} cy={point.y} fill={fillColour}/>
    )
  }

  render(){
    const randomPoints = this.generatePoints(100, false, this.state.xMax);
    const board = this.drawBoard(randomPoints);

    return (
      <div id="boardContainer">
        <svg id="board" width={this.state.xMax} height={this.state.yMax}>
          { board }
          <line x1="0" x2={this.state.xMax} y1="0" y2={this.state.yMax} stroke="purple" />
        </svg>
      </div>
    )
  }
}

export default SillyAIComponent;
