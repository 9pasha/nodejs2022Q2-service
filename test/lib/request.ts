import * as request from 'supertest';
import 'dotenv/config';

const port = process.env.API_PORT || 4000;
// For localhost
const host = `localhost:${port}`;
// For docker container
// const host = `nest_api:${port}`;
const _request = request(host);

export default _request;
