const Alexa = require("ask-sdk");
const speechMatch = require("speechmatch");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    return (
      handlerInput.responseBuilder
        .speak("What is the name of the restaurant you want review for?")
        // .addElicitSlotDirective("name","SearchIntent")
        .withShouldEndSession(false)
        .getResponse()
    );
  }
};

const SearchIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "SearchIntent"
    );
  },
  async handle(handlerInput) {
    const restaurantName =
      handlerInput.requestEnvelope.request.intent.slots.Name.value;
    const { requestEnvelope, serviceClientFactory } = handlerInput;
    const { deviceId } = requestEnvelope.context.System.device;
    const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
    const {
      countryCode,
      postalCode
    } = await deviceAddressServiceClient.getCountryAndPostalCode(deviceId);
    return handlerInput.responseBuilder
      .speak("looking for " + restaurantName + " in " + postalCode)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText =
      "Help content: this skill find and tell you the yelp review of a restaurant. ";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Cancelling, goodbye!";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${
        handlerInput.requestEnvelope.request.reason
      }`
    );

    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(
        "Please grant location access for the skill to search for nearby restaurants"
      )
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    SearchIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

// exports.handler(require("./test.json"), {succeed:console.log, fail:console.log},console.log);
