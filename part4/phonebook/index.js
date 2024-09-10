const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  `Server is listening to port: ${config.PORT}`
})