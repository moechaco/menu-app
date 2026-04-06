import { Link } from "react-router-dom"
import cookingImg from './assets/cooking.png'

export const Home = () => {

    return (
    <div>
        <h1>献立管理アプリ</h1>
        <img src={cookingImg} className="base" width="170" height="179" alt="" /> 
        <Link to= "/New">新規献立</Link>
        <Link to= "/List">献立一覧</Link>
    </div>
    )
}