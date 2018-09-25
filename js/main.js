var numArray = [];
var totalCombined = 0;
var currentRow = 1;
var guessedNumber = 0;
$(function () {
  $(".container").empty();


  initArray();
  guessedNumber = guessNumber();
  genRow(guessedNumber);
})

var initArray = function () {
  
  for (var i1 = 0; i1 <= 7; i1++){
    for (var i2 = 0; i2 <= 7; i2++){
      for (var i3 = 0; i3 <= 7; i3++){
        for (var i4 = 0; i4 <= 7; i4++){
          for (var i5 = 0; i5 <= 7; i5++){
            var idx = i1 * 10000 + i2 * 1000 + i3 * 100 + i4 * 10 + i5
            //if (!isSelfDup(idx)) {
              numArray[idx] = idx;
              totalCombined++;
            //}
          }
        }
      }
    }  
  }

  console.dir(numArray);
  console.log("total combined:" + totalCombined);


}
var isSelfDup = function(number) {
  return checkDupB(number, number) > 0;
}
var  checkDupA=function(number1, number2) {
  var result = 0;
  var strNumber1 = numberToString(number1);
  var strNumber2 = numberToString(number2);
  for (var i = 0; i < strNumber1.length; i++) {
      if (strNumber1.substring(i, i + 1) == strNumber2.substring(i, i + 1)) {
          result++;
      }
  }
  return result;
}

var checkDupB = function (number1, number2) {
  var result = 0;
  var strNumber1 = numberToString(number1);
  var strNumber2 = numberToString(number2);
  for (var i = 0; i < strNumber1.length; i++){
    if (strNumber1.substring(i, i + 1) != strNumber2.substring(i, i + 1)) {
      for (var j = 0; j < strNumber2.length; j++) {
        if (i != j) {
          if (strNumber1.substring(i, i + 1) == strNumber2.substring(j, j + 1)) {
            result++;
            break;
          }
        }
      }
    }
  }
  return result;
}


var checkDupB_OLD = function(number1, number2) {
  var result = 0;
  var slot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var strNumber1 = numberToString(number1);
  var strNumber2 = numberToString(number2);
  for (var i = 0; i < strNumber1.length; i++) {
      var digit1 = parseInt(strNumber1.substring(i, i + 1));
      var digit2 = parseInt(strNumber2.substring(i, i + 1));
      if (slot[digit1] == 0) {
          slot[digit1] = i + 1;
      } else {
          result++;
      }
      if (digit1 != digit2) {
          if (slot[digit2] == 0) {
              slot[digit2] = i + 1;
          } else {
              result++;
          }
      }
  }
  return result;
}
var checkDupAB = function(number1, number2) {
  return "" + checkDupA(number1, number2).valueOf() + checkDupB(number1, number2).valueOf();
}
 var filterAB=function( number, ab) {
   for (var i = 0; i < numArray.length; i++) {
     if (!!numArray[i]) {
       if (checkDupAB(numArray[i], number) != ab) {
         delete numArray[i];
       } else {
         //System.out.print(numbers[i] + "\t");
         console.log(numArray[i] + "\t")
       }
     }
   }
        //System.out.println();
        //return numArray;
    }

var numberToString = function(number) {
  var strNumber = "00000" + number.valueOf();
  var len = strNumber.length;
  strNumber = strNumber.substring(len - 5);
  return strNumber;
}
var guessNumber=function() {
  for (var i = 0; i < numArray.length; i++){
    if (!!numArray[i]) {
      return numArray[i];
    }
  }

  return 0;
}

var guessNext=function(row){
  var valueA = $('.row' + row).find("select[name='valueA']").val();
  var valueB = $('.row' + row).find("select[name='valueB']").val();
  console.log(valueA);
  console.log(valueB);
  filterAB(guessedNumber, "" + valueA + valueB);
  guessedNumber = guessNumber();
  genRow(guessedNumber);
}


var genRow = function (number) {
  var numStr = numberToString(number);
  var s1 = numStr.substring(0, 1);
  var s2 = numStr.substring(1, 2);
  var s3 = numStr.substring(2, 3);
  var s4 = numStr.substring(3, 4);
  var s5 = numStr.substring(4, 5);
  var row = $( 
    `<div class="row${currentRow}"></input>
      <span class="number">${s1}</span>
      <span class="number">${s2}</span>
      <span class="number">${s3}</span>
      <span class="number">${s4}</span>
      <span class="number">${s5}</span>
      <span>|</span>
      
      <select class="guess" name="valueA" id="valueA">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <span class="guess2">個完全正確</span>
      <select class="guess" name="valueB" id="valueA">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <span class="guess2">個正確,但位置不對</span>

      <input class="guess-button" type="button" value="猜下一個" onclick="guessNext(${currentRow})">`
  );
  $('.container').append(row);
  currentRow++;
}