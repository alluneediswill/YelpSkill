import * as Alexa from "ask-sdk";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";

export class SessionEndedHandler implements Alexa.RequestHandler {
    canHandle(handlerInput: Alexa.HandlerInput) {
        return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
      }

      handle(handlerInput: Alexa.HandlerInput) {
        const request = handlerInput.requestEnvelope.request as SessionEndedRequest;
        console.log(`Session ended with reason: ${request.reason}`);
        return handlerInput.responseBuilder.getResponse();
      }
}