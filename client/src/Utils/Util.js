export function findElement(arr, propName, propValue) {
  return new Promise(function(resolve, reject){
    if (arr === undefined) {
      reject(new ReferenceError("Array not provided"))
    }
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] === propValue)
        resolve(arr[i]);
  
  })
  
  // will return undefined if not found; you could return a default instead
}

export function multiplierToPercent(multiplier) {
  return 100 - multiplier * 100;
}

export function percentToMultiplier(percent) {
  return (100 - percent) / 100;
}