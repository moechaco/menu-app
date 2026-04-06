import {Routes, Route} from "react-router-dom";
import {Home} from "./Home.tsx"
import {Detail} from './Detail.tsx'
import {NewForm} from './NewForm.tsx'
import {List} from './List.tsx'
import {Category} from "./Category.tsx";
import type { Menu } from "./Menu.tsx";


{/**propsで渡す二つの引数として、menusがMenu[]のデータを、setMenusはMenu[]のstateを更新する関数であることを定義している。 */}
type Props = {
  menus : Menu[]
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

export const AppRoutes = ({menus, setMenus} : Props) => {
    return(
        <Routes>
            {/*ホーム画面*/}
            <Route path= "/" element = 
              {<Home />} />

            {/*詳細画面*/}
            <Route path= "/Detail/:id" element = 
              {<Detail menus={menus} />} />

            {/*新規登録画面*/}
            <Route path= "/New" element = {
              <NewForm setMenus={setMenus} />} />

            {/*一覧表示 */}
            <Route path = "/List" element = {
              <List menus ={menus} />} />
            
            {/**カテゴリ分け一覧 */}
            <Route path = "/Category/:category" element = {
              <Category menus ={menus} />} />
         </Routes>
    )
}