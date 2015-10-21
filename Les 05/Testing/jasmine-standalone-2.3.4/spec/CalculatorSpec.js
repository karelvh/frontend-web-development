var customMatchers = {
   toBeBetween: function () {
      return function(actual, min, max){
         return{
            pass: actual > min && actual < max
         };
      };
   }
};

beforeEach(function () {
   jasmine.addMatchers(customMatchers);
});

//test suite
describe("Calculator Tests", function () {
   describe("Calculator object tests", function () {

      var calc = null;
      beforeEach(function () {
         calc = new Calculator(addModule);
      });

      it("calc object should exist", function () {
         //AAA, SEE (jasmine)
         // SETUP, EXECUTE, EXPECTATIONS
         //var calc = new Calculator();
         // EXE ---> niet nodig
         //Expected
         expect(calc).toBeDefined();
      });

      it("calculator should have implemented the addModule",function () {
         //var calc = new Calculator(addModule);
         expect(calc.addModule).toBeDefined();
      });
   });

   describe("Add module tests",function () {
      it("add module should exist", function () {
         expect(addModule).toBeDefined();
      });

      it("add module should contain an exe method", function () {
         expect(addModule.exe).toBeDefined();
      });

      it("should be able to add 3 + 4 ", function () {
         //exe
         var result;

         //EXE
         result = addModule.exe(3,4);

         //EXP
         expect(result).toBe(7);
      });
   });

   describe("devide module test", function () {
      it("should be able to devide 8, 3",function () {
         var result;
         result = divideModule.exe(8,3);
         expect(result).toBeGreaterThan(2);
         expect(result).toBeLessThan(4);
      });
   });
});
