/*
 *  @description Herhaling: forms en validatie
 *  @author <a href="mailto:misterWeb@howest.be">Mister Web</a>
 *  @version 201509 v0.0 
 *  @ignore Dit is een notatie volgens JSDOC standaard op http://usejsdoc.org/
 */


//0. VARIABELEN : Maak zo weinig mogelijk globale variabelen
//var body = document.getElementsByName('body')[0], btn, vn , fn, em;

var frm;
window.addEventListener("DOMContentLoaded", function () { init() });  //ipv onload()

//1. INITIALISATIES --------------------------------------------------------------------------------
var init = function () {
    //1.0 DOM elements
    frm = document.getElementsByTagName("form")[0];
    //voeg inputs toe als form property => minder globale variabelen
    frm.btn = document.getElementById('submitButton');;
    frm.vn = document.getElementById('voornaam');
    frm.fn = document.getElementById('familienaam');
    frm.em = document.getElementById('email');

    //1.1 eventlisteners
    //vermijd herhalingen -> Array gebruiken met alle elementen 
    // vn.addEventListener("focus", showFocus(this));

    var arrElements = new Array(frm.vn, frm.fn, frm.em)
    for (var element in arrElements) {
        arrElements[element].addEventListener("focus", function () { showFocus(element) });
    }

    frm.btn.addEventListener("click", function (event) { return validate(event) });//VERGEET DE RETURN NIET -> submit werking
    //action stub (= geen werkelijke verzending, wel een bevestiging):
    frm.action = "javascript:alert('verzonden');window.location = this.location";
}

//2. METHODES -----------------------------------------------------------------------------------------
//functie als variabele aanmaken (maakt op termijn refactoring gemakkelijker) 


var validate = function (event) {
    //feature detectie (GEEN BROWSER DETECTIE!) -> submit stilleggen Xbrowser
    if (event.preventDefault) { event.preventDefault() } else { event.returnValue = false; }

    //var isValidForm = false;

    //validaties
    var arrElements = new Array(frm.vn, frm.fn, frm.em)
    for (element in arrElements) {
        //element is een index!!!
        arrElements[element].valid = isRequiredField(arrElements[element])
    }

    /* TO DO :  uitwerken isValidEmail() met een RegExp() */


    //zelf de verzending doen want  is killed door event.preventDefault()
    if (frm.vn.valid && frm.fn.valid && frm.em.valid) { frm.submit() };
    //return isValidForm;
};

var showFocus = function (element) {
    //geen element.style gebruiken -> alle opmaak in CSS (eenvoud  om andere layout te maken)
    element.className = 'focused';
}

//leesbaarheid : start Booleaanse variabelen met "is"
var isRequiredField = function (element) {
    if (element) {
        if (element.value == '') {
            element.className = 'error';
            return false
        }
        else {
            element.className = 'valid';
            return true
        };
    }
}