import dotenv from "dotenv";

export default class Config {
  static #env = process.env.NODE_ENV;
  static jwtSecret;
  static encryptionKey;

  static load = () => {
    dotenv.config({
      path: `.env${Config.#env !== "prod" ? `.${Config.#env}` : " "}`,
    });

    this.jwtSecret = process.env.JWT_SECRET || 'meep';
    this.encryptionKey = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'; // Make sure this is a valid 32-byte hex key
  };
}
