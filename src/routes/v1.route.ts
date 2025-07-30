import express from 'express';
import { getPropertiesController } from '../controllers/listing.controller';
import { getMapAreas, testMapEndpoint } from '../controllers/map.controller';

const v1Router = express.Router();

v1Router.post('/listings/pixxi', getPropertiesController);
v1Router.get('/map-areas', getMapAreas);
v1Router.get('/map-test', testMapEndpoint);

export default v1Router;
