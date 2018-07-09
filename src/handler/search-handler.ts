import * as Alexa from "ask-sdk";
import { IntentRequest } from "ask-sdk-model";
import { SpeechMatch } from "speechmatch";

export class SearchHandler implements Alexa.RequestHandler {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "SearchIntent"
    );
  }
  async handle(handlerInput: Alexa.HandlerInput) {
    const request = handlerInput.requestEnvelope.request as IntentRequest;
    const restaurantName = request.intent.slots.Name.value;
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
}
