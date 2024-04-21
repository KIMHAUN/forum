import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache";

//1. 페이지만들었음
export default async function Write2() {

    const db = (await connectDB).db('forum')
    let result = await db.collection('post_test').find().toArray()

    //3. 서버기능만들었음
    async function handleSubmit(formData) {
      'use server';
      console.log(formData)
      console.log(formData.get('title'))

      const db = (await connectDB).db('forum')
      db.collection('post_test').insertOne({title : formData.get('title')})
      revalidatePath('/write2')//차이점만 바꿔줌
    }
   
   
    //2.폼만들었음
    return (
        <div>
      <form action={handleSubmit}> 
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </form>
      {
        result ? result.map((a, i)=> <p>글제목 : {a.title}</p>) : null
      }
      </div>
    );
  } 