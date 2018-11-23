
import React from 'react';

class SillyAIComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xMax: 200,
      yMax: 200,
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

    //console.log("weight: "+weight);
    //console.log("point: "+point);

    const sum =
          point.x * weight.x +
          point.y * weight.y
    const team = sum >= 0 ? 1 : -1
    return team
  }

  // train a weight
  train(weight, example, team) {
     const guessResult = this.guess(weight, example) // 1

     console.log("randomWeight: "+JSON.stringify(weight));
     console.log("example: "+JSON.stringify(example));


     const error = team - guessResult

     const isError = error !== 0;
     console.log("isError: "+isError);


     const learningRate = 0.1
     return {
       x: weight.x + example.x * error * learningRate,
       y: weight.y + example.y * error * learningRate,
     }
  }

  team( point) {
    return point.x > point.y ? 1 : -1
  }


  // return array of weights of lenght of examples[]
  trainWeights(randomWeight, randomExamples) {
    return randomExamples.map( example => {
      console.log("--------------------");


      const trained = this.train(randomWeight, example, this.team(example));
      console.log("trained: "+JSON.stringify(trained));
      //return this.train(randomWeight, example, this.team(example))
      return trained;
    })
  }

  drawBoard(weights, randomPoints){

    // should it be point[i] and weights[i]?
    //return randomPoints.map(point=>this.drawCircle(point))


    const circles = [];
    for (const [i, point] of randomPoints.entries()){
      circles.push(this.drawCircle(weights[i], point));
    }
    return circles;
  }

  drawCircle(weight, point){
    const fillColour = this.guess(weight, point) === 1 ? 'red' : 'blue' ;
    return <circle key={'key_'+point.x} r='3' cx={point.x} cy={point.y} fill={fillColour}/>

  }


  // training weights
  render(){

    const POINTS_AMOUNT = 2;
    const EXAMPLES_AMOUNT = 3;

    const randomPoints = this.generatePoints(POINTS_AMOUNT, false, this.state.xMax);
    const randomExamples = this.generatePoints(EXAMPLES_AMOUNT, false, this.state.xMax);
    const randomWeights = this.generatePoints(1, true, 1);

    console.log("randomPoints: "+JSON.stringify(randomPoints));
    console.log("randomExamples: "+JSON.stringify(randomExamples));
    console.log("randomWeights: "+JSON.stringify(randomWeights));


    const trainedWeights = this.trainWeights(randomWeights[0], randomExamples)

    console.log("trainedWeights: "+JSON.stringify(trainedWeights));

    const board = this.drawBoard(randomWeights, randomPoints);

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
