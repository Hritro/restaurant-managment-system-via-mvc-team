const {connectDB , getDB} = require('./config/db');
const {app} = require('./app');
const PORT = process.env.PORT || 3001;

const server = async () => {
    await connectDB();
    
    app.listen(PORT, () =>{
    console.log(`Server is running at  ${PORT}`)
})
}

server()