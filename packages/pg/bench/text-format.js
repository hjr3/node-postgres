const { run, bench } = require('mitata')
const helper = require('../test-helper')

bench('text format', async () => {
  const client = new helper.pg.Client()
  await client.connect()
  await client.query({ text: `SELECT * FROM information_schema.tables LIMIT 100` })
})

run({
  format: 'mitata',
  colors: true,
  throw: true,
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
