
import React from 'react';

class SillyAIComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xMax: 400,
      yMax: 400,
    }
  }

  // create randomSign
  randomSign(signSensitive) {
    if(!signSensitive) return 1;
    return Math.round(Math.random() *100) % 2 === 0
        ? 1
        : -1;
    }

  // generate random point array
  generatePoints(amount, signSensitive, multiplier = 1 ) {
    const pointsArray = [];

    for(let i = 0; i<amount; i++){
      pointsArray.push({
        x: Math.random() * this.randomSign(signSensitive) * multiplier,
        y: Math.random() * this.randomSign(signSensitive) * multiplier,
      })
    }
    return pointsArray;
  }

  //const rand = (high, low) => Math.random() * (high - low) + low

  //////////////////////////////////////////////

  // so called Activation Function - based on input and weight determine the output
  // here as simple as sum > 0
  guess(weight, point) {
    const sum =
          point.x * weight.x +
          point.y * weight.y
    const team = sum >= 0 ? 1 : -1
    return team
  }

  // train a weight with a given example
  train(weight, example, team) {
     const guessResult = this.guess(weight, example) // 1
     const error = team - guessResult
     const learningRate = 0.1
     return {
       x: weight.x + example.x * error * learningRate,
       y: weight.y + example.y * error * learningRate,
     }
  }

  team( point) {
    return point.x > point.y ? 1 : -1
  }

  // run array of example on a given (individual) weight to train it
  trainWeight(weight, randomExamples) {
    return randomExamples.reduce((previousWeight, example)  => {
      const trained = this.train(previousWeight, example, this.team(example));
      return trained;
    },  weight);
  }

  // run array of examples on a array of weights
  trainWeights(weights, examples){
    return weights.map((weight) => {
      const trainedWeight = this.trainWeight(weight, examples);
      return trainedWeight;
    });
  }

  //get a list of circles
  drawBoard(weights, randomPoints){
    const circles = [];
    for (const [i, point] of randomPoints.entries()){
      circles.push(this.drawCircle(weights[i], point));
    }
    return circles;
  }

  // draw a single svg circle
  drawCircle(weight, point){
    const fillColour = this.guess(weight, point) === 1 ? 'red' : 'blue' ;
    return <circle key={'key_'+point.x} r='3' cx={point.x} cy={point.y} fill={fillColour}/>
  }

  // training weights
  render(){

    const POINTS_AMOUNT = 100;
    const EXAMPLES_AMOUNT = 100;

    const randomPoints = this.generatePoints(POINTS_AMOUNT, false, this.state.xMax);
    const randomWeights = this.generatePoints(POINTS_AMOUNT, true, 1);
    const randomExamples = this.generatePoints(EXAMPLES_AMOUNT, false, this.state.xMax);

    const trainedWeights = this.trainWeights(randomWeights, randomExamples)

    const newRandomPoints = this.generatePoints(POINTS_AMOUNT, false, this.state.xMax);

    // use trainedWeights or randomWeights as first param to see the diff between trained and untrained brain
    const untrainedBoard = this.drawBoard(randomWeights, randomPoints);
    const trainedBoard = this.drawBoard(trainedWeights, randomPoints);
    const trainedBoardWithFreshData = this.drawBoard(trainedWeights, newRandomPoints);

    const containerStyle = {
      display:'flex',

    };

    const boardStyle = {
      backgroundColor: "#fff1db",
      marginLeft: '20px',
    };

    return (
      <div style={containerStyle}>
        <div style={boardStyle} id="boardContainer">
          <svg id="untrained-board" width={this.state.xMax} height={this.state.yMax}>
            { untrainedBoard }
            <line x1="0" x2={this.state.xMax} y1="0" y2={this.state.yMax} stroke="purple" />
          </svg>
          <p>untrained brain</p>
        </div>
        <div style={boardStyle} id="boardContainer">
          <svg id="trained-board" width={this.state.xMax} height={this.state.yMax}>
            { trainedBoard }
            <line x1="0" x2={this.state.xMax} y1="0" y2={this.state.yMax} stroke="purple" />
          </svg>
          <p>trained brain</p>
        </div>
        <div style={boardStyle} id="boardContainer2">
          <svg id="fresh-data-board" width={this.state.xMax} height={this.state.yMax}>
            { trainedBoardWithFreshData }
            <line x1="0" x2={this.state.xMax} y1="0" y2={this.state.yMax} stroke="purple" />
          </svg>
          <p>trained brain with newly generated points</p>
        </div>
      </div>
    )
  }
}

export default SillyAIComponent;
