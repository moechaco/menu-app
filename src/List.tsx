import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import type { Menu } from "./Menu"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    menus : Menu[]
}

export const List = ({menus} : Props) => {

    {/**基準日管理 */}
    const [baseDate, setBaseDate] = useState<Date>(new Date())

    {/**リンク作成 */}
    const navigate = useNavigate();

    const handleDetail = (id :string) => {
        navigate(`/Detail/${id}`)
    };

    const handleCategory = (category: string) => {
        navigate(`/Category/${category}`)
    };

    {/**一週間取得 */}
    const week = createWeek(baseDate);

    {/**一週間前の基準日取得 */}
    const prevDate = new Date(baseDate);
    prevDate.setDate(baseDate.getDate() - 7)

    {/**一週間前取得 */}
    const prevWeek = createWeek(prevDate)

    {/**一週間前へ遷移 */}
    const handleBeforeWeek = () => {
        let beforeDate = new Date(baseDate)
        beforeDate.setDate(baseDate.getDate() - 7);
        setBaseDate(beforeDate)
    }

    {/**一週間後の基準日取得 */}
    const laterDate = new Date(baseDate);
    laterDate.setDate(baseDate.getDate() + 7)

    {/**一週間後取得 */}
    const laterWeek = createWeek(laterDate)
 
    {/**一週間後への遷移 */}
    const handleAfterWeek = () => {
        let afterDate = new Date(baseDate)
        afterDate.setDate(baseDate.getDate() + 7)
        setBaseDate(afterDate)

    }

    {/**特定した範囲を出力する。 */}
    return(
        <div>
            <h2>献立一覧</h2>
            {/**カレンダー表示*/}
            <DatePicker selected = {baseDate} onChange={(date : Date | null) => { if(date){setBaseDate(date)}}} customInput={<button>過去献立</button>}/>
            <h3>{week.length > 0 && `${week[0]}～${week[6]}`}</h3>
            <ul>
                {menus
                    .filter((menu) => week.includes(menu.date))
                    .sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
                    .map((menu) => (
                        <li key = {menu.id} onClick= {() => handleDetail(menu.id)}>
                            <p>日付</p>
                            <p>{menu.date}</p>
                            <p>カテゴリ</p>
                            <p onClick={() => handleCategory(menu.category)}>{menu.category}</p>
                            <p>メイン料理</p>
                            <p>{menu.main}</p>
                        </li>
                ))}
            </ul>
            {/**一週間後を描画する */}
            <button onClick={handleAfterWeek}>{laterWeek.length > 0 && `${laterWeek[0]}～${laterWeek[6]}`}</button>
            {/**一週間前を描画する */}
            <button onClick={handleBeforeWeek}>{prevWeek.length > 0 && `${prevWeek[0]}～${prevWeek[6]}`}</button>
            <Link to ="/">ホーム</Link>
        </div>
    )
}

{/**一週間計算 */}
const createWeek = (base: Date) : string[] => {

    {/**基準日作成 */}
    let day = new Date(base);

    {/**基準日の曜日特定（日：０～土：６） */}
    let dd = day.getDay();

    {/**月曜日特定 */}
    let dayMonday : number;

    if(dd !== 0){
        dayMonday = day.getDate() - dd + 1
        day.setDate(dayMonday)
    } else{
        dayMonday = day.getDate() - 6
        day.setDate(dayMonday)
    }

    {/**基準日を元に月曜日から日曜日までの配列作成 */}
    const week: string[] = [];

    for(let i = 0; i < 7; i++){
        const d = new Date(day)
        d.setDate(d.getDate() + i)
        week.push(`${String(d.getFullYear())}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`)
    };

    return week;
} 