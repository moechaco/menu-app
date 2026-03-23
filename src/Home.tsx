import { useNavigate } from "react-router-dom"

type Props = {
    children : React.ReactNode
}

export const Home = ({children} : Props) => {
    const navigate = useNavigate()
    const handleNew = () => {
        navigate("/New")
    }
    const handleList = () => {
        navigate("/List")
    }    
     const handleDetail = () => {
        navigate("/Detail")
    }       
    return (
    <div>
        <h1>献立管理アプリ</h1>
        {children}
        <button onClick={handleNew}>新規献立</button>
        <button onClick={handleList}>献立一覧</button>
        <button onClick={handleDetail}>献立詳細</button>
    </div>
    )
}