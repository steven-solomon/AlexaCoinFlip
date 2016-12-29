describe('Flip a coin', function() {
  var context = describe;
  var module = require('../src/coin_flip')
  var coin_flip = module.handler;

  context('no parameter passed', function() {
    it ('throws exception', function() {

      expect(function(){ coin_flip() }).toThrowError('No event passed.');
    });
  });

  context('one parameter passed', function() {
    it ('throws exception', function() {
      var event = {}

      expect(function(){ coin_flip(event) }).toThrowError('No context passed.');
    });
  });

  context('invalid request type', function() {
    it('fails context', function () {
      var invalidEvent = { request: { type: 'Invalid Request Type' }}
      var spyContext = jasmine.createSpyObj('context', ['fail']);

      coin_flip(invalidEvent, spyContext)

      expect(spyContext.fail).toHaveBeenCalledWith('Unknown Request Type: Invalid Request Type');
    });
  });

  context('LaunchRequest', function() {
    it('returns speechlet response', function() {
      var event = { request: { type: 'LaunchRequest' }}

      spyOn(module.coinFlipper, 'flip').and.returnValue("heads");

      var spyContext = jasmine.createSpyObj('context', ['succeed']);

      coin_flip(event, spyContext)

      var expectedResponse = {
        version: "1.0",
        sessionAttributes: {},
        response: {
          outputSpeech: {
            type: "PlainText",
            text: "heads"
          },
          shouldEndSession: true
        }
      };

      expect(spyContext.succeed).toHaveBeenCalledWith(expectedResponse);
    });
  });

  context('IntentRequest', function() {
    it('returns speechlet response', function() {
      var event = { request: { type: 'IntentRequest' }}

      spyOn(module.coinFlipper, 'flip').and.returnValue("tails");

      var spyContext = jasmine.createSpyObj('context', ['succeed']);

      coin_flip(event, spyContext)

      var expectedResponse = {
        version: "1.0",
        sessionAttributes: {},
        response: {
          outputSpeech: {
            type: "PlainText",
            text: "tails"
          },
          shouldEndSession: true
        }
      };

      expect(spyContext.succeed).toHaveBeenCalledWith(expectedResponse);
    });
  });

  context('SessionEndedRequest', function () {
    it('returns empyt response', function () {
      var event = { request: { type: 'SessionEndedRequest' }}
      var spyContext = jasmine.createSpyObj('context', ['succeed', 'fail']);

      coin_flip(event, spyContext)

      expect(spyContext.succeed).not.toHaveBeenCalled();
      expect(spyContext.fail).not.toHaveBeenCalled();
    });
  });
});
