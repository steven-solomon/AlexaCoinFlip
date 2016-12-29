module.exports.handler = function(event, context) {
  validateInput(event, context);

  execute(event.request.type,
    function success(message) {
      context.succeed(message);
    }, function failure(message) {
      context.fail(message);
    });
}

module.exports.coinFlipper = (function() {
  return { flip: function flipCoin() {
    var number = Math.floor(Math.random() * 2);
    if (number === 1) { return "tails"};
    return "heads";
  }};
})();

function execute(eventType, success, failure) {
  switch (eventType) {
    case 'LaunchRequest':
      var result = module.exports.coinFlipper.flip();
      success(successMessage(result));
      break;
    case 'IntentRequest':
      var result = module.exports.coinFlipper.flip();
      success(successMessage(result));
      break;
    case 'SessionEndedRequest':
      break;
    default:
      failure('Unknown Request Type: ' + eventType);
  }
}

function validateInput(event, context) {
  if (event == null) {
      throw new Error('No event passed.');
  }
  if (context == null) {
    throw new Error('No context passed.');
  }
}

function successMessage(text) {
  return {
    version: "1.0",
    sessionAttributes: {},
    response: {
      outputSpeech: {
        type: "PlainText",
        text: text
      },
      shouldEndSession: true
    }
  };
}
