import { supabase } from './supabase'
import type { Menu, Input } from '../type/Menu'


{/**idに一致するデータを取得 */}
export const getMenuById = async ( id: string) : Promise<Menu | null> => {
    const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('id', id)
        .single()

        if(error)throw error
        return data
    }

{/**すべてのデータを取得 */}
export const getMenus = async () : Promise<Menu[]> => {
    const {data, error} = await supabase
        .from('menus')
        .select('*')

        if(error)throw error
        return data
}

{/**データを新規登録する */}
export const insertMenu = async (input: Input) : Promise<Menu> => {
    const {data, error} = await supabase
        .from('menus')
        .insert([input])
        .select()
        .single()

        if(error) throw error
        return data
}

{/**データを更新する */}
export const updateMenu = async (input: Input, id: string) : Promise<Menu> => {
    const { data, error } = await supabase
        .from('menus')
        .update([input])
        .eq('id', id)
        .select()
        .single()

        if(error) throw error
        return data
}

{/**データを削除する */}
export const deleteMenu = async(id: string) => {
    const { data, error } = await supabase
        .from('menus')
        .delete()
        .eq('id', id)

        if(error) throw error
        return data
}

{/**カテゴリーごとにデータを取得 */}
export const getCategoryMenu = async ( category: string, startDate: string, endDate: string) : Promise<Menu[]> => {
    const { data, error } = await supabase 
        .from('menus')
        .select('*')
        .eq('category', category)
        .gte('date', startDate)
        .lt('date', endDate)
        .order('date', { ascending: false })

        if(error) throw error
        return data
}