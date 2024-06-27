import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default class Config {
    static load() {
        const envFile = process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev';
        dotenv.config({
            path: join(dirname(fileURLToPath(import.meta.url)), `../../${envFile}`),
        });
    }
}
