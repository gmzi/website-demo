import { NextRequest, NextResponse } from 'next/server'
import {v2 as cloudinary} from 'cloudinary'

const UPLOAD_IMAGE_URL = process.env.UPLOAD_IMAGE_URL

export async function POST(
  req,
  res
) {
    try {
        const formData = req.body

        return NextResponse.json({ message: 'Hello Everyone!' })
    } catch (e){
        console.log(e)
        return NextResponse.json({message: 'failed'})
    }
    
}