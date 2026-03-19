import cookingImg from './assets/cooking.png'
import menuImg from './assets/menu.jpg'
import './App.css'
import {Home} from './Home.tsx'
import { Detail } from './Detail.tsx'
import { NewForm } from './NewForm.tsx'

function App() {
  return (
    <>
        {/*ホーム画面*/}
        <div>
          <Home title="献立管理アプリ" newForm="新規登録" listForm="献立一覧">
          <img src={cookingImg} className="base" width="170" height="179" alt="" />
          </ Home>
        </div>

        {/*詳細画面*/}
        <div>
          <Detail time = "2026年3月18日（水）" main = "鶏の照り焼き炒め">
            <img src={menuImg} className="base" width="170" height="179" alt="" />
            <p>献立</p>
            <ul>
              <li>・ごはん</li>
              <li>・鶏の照り焼き炒め</li>
              <li>・キャベツとツナの味噌汁</li>
            </ul>
          </Detail>
        </div>

        {/*新規登録画面*/}
        <div>
          <NewForm />
        </div>

        {/*献立一覧*/}
        <div>

        </div>
       
    </>
  )
}

export default App
