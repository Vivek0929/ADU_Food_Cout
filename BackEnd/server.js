import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello, WellCome to ADU Food Court');
});

app.get('/test', (req, res) => {
    res.send('This is  for testing');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});