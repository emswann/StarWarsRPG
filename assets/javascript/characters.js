/**
 * @file Defines Characters object for executing Star Wars RPG game.
 * @author Elaina Swann
 * @version 1.0 
 */

/** 
 * @constructor Characters
 * @constructs {object} Contains a Character array along with designated chosen and defender Character objects.
*/
function Characters() {

  /** 
   * @constructor Character 
   * @constructs {object} Contains attributes of single game character.
   * @param {string} strShortName - Shortened name of game character.
   * @param {string} strFullName - Complete name of game character which includes blank spaces.
   * @param {number} nHealthPts - Number of points available which keep game character alive.
   * @param {number} nAttPow - Number of attack power points allocated to chosen game character to attack a defender.
   * @param {number} nCAttPow - Number of counter attack points allocated to defender game character to counter attack a chosen character. 
  */
  function Character(strShortName, strFullName, nHealthPts, 
                     nAttPow, nCAttPow) {
    this.strShortName = strShortName;
    this.strFullName  = strFullName;
    this.nHealthPts   = nHealthPts;
    this.nAttPow      = nAttPow;
    this.nCAttPow     = nCAttPow;
    this.nAttacks     = 0; /* Running total of chosen character attacks to use as a multiplier for attack power points. */
  }

  /** 
   * @method find
   * @description Searches and returns Character object based on data found in the given HTML element (representing a game character).
   * @param {HTML element} searchElement - Game character element used for search.
   * @returns {Character} Character object matching search criteria. Returns undefined if no object is found.
  */
  this.find = function (searchElement) {
    var strShortName = searchElement.attr("id");

    for (let i = 0; i < this.arrCharacters.length; i++) {
      if (strShortName === this.arrCharacters[i].strShortName) {
        return this.arrCharacters[i];
      }
    }

    return undefined;
  }

  /** 
   * @this Characters.arrCharacters
   * @description Array containing single Character objects created asynchronously.
   * @returns {array} Array of new constructed Character objects.
  */
  this.arrCharacters = (function () {
    return [new Character("obi", "Obi Wan Kenobi", 120, 8, 5),
            new Character("luke", "Luke Skywalker", 100, 5, 5),
            new Character("darth", "Darth Vader", 150, 5, 20),
            new Character("leia", "Princess Leia", 180, 5, 25)];
  })();

  /** 
   * @this Characters.objChosen
   * @description Character object designated as chosen.
  */
  this.objChosen   = undefined;

  /** 
   * @this Characters.objDefender
   * @description Character object designated as defender.
  */
  this.objDefender = undefined;
}
