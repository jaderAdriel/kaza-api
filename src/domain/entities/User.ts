import mongoose from "mongoose"

export interface User {
    id: string | null,
    name: string,
    email: string,
    hashedPassword?: string
}