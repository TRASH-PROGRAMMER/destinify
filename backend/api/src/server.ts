import app from "./main"; 
// configuracion del puerto
const port = process.env.PORT || 3001;
// inicio del servidor
console.log("Starting server...");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:${port}`);
});