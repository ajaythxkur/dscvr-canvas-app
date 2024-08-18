import { connectDB } from "@/database/connect";
import { TalentModel } from "@/database/talent.models";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


connectDB();

export async function GET(req: NextApiRequest) {
    try {
        let condition: any = {};
        // if (req.query.userId) {
        //     condition.userId = req.query.userId;
        // }
        const talents = await TalentModel.find(condition, "_id talent userId");
        return NextResponse.json({ data: talents })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { talent, userId } = await req.json();
        const userExists = await TalentModel.findOne({ userId });
        if (userExists) {
            throw new Error("User exists")
        }
        const newUser = new TalentModel();
        newUser.userId = userId;
        newUser.talent = talent;
        await newUser.save();
        return NextResponse.json({ message: "Ok" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}