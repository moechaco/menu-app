import { useState } from "react"
import type { Menu } from "./Menu"
import { useParams, useNavigate, Link } from "react-router-dom"
import DatePicker from "react-datepicker"

type Props = {
    menus: Menu[]
}

export const Category = ({menus} :Props) => {

    const { category } = useParams<{category : string}>()

    if(!category){
        return(
            <div>
                <h2>データが見つかりません。</h2>
                <Link to = "/">ホーム</Link>
            </div>
        )
    }

    {/**1か月の献立取得 */}
    const [date, setDate] = useState(new Date())
    let day = new Date(date);
    let targetMonth = `${String(day.getFullYear())}-${String(day.getMonth() + 1).padStart(2, "0")}`

    {/**ページネーション */}
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 7;
    const start = perPage * (currentPage - 1)
    const end = start + perPage
    const allData = menus.filter((menu) => menu.category  === category && menu.date.slice(0,7) === targetMonth)
    const sortData = [...allData].sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime()))

    {/**ページの範囲を制限する（最小値：１、最大値：ページ数 */}
    const clamp = (num : number ,min : number, max : number) => {
        return Math.min(Math.max(num, min), max)
    }

    {/**ページを更新する */}
    const handleChanges = (pages : number) => {
         setCurrentPage(pages)
        }


    const navigate = useNavigate()
    const handleDetail = (id: string) => {
            navigate(`/Detail/${id}`)
    }

    return(
        <div>
            <h2>献立一覧：{category}</h2>
            <DatePicker showMonthYearPicker selected ={date} customInput ={<button>過去献立</button>} onChange={(date : Date | null) =>
                {if(date){
                    setDate(date) 
                    setCurrentPage(1)}}} />
            <ul>
            <h3>{date.getMonth() + 1}月</h3>
                {sortData
                    .slice(start, end)
                    .map((m) => (
                            <li key = {m.id} onClick={() => handleDetail(m.id)}>
                                <p>{m.date}</p>
                                <p>{m.main}</p>
                            </li>
                    ))}
            </ul>
            <button onClick={() => handleChanges(clamp(currentPage - 1, 1, Number(Math.ceil(allData.length / perPage))))}>{currentPage != 2 ? currentPage : 1}</button>
            {Number(Math.ceil(allData.length / perPage)) <= 1 ? undefined : 
            (<>
                {'/'}
                <button onClick={() => handleChanges(clamp(currentPage + 1, 1, Number(Math.ceil(allData.length / perPage))))}>{Math.ceil(allData.length / perPage)}</button>
            </>)}
                
            <Link to = "/">ホーム</Link>
        </div>
    )
}
