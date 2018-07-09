import * as Alexa from "ask-sdk";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";

export class LaunchHandler implements Alexa.RequestHandler {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  }

  handle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.responseBuilder
        .speak("What is the name of the restaurant you want review for?")
        // .addElicitSlotDirective("name","SearchIntent")
        .withShouldEndSession(false)
        .getResponse()
    );
  }
}
