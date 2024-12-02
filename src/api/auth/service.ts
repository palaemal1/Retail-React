import type { LoginType } from './types'
import axi from "@/config/axios";

const baseUrl = '/User'

const login = async (credentials: LoginType) => {
    const request = await axi.post(`${baseUrl}/Login`, credentials)
    return request.data
}

export default { login }
