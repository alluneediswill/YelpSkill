import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-west-2" });
const kms = new AWS.KMS();

export class KMSDecrypter {
  decryptedText: Promise<string>;
  constructor(cipherText: string) {
    this.decryptedText = kms
      .decrypt({ CiphertextBlob: new Buffer(cipherText, "base64") })
      .promise()
      .then(
        data => {
          return data.Plaintext.toString();
        },
        err => {
          console.log("Decrypt error:", err);
          return err;
        }
      );
  }

  text(): Promise<string> {
    return this.decryptedText;
  }
}
