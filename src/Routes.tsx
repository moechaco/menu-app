import {Routes, Route} from "react-router-dom";
import {Home} from "./Home.tsx"
import { Detail } from './Detail.tsx'
import { NewForm } from './NewForm.tsx'
import { List } from './List.tsx'
import cookingImg from './assets/cooking.png'
import menuImg from './assets/menu.jpg'

type Menu = {
  date : string,
  category : string,
  photo : string,
  text : string,
  main : string
}

type Props = {
  menus : Menu[]
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

export const AppRoutes = ({menus, setMenus} : Props) => {
    return(
        <Routes>
            {/*ホーム画面*/}
            <Route path= "/" element = {
              <Home>
                <img src={cookingImg} className="base" width="170" height="179" alt="" /> 
              </ Home>} />

            {/*詳細画面*/}
            <Route path= "/Detail" element = {
              <Detail menus={menus}>
                <img src={menuImg} className="base" width="170" height="179" alt="" />
              </Detail>} />

            {/*新規登録画面*/}
            <Route path= "/New" element = {
              <NewForm setMenus={setMenus} />} />
  

            {/*一覧表示 */}
            <Route path = "/List" element = {
              <List menus ={menus} />} />
         </Routes>
    )
}