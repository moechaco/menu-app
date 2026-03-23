import { useNavigate } from "react-router-dom";

type Menu = {
  date : string,
  category : string,
  photo : string,
  text : string,
  main : string
};

type Props = {
    menus : Menu[]
    children : React.ReactNode

}

export const Detail =({menus, children} : Props) => {

    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/Home")
    }
    return(
        <div>
            <p>日付</p>
            {menus[0]?.date}
            <p>カテゴリ</p>
            {menus[0]?.category}
            <p>献立写真</p>
            {children}
            <p>献立</p>
            {menus[0]?.text}
            <p>メイン料理</p>
            {menus[0]?.main}
            <button onClick={handleHome}>ホーム</button>
        </div>
    )
}