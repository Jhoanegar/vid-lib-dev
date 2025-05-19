import express from 'express';

import { libraryRouter } from './library/index.mts';

const app = express();
app.use('/libraries', libraryRouter);

export default app;
