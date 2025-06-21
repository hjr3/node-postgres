import { run, bench } from 'mitata'
import { Client } from 'pg'

const client = new Client()
await client.connect()

bench('binary format', async () => {
  const rowCount = 50000
  return client.query({
    text: `SELECT
      generate_series(1, $1) as id,
      (random() * 10000)::int as int_val,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' as text_val
      --,
      -- ARRAY[random(), random(), random()]::real[] as array_val`,
    values: [rowCount],
    binary: true,
  })
})

await run({
  format: 'mitata',
  colors: true,
  throw: true,
})

await client.end()
