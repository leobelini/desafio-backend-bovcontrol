const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV;

if (env === 'development') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });
} else if (env === 'test') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });
} else {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

console.log('Using env:', env);
