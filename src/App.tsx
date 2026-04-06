import { useEffect, useState } from 'react';
import { AppRoutes } from './Routes.tsx'
import type { Menu } from './Menu.tsx';
import { supabase } from './lib/supabase.ts';

export const App = () => {
  
  {/*menusというstateが、Menu[]型の配列を持つように指定している。([])は初期値が空の配列であることを定義している。 */}
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const featchData = async () =>{
      const {data} = await supabase.from("menus").select("*")
      if(data){setMenus(data)}
    }

    featchData()
  }, [])

  return(
    <>
    {/*AppRoutes関数に、menusのデータと、menusに更新を行える関数を引数として渡している */}
    <AppRoutes menus={menus} setMenus={setMenus}/>
    </>
  )
    
}

