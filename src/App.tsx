import { useState } from 'react';
import { AppRoutes } from './Routes.tsx'

type Menu = {
  date : string,
  category : string,
  photo : string,
  text : string,
  main : string
};

export const App = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  return(
    <>
    <AppRoutes menus={menus} setMenus={setMenus}/>
    </>
  )
    
}

