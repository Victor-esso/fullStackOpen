export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sortDESC = (obj) =>  {
   // Convert the object into an array of key-value pairs
   const entries = Object.entries(obj);

   // Sort the array by value in descending order
   const sortedEntries = entries.sort(([, valueA], [, valueB]) => valueB - valueA);
 
   // Convert the sorted array back into an object
   return Object.fromEntries(sortedEntries);
}

export const getKeyWithMaxValue = (obj) => {
    return Object.entries(obj).reduce((maxKey, [key, value]) => {
      return value > obj[maxKey] ? key : maxKey;
    }, Object.keys(obj)[0]);
  }