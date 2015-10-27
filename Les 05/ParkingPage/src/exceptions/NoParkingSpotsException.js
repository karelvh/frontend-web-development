function NoParkingSpotsException(message) {
   this.name = "NoParkingSpotsException",
   this.message = message,
   this.stack = (new Error().stack);
}

//starting from IE 9
NoParkingSpotsException.prototype = Object.create(Error.prototype);
NoParkingSpotsException.prototype.constructor = NoParkingSpotsException;
