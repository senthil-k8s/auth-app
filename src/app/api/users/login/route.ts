import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const{ email, password} = reqBody;
        console.log(reqBody);
        
        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error : "User does not exists", status:500})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword)        {
            return NextResponse.json({error : "Invalid Password"}, {status: 400})
        }

        // create token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : "1d"})

        // cookies
        const response = NextResponse.json({
            message: "Login Successfully",
            success: true
        })

        response.cookies.set("token", token, {httpOnly: true})
        
        return response;        
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status:400})
    }    
}