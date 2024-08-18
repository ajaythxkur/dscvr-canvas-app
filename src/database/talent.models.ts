import { model, Schema, models } from "mongoose";

interface TalentSchema {
    talent: string 
    userId: string 
}

const talentSchema = new Schema<TalentSchema>({
    talent: {
        type: String,
        required: [true, "Talent content required"]
    },
    userId: {
        type: String,
        required: [true, "Dscvr user id required"],
        unique: true
    }
}, {
    timestamps: true
});

export const TalentModel = models.Talent || model<TalentSchema>("Talent", talentSchema);