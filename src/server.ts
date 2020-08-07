import express from 'express'

const app = express()

app.get('/', (req, res) => {
  const users = [
    { name: 'Carlos Lima', age: 25 },
    { name: 'Felipe', age: 30 },
    { name: 'Diego', age: 25 }
  ]
  return res.json(users)
})

app.listen(5000)
