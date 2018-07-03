import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-west-2" });
const kms = new AWS.KMS();

export class KMSDecrypter {
  decryptedText: string;
  decryptOp: Promise<string>;
  constructor(cipherText: string) {
    this.decryptOp = kms
      .decrypt({ CiphertextBlob: new Buffer(cipherText, "base64") })
      .promise()
      .then(
        data => {
          this.decryptedText = data.Plaintext.toString();
          return this.decryptedText;
        },
        err => {
          console.log("Decrypt error:", err);
          return err;
        }
      );
  }

  plainText(): Promise<string> {
    if (this.decryptedText) {
      return Promise.resolve(this.decryptedText);
    } else {
      return this.decryptOp;
    }
  }
}
