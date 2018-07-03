import * as Alexa from "ask-sdk";
import { SpeechMatch } from "speechmatch";
import { Client } from "pg";
import { KMSDecrypter } from "./KMSDecrypter";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";
const dbClient = new Client();

const dbUserDecrypter = new KMSDecrypter(process.env["db_user"]);
const dbPasswordDecrypter = new KMSDecrypter(process.env["db_pw"]);
const dbHostDecrypter = new KMSDecrypter(process.env["db_host"]);

const LaunchRequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: Alexa.HandlerInput) {
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
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "SearchIntent"
    );
  },
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
    // await client.connect();
    // const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    // console.log(res.rows[0].message); // Hello world!
    // await client.end();

    return handlerInput.responseBuilder
      .speak("looking for " + restaurantName + " in " + postalCode)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speechText =
      "Help content: this skill find and tell you the yelp review of a restaurant. ";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const speechText = "Cancelling, goodbye!";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput: Alexa.HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: Alexa.HandlerInput) {
    const request = handlerInput.requestEnvelope.request as SessionEndedRequest;
    console.log(`Session ended with reason: ${request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput: Alexa.HandlerInput, error: Error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(
        "Please grant location access for the skill to search for nearby restaurants"
      )
      .getResponse();
  }
};

export let handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    SearchIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

