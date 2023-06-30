import app from "./src/app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
})

// app.listen(3001, () => {
//     console.log(`Servidor escutando em http://localhost:3001`);
// })