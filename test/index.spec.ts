process.env.db_user = "AQICAHiVLf62VSQeys4m+m8f7GxspQFe7OUuG1GIrIdC98HyQwH5k5xguqc/Pr4gqXPcv001AAAAYjBgBgkqhkiG9w0BBwagUzBRAgEAMEwGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMs1sEvL4zvJdMpKJWAgEQgB+Dj56H8a0gl73s8vnbxkZ16MTn6olxBE0U1ckcL9O3";
process.env.db_pw = "AQICAHiVLf62VSQeys4m+m8f7GxspQFe7OUuG1GIrIdC98HyQwG7ItLMrvgzZ6uqDzcDiu4wAAAAcjBwBgkqhkiG9w0BBwagYzBhAgEAMFwGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMW27Wu6BmucoIioM4AgEQgC/OUXEPZNOzKQkBq9ognYPcgORzrunQLkRpITc/FmXiV+Px8YLmjZaphC+ma00T0A==";
process.env.db_host = "AQICAHiVLf62VSQeys4m+m8f7GxspQFe7OUuG1GIrIdC98HyQwGC11BPspvjd3orea4zgtMkAAAAmjCBlwYJKoZIhvcNAQcGoIGJMIGGAgEAMIGABgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDNM09TsEkgajmnjBCQIBEIBTQotVjk85w39d8KiORZIxx7cKJJvuoiFmXM/2WusP7p5TasiO7ACLEap1kxr/ixSl0zwRqHPnCJFuvbx48ANBOsfXvd8HwBvcEZjEWKodaQ+Gt5w=";

import { handler } from "../src/index";
import { expect } from "chai";
import "mocha";

describe("Alexa handler", () => {
  it("should be able to handler searchIntent request", () => {
    handler(require("./searchIntent_test.json"), {succeed: console.log, fail: console.log}, console.log);
  });

});
