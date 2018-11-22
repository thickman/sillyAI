const X_MAX = 400;
const Y_MAX = 400;

const getSign = (signSensitive) => {
  if(!signSensitive) return 1;
  return Math.round(Math.random() *100) % 2 == 0
      ? 1
      : -1;
  }

const generatePoints = (amount, signSensitive, multiplier = 1 ) => {
  const pointsArray = new Array();

  for(i = 0; i<amount; i++){
    pointsArray.push({
      x: Math.random() * getSign(signSensitive) * multiplier,
      y: Math.random() * getSign(signSensitive) * multiplier,
    })
  }
  return pointsArray;
}

//const rand = (high, low) => Math.random() * (high - low) + low

//////////////////////////////////////////////

const guess = (weights, point) => {
  const sum =
        point.x * weights.x +
        point.y * weights.y
  const team = sum >= 0 ? 1 : -1
  return team
}

const train = (weights, point, team) => {
   const guessResult = guess(weights, point) // 1
   const error = team - guessResult
   const learningRate = 0.1
   return {
     x: weights.x + point.x * error * learningRate,
     y: weights.y + point.y * error * learningRate,
   }
}

const team = point => point.x > point.y ? 1 : -1

const drawBoard = (randomPoints) => {
  const board = document.getElementById("board");

  randomPoints.forEach(point => {
    const fillColour = team(point) === 1 ? 'red' : 'blue' ;
    const circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', 3);
    circle.setAttribute('style', 'fill: ' + fillColour);
    board.appendChild(circle);
  });
}

const randomPoints = generatePoints(50, false, 200);
drawBoard(randomPoints);
