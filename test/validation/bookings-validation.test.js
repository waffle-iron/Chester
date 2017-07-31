const ajv = require('ajv')({ allErrors: true, $data: true });
require('ajv-keywords')(ajv, 'select');

const testSchema = require('./tests/bookings.test.json');
const validationSchema = require('../../src/schemas/bookings.validation.json');

let validator = ajv.compile(validationSchema);
let validation = validator(testSchema);

if (!validation) console.error(validator.errors);
