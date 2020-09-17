const express = require('express');
const app = express();
app.use('/', express.static('./build'));
app.listen(5050, () => {
  console.log('visit http://localhost:5050');
});
