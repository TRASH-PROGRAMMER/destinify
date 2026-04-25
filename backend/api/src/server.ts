import app from "./main";
const port = process.env.PORT || 3001;
console.log("Starting server...");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:${port}`);
});