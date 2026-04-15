import {Routes, Route} from 'react-router-dom';
import {Home} from './Home.tsx'
import {Detail} from './Detail.tsx'
import {Form} from './Form.tsx'
import {List} from './List.tsx'
import {Category} from './Category.tsx';

{/**各画面へのルーティングを管理 */}
export const AppRoutes = () => {
    return(
        <Routes>
            {/**ホーム画面*/}
            <Route path= '/' element = 
              {<Home />} />

            {/**詳細画面*/}
            <Route path= '/Detail/:id' element = 
              {<Detail />} />

            {/**新規登録画面*/}
            <Route path= '/New' element = {
              <Form mode = 'create'/>} />
            
            {/**編集画面 */}
            <Route path = '/Edit/:id' element = {
              <Form mode = 'edit'/>} />

            {/**一覧表示 */}
            <Route path = '/List' element = {
              <List />} />
            
            {/**カテゴリ分け一覧 */}
            <Route path = '/Category/:category' element = {
              <Category />} />
         </Routes>
    )
}