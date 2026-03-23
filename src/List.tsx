import { useNavigate } from "react-router-dom"

type Menu = {
  date : string,
  category : string,
  photo : string,
  text : string,
  main : string
}

type Props = {
    menus : Menu[]
}

export const List = ({menus} : Props) => {

    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/")
    }

    const handleDetail = () => {
        navigate("/Detail")
    }

    return(
        <div>
            <ul onClick={handleDetail}>
                {menus.map((menu) => (
                    <li>
                        <p>日付</p>
                        <p>{menu.date}</p>
                        <p>{menu.category}</p>
                        <p>{menu.main}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleHome}>ホーム</button>
        </div>
    )
}