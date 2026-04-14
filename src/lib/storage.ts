import { supabase } from "./supabase"
    
    
{/**画像をアップロードする */}
export const uploadFiles = async (file: File): Promise<string> => {

    const filePath = `${Date.now()}/${file.name}`

    const { error } = await supabase.storage
        .from('menus')
        .upload(filePath, file)

    if(error) throw error

    const { data } = supabase.storage
        .from('menus')
        .getPublicUrl(filePath)

    return data.publicUrl
}