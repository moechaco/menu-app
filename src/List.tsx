import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Menu } from './type/Menu'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getMenus } from './lib/db'
import styles from './css/List.module.css'
import { formatDate, addDay} from './utils/date'

export const List = () => {

    const [menus, setMenus] = useState<Menu[]>([])
    const [loading,setLoading] = useState(true)

    useEffect(() =>{ 
        const fetchData = async () =>{
        try{
            const data = await getMenus()
            setMenus(data)
        } catch(e) {
            console.error(e)
            alert('エラーが発生しました。')
        }finally{
            setLoading(false)
        }}

        fetchData()
    },[])

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
       if(loading){
        return <h3 className={styles.loading}>読み込み中・・・</h3>
    }

    return(
        <div>
            <h2 className={styles.title}>献立一覧</h2>
            <div className={styles.container}>
                <h3 className={styles.week}>{week.length > 0 && `${formatDate(week[0])}～${formatDate(week[6])}`}</h3>
                {/**カレンダー表示*/}
                 <DatePicker selected = {baseDate} onChange={(date : Date | null) => { if(date){setBaseDate(date)}}} customInput={<button className={styles.rightButton}>➤過去献立</button>}/>
            </div>
                {menus
                    .filter((menu) => week.includes(menu.date))
                    .sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
                    .map((menu) => (
                        <div className ={styles.mainContainer} key = {menu.id} >
                            <div className ={styles.mainItem}>
                                <p>{formatDate(menu.date)}{addDay(menu.date)}</p>
                                <button className={styles.category} onClick={() => handleCategory(menu.category)}>({menu.category})</button>
                            </div>
                            <button className ={styles.mainMenu} onClick= {() => handleDetail(menu.id)}>{menu.main}</button>
                        </div>
                ))}
            <div className={styles.container}>
                {/**一週間前を描画する */}
                <button className={styles.leftButton} onClick={handleBeforeWeek}>{prevWeek.length > 0 && `➤${prevWeek[0]}～${prevWeek[6]}`}</button>
                {/**一週間後を描画する */}
                <button className={styles.rightButton} onClick={handleAfterWeek}>{laterWeek.length > 0 && `➤${laterWeek[0]}～${laterWeek[6]}`}</button>
            </div>
            <Link className={styles.homeLink} to ='/'>ホーム</Link>
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
        week.push(`${String(d.getFullYear())}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)  
    };
    return week;
} 