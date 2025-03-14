const arrayToCsv = (array) => {
  return array.map(row => row.join(',')).join('\n');
};


function doGet(e){
  if(e.parameter.key!=="secureKey8849465") {
    var JSONOutput = ContentService.createTextOutput('{"error": "No access!","e":'+JSON.stringify(e)+'}');
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput;  
  }

  sheetNowSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(e.parameter.sheet);

  if(!!e.parameter.increment) {
    let theValue = sheetNowSheet.getRange(e.parameter.range).getValues();
    if(e.parameter.range.match(/[A-Z]+[0-9]+\:[A-Z]+[0-9]+/)) {
        sheetNowSheet.getRange(e.parameter.range).setValue((parseInt((''+theValue[0]).replaceAll(/[^0-9]/gim,''))||0)+1);
    } else {
      sendMessage("DOMAINS error range incorect"+JSON.stringify(e.parameter));
    }
    let JSONOutput = ContentService.createTextOutput('{"Increment": "OK!","e":'+JSON.stringify(e)+',"orig":'+JSON.stringify(theValue)+'}');
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput;  
  }

  if(!!e.parameter.insert && !!e.parameter.value) {
    if(e.parameter.range.match(/[A-Z]+[0-9]+\:[A-Z]+[0-9]+/)) {
      sheetNowSheet.getRange(e.parameter.range).setValue(e.parameter.value);
    } else {
      sendMessage("DOMAINS error range incorect"+JSON.stringify(e.parameter));
    }
    let JSONOutput = ContentService.createTextOutput('{"Insert": "OK!","e":'+JSON.stringify(e)+'}');
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput;  
  }

  let lineDataNames = !!e.parameter.range?sheetNowSheet.getRange(e.parameter.range).getValues():sheetNowSheet.getDataRange().getValues();
  
  if(!!e.parameter.structure && e.parameter.structure=="CSV") {
    let CSVString = arrayToCsv(lineDataNames);
    var CSVOutput = ContentService.createTextOutput(CSVString);
    CSVOutput.setMimeType(ContentService.MimeType.CSV);
    return CSVOutput;  
  }

  var JSONString = JSON.stringify(lineDataNames);  
  
  var JSONOutput = ContentService.createTextOutput(JSONString);
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput;  
}


function sendMessage(text) {
  try{
    const response = UrlFetchApp.fetch("https://api.telegram.org/bot7247560053:AAGUgnaQDUMiiO-KjqjsgbfZkcfSQjX9WVc/sendMessage?chat_id=-1002384087774&text=monday-"+encodeURIComponent(text), {});
    let html = response.getContentText();
    console.log(html);
  } catch(e){
    console.log("cannot send message");
  }
}