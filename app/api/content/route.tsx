import { NextResponse } from 'next/server';
import { isNamespaceExportDeclaration } from 'typescript';

const DATA_API_KEY = process.env.DATA_API_KEY

export async function GET(){
    try{ 
        return NextResponse.json({ message: "hello, how you doing?" });

    } catch (e){
        console.log(e)
        return NextResponse.json({message: "error"})
    }
}


export async function POST(req:Request, res: Response) {
    // AUTHENTICATION:
    // TODO implement getServerSession() as auth method, and get rid of api keys,
    // follow this example: /Users/x4/projects/website-taxonomy/app/api/posts/route.ts
    const key = req.headers.get('API-Key')
    if (key !== DATA_API_KEY){
        return NextResponse.json({message: 'unauthorized'}, {status: 401})
    }

    const data = req.body

    console.log('this is the data:', data)

    // DB request:
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'API-Key': "123",
    }

    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify({ time: new Date().toISOString() }),
    // });
  
    // const data = await res.json();
  
    return NextResponse.json({message: 'hello'});
}