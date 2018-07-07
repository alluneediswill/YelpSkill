import * as Alexa from "ask-sdk";

import { SessionEndedHandler } from "./handler/session-end-handler";
import { ErrorHandler } from "./handler/error-handler";
import { LaunchHandler } from "./handler/launch-handler";
import { SearchHandler } from "./handler/search-handler";
import { HelpHandler } from "./handler/help-handler";
import { CancelStopHandler } from "./handler/cancel-stop-handler";


export let handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    new LaunchHandler(),
    new SearchHandler(),
    new HelpHandler(),
    new CancelStopHandler(),
    new SessionEndedHandler()
  )
  .addErrorHandlers(new ErrorHandler())
  .lambda();

