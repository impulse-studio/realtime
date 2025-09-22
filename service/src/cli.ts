#!/usr/bin/env node
import { Command } from 'commander';
import { startServer } from './server.js';

async function main() {
  const program = new Command();

  program
    .name('impulse-realtime')
    .description('Hostable SSE broker for realtime communication')
    .version('0.1.0')
    .option('-p, --port <number>', 'port to listen on', process.env.PORT)
    .option('-s, --secret <string>', 'secret for authentication', process.env.REALTIME_SECRET)
    .parse();

  const options = program.opts();

  const port = options.port ? parseInt(options.port, 10) : 3200;
  const secret = options.secret;

  try {
    const server = await startServer({ port, secret });
    console.log(`🚀 Realtime service started on port ${server.port}`);

    if (secret) {
      console.log('🔐 Authentication enabled');
    } else {
      console.log('⚠️  Running without authentication');
    }

    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down...');
      await server.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Shutting down...');
      await server.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});