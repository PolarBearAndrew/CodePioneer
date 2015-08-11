
for(var i = 0; i < 50; i++){

  var y = i;

  console.log('y(day) = ', y);

  var val =  (y * y) + 50 ;

  val = -1 * Math.sqrt(val) + 46;

  val = val / 1.3;

  console.log('x(t) = ', val);
  console.log('====================');
}
