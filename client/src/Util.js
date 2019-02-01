export function findElement(arr, propName, propValue) {
  if(arr === undefined){
    return null;
  }
    for (var i=0; i < arr.length; i++)
      if (arr[i][propName] === propValue)
        return arr[i];
  
    // will return undefined if not found; you could return a default instead
  }