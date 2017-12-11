/* JavaScript source code to execute the Star Wars game.
 
   NAME: game.js
   AUTHOR: Elaina Swann
   DATE: 12/14/2017
   REVISION LOG:  
*/

$(document).ready(function(){
  const CHARLIST = ["obi", "luke", "darth", "leia"]

  function moveToChosen(strChosenName){
    var strThisElement   = $("#" + strChosenName);

    strThisElement.removeClass("choose").addClass("chosen");

    $("#chosen-char").append($(strThisElement));
  }

  function moveToEnemies(strEnemyName) {
    var strThisElement   = $("#" + strEnemyName),
        strParentElement = strThisElement[0].parentNode;

    strThisElement.removeClass("choose").addClass("enemy");

    $("#enemies-row").append($(strParentElement));
  }

  function chooseClick() {    
    var strChosen = $(this).attr("id");

    moveToChosen(strChosen);

    for (var i = 0; i < CHARLIST.length; i++) {
      if (strChosen !== CHARLIST[i]) {
        moveToEnemies(CHARLIST[i]);
      }
    }

    $("#choose-row").empty();
  }

  $(".choose").on("click", chooseClick);
});