import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res) {

    //서버 기능 안에선 req, res도 같이 있어야됨.
    let session = await getServerSession(req, res, authOptions)
    //console.log(session)
    // if ( session ) {
    //     req.body.author = session.user.email
    // }

    //console.log(session)

    const db = (await connectDB).db("forum")
    
    //console.log('request :::: ' + JSON.stringify(저장할거))
    

    if (req.method == 'GET') {
        let result = db.collection('comment').find({ parent_id: new ObjectId(req.body.parent_id) }).toArray()
        console.log('result ::: ' + req.parent_id)
        return result
    }

    if (req.method == 'POST') {        

        req.body = JSON.parse(req.body)
        let 저장할거 = {
            content: req.body.content,
            parent_id: new ObjectId(req.body.parent_id),
            author: session.user.email
        }
        try {
        
        let result = db.collection('comment').insertOne(저장할거)
        console.log('finish')
        
        return res.status(200).json('저장 완료')
        } catch(error) {          
            return res.status(500).json(error)
        }
    }    
}