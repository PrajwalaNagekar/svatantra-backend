import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './src/db/index.js';
import UserRoutes from './src/routes/UserRoutes.js'
import adminRoutes from './src/routes/AdminRoutes.js'
dotenv.config();
import cors from 'cors';

const port = process.env.PORT

const app = express()

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("test route")
})

// Serve static files like PDF from the 'public' directory
// app.use('/public', express.static('public'));

// app.use('/admin', adminRoutes)
app.use('/api', UserRoutes)
app.use('/admin', adminRoutes)



const startServer = async () => {
    try {
        await connectToDb()
        app.listen(port, () => {
            console.log(`server running on ${port}`);
        })
    } catch (error) {
        console.log("MONGO db connection failed !!! ", err);
    }
}
startServer();