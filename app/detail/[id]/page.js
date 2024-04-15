import { connectDB } from "@/util/database"
import { ObjectId }from "mongodb"
import Comment from "./Comment"

export default async function Detail(props) {
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
    let comments = await db.collection('comment').find({ parent_id: new ObjectId(props.params.id) }).toArray()

    console.log('parent_id ::: ' + props.params.id)   
    console.log('comments :::' + comments)
    return (
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
           <Comment comments= {comments} parent_id = {result._id.toString()}/>
        </div>
    )
}