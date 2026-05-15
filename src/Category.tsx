import { useEffect, useState } from 'react'
import type { Menu } from './type/Menu'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import styles from './css/Category.module.css'
import { formatDate, addDay } from './utils/date'
import { getCategoryMenu } from './lib/db'

export const Category = () => {

    const { category } = useParams<{category : string}>()

    const [menus,setMenus] = useState<Menu[]>([])

    const location = useLocation();
    const [date, setDate] = useState(() => {
        if(location.state?.date){
            return new Date(location.state.date)
        } else {
            return new Date()
        }
    })

    const [currentPage, setCurrentPage] = useState(() => {
        if(location.state?.currentPage){
            return location.state.currentPage
        } else
            return 1
    })

    const navigate = useNavigate()

    if(!category){
        return(
            <div>
                <h2>データが見つかりません。</h2>
                <Link to = '/'>ホーム</Link>
            </div>
        )
    }

    {/**データ取得 */}
    useEffect(() =>{
        let startDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
        let endDate = `${date.getFullYear()}-${String(date.getMonth() + 2).padStart(2, '0')}-01`

        const fetchData = async () => {
            try{
                const data = await getCategoryMenu(category, startDate, endDate)
                setMenus(data)
            } catch(e){
                console.log(e)
                alert('エラーが発生しました。')
                navigate('/')
            }
        }
    
        fetchData()
    }, [date, category])


    {/**ページネーション */}
    const perPage = 7;
    const start = perPage * (currentPage - 1)
    const end = start + perPage
    const totalPages = Math.ceil( menus.length / perPage)


    {/**ページの範囲を制限する（最小値：１、最大値：ページ数 */}
    const clamp = (num : number ,min : number, max : number) => {
        return Math.min(Math.max(num, min), max)
    }

    {/**ページを更新する */}
    const handleChanges = (pages : number) => {
         setCurrentPage(pages)
        }

    {/**詳細画面への画面遷移 */}
    const handleDetail = (id: string) => {
            navigate(`/Detail/${id}`, {state: {
                from : 'category',
                date: date.toISOString(),
                category,
                currentPage
            }})
    }

    return(
        <div>
            <h2 className={styles.title}>献立一覧（{category}）</h2>
            <div className={styles.topContainer}>
                <h3 className={styles.month} key = {date.toISOString()}>{date.getFullYear()}年{date.getMonth() + 1}月</h3>
                {/**カレンダー表示*/}
                <DatePicker showMonthYearPicker selected ={date} customInput ={<button className={styles.calendar}>➤過去献立</button>} onChange={(date : Date | null) =>
                    {if(date){
                        setDate(date) 
                        setCurrentPage(1)}}} />
            </div>
                {menus
                    .slice(start, end)
                    .map((m) => (
                            <div className={styles.mainContainer} key = {m.id}>
                                <p>{formatDate(m.date)}{addDay(m.date)}</p>
                                <button className={styles.mainMenu} onClick={() => handleDetail(m.id)}>{m.main}</button>
                            </div>
                    ))}
            
            {/**ページネーション処理 */}
            <div className={styles.bottomContainer}>
                <button className={styles.link} onClick={() => handleChanges(clamp(currentPage - 1, 1, Number(Math.ceil(menus.length / perPage))))}>{currentPage != 2 ? currentPage : 1}</button>
                {totalPages > 1 &&
                (<>
                    <span className={styles.link}>{'/'}</span>
                    <button className={styles.link} onClick={() => handleChanges(clamp(currentPage + 1, 1, Number(Math.ceil(menus.length / perPage))))}>{Math.ceil(menus.length / perPage)}</button>
                </>)}
            </div>
                
            <Link className={styles.homeLink} to = '/'>ホーム</Link>
        </div>
    )
}
