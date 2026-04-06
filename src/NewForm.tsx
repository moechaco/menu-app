import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Menu } from "./Menu";

{/**Menus[]を更新する関数 */}
type Props = {
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
};

export const NewForm = ({setMenus} : Props)  => {

{/**NewForm内の入力値を取得する。 */}
const [input, setInput] = useState({
    id : "",
    date : "",
    category : "和食",
    photo : "",
    text : "",
    main : ""
});

const navigate = useNavigate()

const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files){
        return;
    }

    const file = files[0]
    const imgUrl = URL.createObjectURL(file)
    setInput((prev) => ({...prev, photo: imgUrl}))
}

{/**inputに保存されたデータを、setMenus関数を用いて、menusのstateを更新する。
    登録後に、詳細画面に遷移し、menusのデータも持っていく。 */}
const handleRegister = () => {
    const newMenu = {
        ...input,
        id : crypto.randomUUID()
    }
    setMenus((prev) => [...prev, newMenu]);
    navigate(`/Detail/${newMenu.id}`)
};

    return(
        <div>
            <label>日付登録</label>
                <input type = "date" onChange={(e) => setInput({...input, date: e.target.value})} />
            <label>カテゴリ</label>
                <select onChange={(e) => setInput({...input, category: e.target.value})}>
                    <option value = "和食">和食</option>
                    <option value = "洋食">洋食</option>
                    <option value = "外食">外食</option>
                </select>
            <label>献立写真</label>
                <input type = "file"  accept= "image/*" onChange={handleFile} />
                    {input.photo && (<img src = {input.photo} alt = "" width= "150" />)}  
            <label>献立</label>
                <input type = "text" onChange={(e) => setInput({...input, text: e.target.value})} />
            <label>メイン料理</label>
                <input type = "text" onChange={(e) => setInput({...input, main: e.target.value})} />
            <button onClick={handleRegister}>登録</button >
            <Link to="/">ホーム</Link>
        </div>
    )
}