import * as Alexa from "ask-sdk";

export class CancelStopHandler implements Alexa.RequestHandler {
    canHandle(handlerInput: Alexa.HandlerInput) {
        return (
          handlerInput.requestEnvelope.request.type === "IntentRequest" &&
          (handlerInput.requestEnvelope.request.intent.name ===
            "AMAZON.CancelIntent" ||
            handlerInput.requestEnvelope.request.intent.name ===
              "AMAZON.StopIntent")
        );
      }
      handle(handlerInput: Alexa.HandlerInput) {
        const speechText = "Cancelling, goodbye!";
    
        return handlerInput.responseBuilder.speak(speechText).getResponse();
      }
}