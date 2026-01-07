import mongoose from "mongoose"

export interface User {
    id?: string,
    name: string,
    email: string,
    hashedPassword?: string
}