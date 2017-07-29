const Ajv = require('ajv');

const testSchema = require('./tests/users.test.json');
const validationSchema = require('../../src/schemas/users.validation.json');

let ajv = new Ajv({ allErrors: true, $data: true });
require('ajv-keywords')(ajv, 'select');

let validator = ajv.compile(validationSchema);
let validation = validator(testSchema);

if (!validation) console.error(validator.errors);
