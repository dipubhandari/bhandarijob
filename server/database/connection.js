import mongoose from "mongoose"


const connection = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: 'BhandariJobs',
        }
        mongoose.set('strictQuery', true);
        const connected = await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        if (connected) {
            console.log('Database connected')
        }
        else {
            console.log('')
        }
    } catch (error) {
        console.log(error)
    }
}

export default connection