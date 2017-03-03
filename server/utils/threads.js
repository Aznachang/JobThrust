var compareTwoGreater = function(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) > b.charCodeAt(i)) {
      return a;
    } else if (b.charCodeAt(i) > a.charCodeAt(i)) {
      return b;
    }
  }

  return 'The two strings are the same';
}

var compareTwoLesser = function(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) < b.charCodeAt(i)) {
      return a;
    } else if (b.charCodeAt(i) < a.charCodeAt(i)) {
      return b;
    }
  }

  return 'The two strings are the same';
}

var threadSort = function(array) {
  var result = array.sort(function(first, second) {
    if (compareTwoGreater(first, second) === first) {
      return 1;
    } else if (compareTwoGreater(first, second) === second) {
      return -1;
    } else {
      return 0;
    }
  });
  console.log('SORTED RESULT:', result);
  return result;
};

module.exports = {
  sortThreads: threadSort
};