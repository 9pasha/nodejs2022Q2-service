import * as request from 'supertest';
import 'dotenv/config';

const port = process.env.PORT || 4000;

const host = `nest_api:${port}`;
const _request = request(host);

export default _request;
