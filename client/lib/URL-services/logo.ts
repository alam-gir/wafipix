import { request } from "../axios"

export const getLogo = async() => {
    return await request({
        url: "/logo",
        method: "GET"
    })
}

export const getLogoKey = ["logo"]

export type TLogo = {
    url: string
    public_id: string
}

// ___________________mutate_____________________

export const uploadLogo = async(formData: FormData) => {
    return await request({
        url: "/logo",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: formData,
        withCredentials: true,
    })
}