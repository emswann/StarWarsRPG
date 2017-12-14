/* JavaScript source code to execute the Star Wars game.
 
   NAME: characters.js
   AUTHOR: Elaina Swann
   DATE: 12/16/2017
   REVISION LOG:  
*/

function Characters() {

  function Character(strShortName, strFullName, nHealthPts, 
                     nAttPow, nCAttPow) {
    this.strShortName = strShortName;
    this.strFullName  = strFullName;
    this.nHealthPts   = nHealthPts;
    this.nAttPow      = nAttPow;
    this.nCAttPow     = nCAttPow;
    this.nAttacks     = 0;
  }

  this.find = function (searchElement) {
    var strShortName = searchElement.attr("id");

    for (let i = 0; i < this.arrCharacters.length; i++) {
      if (strShortName === this.arrCharacters[i].strShortName) {
        return this.arrCharacters[i];
      }
    }

    return undefined;
  }

  this.arrCharacters = (function () {
    return [new Character("obi", "Obi Wan Kenobi", 120, 8, 5),
            new Character("luke", "Luke Skywalker", 100, 5, 5),
            new Character("darth", "Darth Vader", 150, 5, 20),
            new Character("leia", "Princess Leia", 180, 5, 25)];
  })();

  this.objChosen   = undefined;
  this.objDefender = undefined;
}
