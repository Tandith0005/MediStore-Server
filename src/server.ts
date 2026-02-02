

import app from './app';
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 5000;

// Only for local development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Local server running on http://localhost:${port}`);
  });
}


export default app;


app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Database unreachable' });
  }
});