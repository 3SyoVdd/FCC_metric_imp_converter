function ConvertHandler() {
  const convArr =[];
  convArr.push(["gal", "L", 3.78541, "gallons", "liters"]);
  convArr.push(["L", "gal", 1/3.78541,"liters", "gallons"]);
  convArr.push(["l", "gal", 1/3.78541,"liters", "gallons"]);// unsauber
  convArr.push(["mi", "km", 1.60934, "miles", "kilometers"]);
  convArr.push(["km", "mi", 1/1.60934, "kilometers", "miles"]);
  convArr.push(["lbs", "kg", 0.453592, "pounds", "kilograms"]);
  convArr.push(["kg", "lbs", 1/0.453592, "kilograms", "pounds"]);
  
  this.getNum = function(input) {
    //je nachdem ob input als zahl oder als string eingegeben wurde gibt es ein problem
    //deshalb hier convertieren
    input = input +"";
    
    //zahlen punkte und slash bis zum ersten Buchstaben
    let result;
    let reg = /[\d\.\/]*/;//alle zahlen und punkte und slasch bis zum ersten Buchstaben
    let matc = input.match(reg)
    console.log ("Grundeinheit", matc[0])
    
    if(matc[0] == ""){//wenn keine zahl gefunden
      return 1;
    }
    //bruch
    if (matc[0].includes("/")){
      let arr = matc[0].split("/");
      if (arr.length > 2){
        return "invalid number";
      }
      result = arr[0]/arr[1];
      console.log ("wert nach bruch:" , result);
    }else{
      result = matc[0];
      console.log("wert ohne bruch:", result);
    }
    
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    //buchstaben nach dem ersten punkt oder slash
    reg = /[a-zA-Z]*$/;
    let matc = input.match(reg);
    let initUnit = matc[0].toLowerCase();
    console.log ("einheit",input, initUnit);

    
    for (let i = 0; i < convArr.length; i++){
      if (convArr[i][0].toLowerCase()== initUnit){
        console.log ("einheit gefunden");
        return convArr[i][0]
      }
    }
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    for (let i = 0; i < convArr.length; i++){
      if (convArr[i][0]== initUnit){
        console.log ("Return unit gefunden", convArr[i][1])
        return convArr[i][1];
      }
    }
    return "Error Unit not Found";
    
  };

  this.spellOutUnit = function(unit) {
    let result;
    for (let i = 0; i < convArr.length; i++){
      if (convArr[i][0]== unit){
        return convArr[i][3];
      }
    }

    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    console.log ("Ich bin der converth");
    ;
    for (let i = 0; i < convArr.length; i++){
      if (convArr[i][0]== initUnit){
        console.log ("Konvertiere zu wert", convArr[i][2]*initNum);
        //return (convArr[i][2]*initNum).toFixed(5);
        return Math.round(convArr[i][2]*initNum*100000)/100000
      }
    }



    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    console.log ("string bauen ", initUnit);
    let result;
    let initUnitString;
    let convUnitString;
     for (let i = 0; i < convArr.length; i++){
      // console.log ("vergleich",convArr[i][0] , initUnit, convArr.length)
        if (convArr[i][0] == initUnit){
           initUnitString = convArr[i][3]
           convUnitString = convArr[i][4]
        }
     }
    
    result = initNum + " " + initUnitString + " converts to " + returnNum +" "+ convUnitString;
    return result;
  };
  
}

module.exports = ConvertHandler;
