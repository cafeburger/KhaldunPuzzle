var numArray = [];
var totalCombined = 0;
var currentRow = 1;
var guessedNumber = 0;
var colorCode = {
  '1': 6255,
  '2': 6250,
  '3': 6251,
  '4': 6252,
  '5': 6253,
  '6': 6254,
  '7': 6249,
  '8': 6256
};
  
  
  
$(function () {
  $(".container").empty();


  //initArray();
  //guessedNumber = guessNumber();
  //genRow(guessedNumber);
});
var begin = function () {
  var a = 0;
  var b = 0;
  $("#begin").attr('disabled', 'disabled');
  var initA = parseInt($("#initAColor").val());
  var initB1 = parseInt($("#initBColor1").val());
  var initB2 = parseInt($("#initBColor2").val());
  var initB3 = parseInt($("#initBColor3").val());
  if (initA != 0) {
    a = 1;
  }
  if (initB1 != 0) {
    b++;
  }
  if (initB2 != 0) {
    b++;
  }
  if (initB3 != 0) {
    b++;
  }


  initArray(initA, initB1, initB2, initB3);
  removeNoUseNumber(b, initB1, initB2, initB3);
  console.dir(numArray);
  guessedNumber = guessNumber();
  genRow(guessedNumber);

};

var initArray = function (initA, initB1, initB2, initB3) {

  for (var i1 = 1; i1 <= 8; i1++) {
    if (initA == 0 || i1 == initA) {
      for (var i2 = 1; i2 <= 8; i2++) {
        for (var i3 = 1; i3 <= 8; i3++) {
          for (var i4 = 1; i4 <= 8; i4++) {
            for (var i5 = 1; i5 <= 8; i5++) {
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
  }

  console.dir(numArray);
  console.log("total combined:" + totalCombined);


};

var removeNoUseNumber = function (b, initB1, initB2, initB3) {
  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != null) {
      var bCount = 0;
      var tmpB1 = initB1;
      var tmpB2 = initB2;
      var tmpB3 = initB3;
      var strNumber = numberToString(numArray[i]);

      var num = [];
      num[1] = strNumber.substring(1, 2);
      num[2] = strNumber.substring(2, 3);
      num[3] = strNumber.substring(3, 4);
      num[4] = strNumber.substring(4, 5);

      for (var j = 1; j < strNumber.length; j++) {
        if (num[j] != null && num[j] == tmpB1) {
          bCount++;
          delete num[j];
          tmpB1 = 0;
          continue;
        }
        if (num[j] != null && num[j] == tmpB2) {
          bCount++;
          delete num[j];
          tmpB2 = 0;
          continue;
        }
        if (num[j] != null && num[j] == tmpB3) {
          bCount++;
          tmpB3 = 0;
          delete num[j];
        }
      }
      if (bCount < b) {
        delete numArray[i];
      }
    }
  }
}
var isSelfDup = function (number) {
  return checkDupB(number, number) > 0;
};
var checkDupA = function (number1, number2) {
  var result = 0;
  var strNumber1 = numberToString(number1);
  var strNumber2 = numberToString(number2);
  for (var i = 0; i < strNumber1.length; i++) {
    if (strNumber1.substring(i, i + 1) == strNumber2.substring(i, i + 1)) {
      result++;
    }
  }
  return result;
};

var checkDupB = function (number1, number2) {
  var result = 0;
  var strNumber1 = numberToString(number1);
  var strNumber2 = numberToString(number2);
  for (var i = 0; i < strNumber1.length; i++) {
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
};


var checkDupB_OLD = function (number1, number2) {
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
};

var checkDupAB = function (number1, number2) {
  return "" + checkDupA(number1, number2).valueOf() + checkDupB(number1, number2).valueOf();
};

var filterAB = function (number, ab) {
  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != null) {
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
};

var numberToString = function (number) {
  var strNumber = "00000" + number.valueOf();
  var len = strNumber.length;
  strNumber = strNumber.substring(len - 5);
  return strNumber;
};
var guessNumber = function () {
  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != null) {
      return numArray[i];
    }
  }

  return 0;
};

var guessNext = function (row) {
  var valueA = $('.row' + row).find("select[name='valueA']").val();
  var valueB = $('.row' + row).find("select[name='valueB']").val();
  console.log(valueA);
  console.log(valueB);
  filterAB(guessedNumber, "" + valueA + valueB);
  guessedNumber = guessNumber();
  genRow(guessedNumber);
  genButtonCode(guessedNumber);
};


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
      <span></span>
      
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
        <option value="5">5</option>
      </select>
      <span class="guess2">個正確,但位置不對</span>

      <input class="guess-button" type="button" value="猜下一個" onclick="guessNext(${currentRow})">`
  );
  $('.container').append(row);
  currentRow++;
};

var genButtonCode = function (number) {
  var buttonCode = `usetype 0xe40 'any' 'ground' 2
  pause 100
  `;
  var numStr = numberToString(number);
  var s1 = numStr.substring(0, 1);
  var s2 = numStr.substring(1, 2);
  var s3 = numStr.substring(2, 3);
  var s4 = numStr.substring(3, 4);
  var s5 = numStr.substring(4, 5);
  var colorIndex = 0;
// slot 1
colorIndex = colorCode[s1];
  buttonCode += `replygump 0x12a ${colorIndex} 91
  waitforgump 0x12a 15000
  pause 100
  `

  // slot 2
  colorIndex = colorCode[s2];
  buttonCode += `replygump 0x12a ${colorIndex} 92
  waitforgump 0x12a 15000
  pause 100
  `

  // slot 3
  colorIndex = colorCode[s3];
  buttonCode += `replygump 0x12a ${colorIndex} 93
  waitforgump 0x12a 15000
  pause 100
  `
  // slot 4
  colorIndex = colorCode[s4];
  buttonCode += `replygump 0x12a ${colorIndex} 94
  waitforgump 0x12a 15000
  pause 100
  `
  // slot 5
  colorIndex = colorCode[s5];
  buttonCode += `replygump 0x12a ${colorIndex} 95
  waitforgump 0x12a 15000
  pause 100
  `
  buttonCode+=`replygump 0x12a 89 95
  waitforgump 0x12c 15000
  
  `

  var copyText = document.getElementById("button-code");
    $("#button-code").text(buttonCode);

}

var copyToClipboard = function () {
   /* Get the text field */
   var copyText = document.getElementById("button-code");

   /* Select the text field */
   copyText.select();
 
   /* Copy the text inside the text field */
   document.execCommand("copy");
 
   /* Alert the copied text */
   alert("Copied the text: " + copyText.value);
}