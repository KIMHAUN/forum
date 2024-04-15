import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res) {

    //서버 기능 안에선 req, res도 같이 있어야됨.
    let session = await getServerSession(req, res, authOptions)
    console.log(session)
    if ( session ) {
        req.body.author = session.user.email
    }


    if (req.method == 'POST') {

        if (req.body.title == '' ) {
            return res.status(500).json('너 제목 왜 안 씀')
        } else if (req.body.content == '' ) {
            return res.status(500).json('너 내용 왜 안 씀')
        }
        
        try {

        
        const db = (await connectDB).db("forum")
        //let result = db.collection('post').find().toArray()
        //let result = db.collection('post').insertOne({title: req.body.title, content: req.body.content})
        console.log(req.body._id)
        
        let result = db.collection('post').updateOne({_id: ObjectId(req.body._id)}, {$set: {content: req.body.content, title: req.body.title}});

        console.log(result)
        //return res.status(200).json('수정 완료')
        return res.redirect(302, '/list')
        } catch(error) {

        }

    }
  
    
}