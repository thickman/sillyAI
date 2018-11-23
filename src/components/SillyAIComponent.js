
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

     //console.log("randomWeight: "+JSON.stringify(weight));
     //console.log("example: "+JSON.stringify(example));


     const error = team - guessResult

     const isError = error !== 0;
     //console.log("isError: "+isError);


     const learningRate = 0.1
     return {
       x: weight.x + example.x * error * learningRate,
       y: weight.y + example.y * error * learningRate,
     }
  }

  team( point) {
    return point.x > point.y ? 1 : -1
  }

  // run array of example on a given weight to train it
  trainWeight(weight, randomExamples) {
    return randomExamples.reduce((previousWeight, example)  => {
      //console.log("===========================");
      //console.log("previousWeight: "+JSON.stringify(previousWeight));
      const trained = this.train(previousWeight, example, this.team(example));
      //console.log("trainedWeight: "+JSON.stringify(trained));
      return trained;
    },  weight);
  }

  // run array of examples of given weights
  trainWeights(weights, examples){
    return weights.map((weight) => {
      console.log("---------  trainWeights ---------");
      console.log("weight: "+JSON.stringify(weight));
      console.log("examples: "+JSON.stringify(examples));

      const trainedWeight = this.trainWeight(weight, examples);
      console.log("trainedWeight: "+JSON.stringify(trainedWeight));
      return trainedWeight;
    });
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

    const POINTS_AMOUNT = 50;
    const EXAMPLES_AMOUNT = 1000;

    const randomPoints = this.generatePoints(POINTS_AMOUNT, false, this.state.xMax);
    const randomWeights = this.generatePoints(POINTS_AMOUNT, true, 1);
    const randomExamples = this.generatePoints(EXAMPLES_AMOUNT, false, this.state.xMax);

    console.log("randomPoints: "+JSON.stringify(randomPoints));
    console.log("randomWeights: "+JSON.stringify(randomWeights));
    console.log("randomExamples: "+JSON.stringify(randomExamples));



    const trainedWeights = this.trainWeights(randomWeights, randomExamples)

    console.log("trainedWeights: "+JSON.stringify(trainedWeights));

    const board = this.drawBoard(trainedWeights, randomPoints);

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
