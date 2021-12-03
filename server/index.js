const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
