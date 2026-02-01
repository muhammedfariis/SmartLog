import bcrypt from "bcrypt"

const salt = 10

export const passwordHash = async (password)=>{
    return await bcrypt.hash(password,10)
}

export const comparePassword = async (password , hash)=>{
    return await bcrypt.compare(password,hash)
}

