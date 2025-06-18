import app from "./index";

const PORT = parseInt(process.env.PORT || '5050', 10);
// const IP = "192.168.1.140";

app.listen(PORT, ()=> console.log(`Gateway is running http://localhost:${PORT}`));