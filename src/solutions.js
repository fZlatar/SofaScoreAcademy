module.exports = {
  /**
   * Returns an empty object without prototype. There is object creation type that creates object without prototype
   */
  createPrototypelessObject() {
    return Object.create(null)
  },

  /**
   * Returns an object with prototype set to given `proto`.
   * @param {Object} proto Prototype object
   */
  createObjectWithPrototype(proto) {
    return Object.create(proto)
  },

  /**
   * Returns an object with `value` property set to the given `value` and `getValue` method.
   * Be careful, if `value` changes, `getValue` should return changed `value`.
   * @param {any} value
   */
  createObjectWithMethod(value) {
    return {
      value: value,
      getValue: function() {return this.value}
    }
  },

  /**
   * Returns an object with the `getValue` and `setValue` methods, having `value` hidden from the outside.
   */
  createEncapsulatedObject() {
    return (function() {
      let value
      return {
        getValue: function() {return value},
        setValue: function(v) {value = v}
      }
    })()
  },

  /**
   * Returns the shallow copy of the given `obj`. HINT: This **operator** will be used later.
   * @param {Object} obj
   */
  shallowCopy(obj) {
    return {...obj}
  },

  /**
   * Returns the deep copy of the given `obj`.
   * @param {Object} obj
   */
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Returns an array containing 2 elements which are
   * loosely equal, but strictly unequal.
   */
  looselyTrue() {
    return [0, '0']
  },

  /**
   * Returns a string that is loosely equal to boolean `true`. This one is tricky :)
   */
  stringLooselyEqualToTrue() {
    return '1'
  },

  /**
   * Returns correct sum of a and b.
   */
  safeSum(a, b) {
    return parseInt(a) + parseInt(b)
  },

  /**
   * Returns formatted string for the given date.
   * Format should be `{day}-{month}-{fullYear}` (all numbers).
   * @param {Date} date
   */
  formatDate(date) {
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  },

  /**
   * Sorts the given `numberArray` in ascending order.
   * Use array `.sort` method. Sort is done in place so there is no need to return anything.
   * @param {number[]} numberArray
   */
  sortNumberArray(numberArray) {
    numberArray.sort((a, b) => {
      if(a < b) return -1
      else if(a > b) return 1
      return 0
    })
  },

  /**
   * Multiplies all the elements in the array by 2 _in place_
   * (edits the given array) and returns it.
   * @param {number[]} numberArray
   */
  multiplyArrayByTwo(numberArray) {
    numberArray.forEach((a, i) => {numberArray[i] = a * 2})
    return numberArray
  },

  /**
   * Multiplies all the elements in the array by 2 and returns them
   * in a new array.
   * @param {number[]} numberArray
   */
  multiplyArrayByTwoNew(numberArray) {
    return numberArray.map(a => a * 2)
  },

  /**
   * Returns first `n` Fibonacci numbers in an array. https://en.wikipedia.org/wiki/Fibonacci_sequence
   * If the n is <= 0, return `undefined`
   * @param n
   */
  fibonacciNumbers(n) {
    if(n <= 0) return undefined
    let arr = []
    for(let i = 0; i < n; i++) {
      if(i === 0) arr[0] = 0
      else if(i === 1) arr[1] = 1
      else arr[i] = arr[i-2] + arr[i-1]
    }
    return arr
  },

  /**
   *
   * EXTRA CREDIT TASK (no points):
   *
   * Create two classes: `Person` and `Programmer`. `Programmer` class extends `Person`.
   * Person class has `name` property (set via constructor) and `getName` method (calls `callGetName` with name`).
   * Programmer class has `language` property provided to constructor (and `name` inherited from `Person`) and `getLanguage` method (calls `callGetLanguage` with `language`)
   * Return object with created classes, `return { Person, Programmer }`.
   *
   * NOTE: class methods should use `bind`, function expression syntax might not work here because code isn't transpiled.
   *
   * @param {Function} callGetName
   * @param {Function} callGetLanguage
   */
  classInheritance(callGetName, callGetLanguage) {
    class Person {
      constructor(name) {
        this.name = name
      }

      getName() {
        return callGetName(this.name)
      }
    }

    class Programmer extends Person {
      constructor(name, language) {
        super(name)
        this.language = language
      }

      getLanguage() {
        return callGetLanguage(this.language)
      }
    }
    return { Person, Programmer }
  },

  /**
   * **This is variant of probably most common "big firm" interview question with closures.**
   *
   * If you can't find a solution yourself, you can Google and paste it, and try to understand why it works like that.
   * We will also explain it in the nearest lecture.
   *
   * This task has easier solutions (e.g. using `let` instead of `var`), but desired solutions included Closures.
   *
   * Call the `consumer` function once every second three times giving it loop iterator as argument.
   * Use the provided for loop, do not change for loop, but feel free to modify setTimeout.
   * @param {Function} consumer
   */
  timeoutIncrement(consumer) {
    for (var i = 1; i <= 3; i += 1) {
      (function(index) { // We need to use closure because consumer function is called after 1 second but for loop is much faster so it already makes 3 iterations and gets to 4. When using var the variable i is 'remembered' with every iteration while when using let variable i is 'alive' only in one iteration. I think :)
        setTimeout(() => {
          consumer(index)
        }, 1000)
      })(i)
    }
  },
}