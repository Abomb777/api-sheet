# API for sheet


```js
SpreadsheetApp.getActiveSpreadsheet();
function api() {
  var url = "https://raw.githubusercontent.com/Abomb777/api-sheet/refs/heads/main/api.gs?t="+(new Date().getTime()); 
  var response = UrlFetchApp.fetch(url).getContentText(); 
  eval(response); 
  api(); 
}

```