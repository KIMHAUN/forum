import { connectDB } from "@/util/database"
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    if (req.method == 'POST') {

        let hash = await bcrypt.hash(req.body.password, 10)
        //console.log(hash)
        req.body.password = hash
        console.log(req.body)

        if (req.body.name == '' ) {
            return res.status(500).json('너 id 왜 안 씀')
        } else if (req.body.password == '' ) {
            return res.status(500).json('너 pwd 왜 안 씀')
        }
        
        try {
        const db = (await connectDB).db("forum")
        let result = db.collection('users_cred').insertOne(req.body)

        //return res.status(200).json()
        return res.redirect(302, '/')
        } catch(error) {

        }

    }
  
    
}