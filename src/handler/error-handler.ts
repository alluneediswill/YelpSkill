import * as Alexa from "ask-sdk";

export class ErrorHandler implements Alexa.ErrorHandler {
    canHandle() {
        return true;
    }

      handle(handlerInput: Alexa.HandlerInput, error: Error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
          .speak(
            "Please grant location access for the skill to search for nearby restaurants"
          )
          .getResponse();
      }
}