/*
  @function: getNumberComponents()
  @desc: Parses a float for it's whole number and fraction counterpart, separately.
  @param: number<float>
  @return: numberComponents<Object>
    - whole<int>
    - remaining<float>
*/
export const getNumberComponents = (number, scaleRemainder) => {
  const whole = Math.trunc(number);
  let remaining = Math.abs(number) - whole;

  /*
   ! issue: 
   In cases where we have a repeating decimal as a result from the division,
   for example: 4/12 (0.3333...), subtracting the whole number part from that
   will cause weird rounding logic where 4/12 won't equal a full third.
  */
  if (typeof(scaleRemainder) === 'number') {
   // this is a temporary fix
    remaining = Math.floor(remaining*scaleRemainder + 0.0001);
  }

  return {
    whole,
    remaining
  }
}