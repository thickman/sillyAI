const dragonEvents = [
  {type: 'attack', value: 12, target: 'player-dorkman'},
  {type: 'yawn', value: 40},
  {type: 'eat', target: 'horse'},
  {type: 'attack', value: 23, target: 'player-fluffykins'},
  {type: 'attack', value: 12, target: 'player-dorkman'}
]


const totalDamageOnDorkman = dragonEvents
  .filter(e => e.type == 'attack')
  .filter(e => e.target== 'player-dorkman')
  .reduce((a,b) => a.value + b.value )



const adam  = totalDamageOnDorkman;



  const hasTargetPlayer = player => event => event.target === 'player-' + player


  
