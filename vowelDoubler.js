var vowelDouble = function(array) {
  for (var i = 0; i < array.length; i++) {
    if(array[i] === 'a' || array[i] === 'e' || array[i] === 'i' || array[i] === 'o' || array[i] === 'u') {
      var vowel = array[i];
      array.unshift(vowel);
      for(var j = 0; j < i; j++) {
        var current = array[j];
        var next = array[j + 1];
        array[j] = next;
        array[j + 1] = current;
      }
      i++;
    }
  }
console.log(array);
return array;
}

// var string = 'what on earth are you talking about?'
// var array = string.split('')

vowelDouble(array);