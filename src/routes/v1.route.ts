import express from 'express';
import { getPropertiesController } from '../controllers/listing.controller';

const v1Router = express.Router();

v1Router.post('/listings/pixxi', getPropertiesController);

export default v1Router;
