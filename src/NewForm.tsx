import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Menu = {
  date : string,
  category : string,
  photo : string,
  text : string,
  main : string
}

type Props = {
  setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
};

export const NewForm = ({setMenus} : Props)  => {

const [input, setInput] = useState({
    date : "",
    category : "和食",
    photo : "",
    text : "",
    main : ""
})

const navigate = useNavigate()

const handleRegister = () => {
    setMenus((prev) => [...prev, input]);
    navigate("/List")
};
const handleHome = () => {
    navigate("/")

    }
    return(
        <div>
            <label>日付登録</label>
                <input type = "date" onChange={(e) => setInput({...input, date: e.target.value})}></input>
            <label>カテゴリ</label>
                <select onChange={(e) => setInput({...input, category: e.target.value})}>
                    <option value = "和食">和食</option>
                    <option value = "洋食">洋食</option>
                    <option value = "外食">外食</option>
                </select>
            <label>献立写真</label>
                <input type = "text" onChange={(e) => setInput({...input, photo: e.target.value})}></input>
            <label>献立</label>
                <input type = "text" onChange={(e) => setInput({...input, text: e.target.value})} />
            <label>メイン料理</label>
                <input type = "text" onChange={(e) => setInput({...input, main: e.target.value})}></input>
            <button onClick={handleRegister}>登録</button >
            <button onClick={handleHome}>ホーム</button>
        </div>
    )
}