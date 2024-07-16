import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, required: true })
    loginUuid: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    first: string;

    @Prop({ type: String, required: true })
    last: string;

    @Prop({ type: String, required: true })
    gender: string;

    @Prop({ type: String, required: true })
    country: string;

    @Prop({ type: String, required: true })
    phone: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: Object, required: true })
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };

    @Prop({ type: Number, required: true })
    age: number;

    @Prop({ type: String, required: true })
    dob: string;

    @Prop({ type: String, required: true })
    street: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    state: string;
}

export const UserSchema = SchemaFactory.createForClass(User);