import {useParams, Link, useNavigate } from "react-router-dom";
import type { Menu } from "./Menu";

type Props = {
    menus : Menu[]
}

export const Detail =({menus} : Props) => {

    const navigate = useNavigate()
    const handleCategory = (category:string) =>{
        navigate(`/Category/${category}`)
    }

    const { id } = useParams<{id : string}>();
    const menu = menus.find((m) => m.id === id)



    if(!menu) {
        return(
            <div>
                <h2>データが見つかりません。</h2>
                <Link to= "/">ホーム</Link>
            </div>
        )
    }

    return(
        <div>
            <p>日付</p>
            <p>{menu.date}</p>
            <p>カテゴリ</p>
            <p onClick={() => handleCategory(menu.category)}>{menu.category}</p>
            <p>献立写真</p>
            {menu.photo && (<img src={menu.photo} className="base" width="170" height="179" alt="" />)}
            <p>献立</p>
            <p>{menu.text}</p>
            <p>メイン料理</p>
            <p>{menu.main}</p>
            <Link to= "/">ホーム</Link>
        </div>
    )
}