import app from "./index";

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=> console.log(`Gateway is running http://localhost:${PORT}`));