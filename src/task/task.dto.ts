import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TaskDataObject {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}