import patch from 'path'
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: patch.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: patch.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
}
