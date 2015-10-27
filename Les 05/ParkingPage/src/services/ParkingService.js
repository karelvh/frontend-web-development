//temporarily global variable
var parkingService = (function() {
   "use strict";

   //private

   //public api
   //publicly available: return as object
   return {
      get: function(){

         //$.getJson

         var xmlHttp = new XMLHttpRequest();
         //false => syncrone call
         //url.localUrl vervangen met url in productie
         xmlHttp.open("GET",config.localUrl, false);
         xmlHttp.send(null);

         if(xmlHttp.status === 200){
            var data = JSON.parse(xmlHttp.responseText);
            var parkings = [];

            for (var i = 0; i < data.Parkings.parkings.length; i++) {
               var o = data.Parkings.parkings[i];
               var newP = new Parking(
                  o.name,
                  o.description,
                  o.address,
                  o.availableCapacity,
                  o.totalCapacity
               );
               parkings.push(newP);
            }

            return parkings;
         }
         if(xmlHttp.status === 404){
            console.log("not found");
         }
      },
      getById: function(){}

   };
})();
