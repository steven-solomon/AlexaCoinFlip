describe('coinFlipper', function () {
  var coinFlipper = require('../src/coin_flip').coinFlipper;
  
  describe('number that results in 1', function () {
    var number = 0.5963679056310824;

    it('returns tails', function () {
      spyOn(Math, 'random').and.returnValue(number);

      var result = coinFlipper.flip();

      expect(result).toEqual("tails");
    });
  });

  describe('number that results in 0', function () {
    var number = 0.21889612238694278;

    it('returns heads', function () {
      spyOn(Math, 'random').and.returnValue(number);

      var result = coinFlipper.flip();

      expect(result).toEqual("heads");
    });
  });
});
