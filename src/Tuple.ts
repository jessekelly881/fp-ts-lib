
/*
 * Turn a value into a tuple with left and right sides containing value
 */
export const branch = <_>(t: _): [_, _] => [t, t];
