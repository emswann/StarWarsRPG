/**
 * @file Defines Character and Characters object for executing Star Wars RPG game.
 * @author Elaina Swann
 * @version 1.0 
*/

/**
 * @class Character
 * @classdesc Character class object containing attributes of a single game character.
*/
class Character {
  /** 
   * @constructor Character 
   * @constructs {object} Contains attributes of single game character.
   * @property {string} strShortName - Shortened name of game character.
   * @property {string} strFullName - Complete name of game character which includes blank spaces.
   * @property {number} nHealthPts - Number of points available which keep game character alive.
   * @property {number} nAttPow - Number of attack power points allocated to chosen game character to attack a defender.
   * @property {number} nCAttPow - Number of counter attack points allocated to defender game character to counter attack a chosen character. 
   * @property {number} nAttacks - Runnint total of chosen character attacks used as attack power points multiplier.
  */
  constructor(strShortName, strFullName, nHealthPts, nAttPow, nCAttPow) {
    this.strShortName = strShortName;
    this.strFullName  = strFullName;
    this.nHealthPts   = nHealthPts;
    this.nAttPow      = nAttPow;
    this.nCAttPow     = nCAttPow;
    this.nAttacks     = 0;
  }
}

/**
 * @class Characters
 * @classdesc Characters class object containing a Character array along with designated chosen and defender Character objects.
*/
class Characters {
  /** 
   * @constructor Characters
   * @constructs {object} Contains a Character array along with designated chosen and defender Character objects.
   * @property {array} arrCharacters - Array of Character objects.
   * @property {object} objChosen - Character object designated as chosen. Undefined if the chosen object has not yet been assigned.
   * @property {object} objDefender - Character object designated as defender. Undefined if the defender object has not yet been assigned.
  */
  constructor() {
    this.arrCharacters = (() =>
      [new Character("obi", "Obi Wan Kenobi", 120, 8, 10),
       new Character("luke", "Luke Skywalker", 100, 15, 5),
       new Character("darth", "Darth Vader", 150, 4, 20),
       new Character("leia", "Princess Leia", 180, 3, 25)]
    )();

    this.objChosen   = undefined;
    this.objDefender = undefined;
  }

  /** 
    * @method chosen
    * @description Getter function for this.objChosen. 
    * @returns {object} Character object designated as chosen or undefined if chosen object has not yet been assigned.
  */
  get chosen() {
    return this.objChosen;
  }

  /** 
    * @method defender
    * @description Getter function for this.objDefender. 
    * @returns {object} Character object designated as defender or undefined if defender object has not yet been assigned.
  */
  get defender() {
    return this.objDefender;
  }

  /** 
    * @method assign
    * @description Assigns game character as chosen or defender based on parameter. Also, returns game character to test if assigned.
    * @param {string} strShortName - Short name of game character used for search.
    * @returns {object} Character object matching search criteria or undefined if no object is found.
  */
  assign(strType, strShortName) {
    let objCharacter = this.find(strShortName);
    strType === "defender" ? 
      this.objDefender = objCharacter : this.objChosen = objCharacter;
    return objCharacter;
  }

  /** 
    * @method array
    * @description Getter function for this.arrCharacters. 
    * @returns {array} Characters array.
  */
  get array() {
    return this.arrCharacters;
  }

  /** 
    * @method find
    * @description Searches and returns Character object based on parameter.
    * @param {string} strShortName - Short name of game character used for search.
    * @returns {object} Character object matching search criteria or undefined if no object is found.
  */
  find(strShortName) {
    return this.arrCharacters.find(
             character => character.strShortName === strShortName);
  }
}
