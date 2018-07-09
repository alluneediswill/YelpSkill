import * as Alexa from "ask-sdk";

export class HelpHandler implements Alexa.RequestHandler {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  }
  handle(handlerInput: Alexa.HandlerInput) {
    const speechText =
      "Help content: this skill find and tell you the yelp review of a restaurant. ";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
}
