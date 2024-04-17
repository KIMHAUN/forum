import { connectDB } from "@/util/database"
import Link from 'next/link'
import ListItem from "./ListItem";


//export const dynamic = 'force-dynamic'
export const revalidate = 60;

export default async function List() {

  const db = (await connectDB).db("forum")
  let result = await db.collection('post').find().toArray()
  //console.log(result)

  //await fetch('/URL', {cache: 'force-cache'})

  let data = { }
    return (
        <div className="list-bg">
          <ListItem result={result}/>
      </div>
    )
}