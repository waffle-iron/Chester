const Ajv = require('ajv');

const testSchema = require('./tests/resources.test.json');
const validationSchema = require('../../src/schemas/resources.validation.json');

let ajv = new Ajv({ allErrors: true, $data: true });
require('ajv-keywords')(ajv, 'select');

let validator = ajv.compile(validationSchema);
let validation = validator(testSchema);

if (!validation) console.error(validator.errors);
