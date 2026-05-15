import {useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Menu } from './type/Menu';
import styles from './css/Detail.module.css'
import { formatDate, addDay } from './utils/date';
import { getMenuById, deleteMenu } from './lib/db';

export const Detail = () => {

    const { id } = useParams<{id : string}>();

    const [detail, setDetail] = useState<Menu | null>(null)

    const [loading,setLoading] = useState(true)

    const navigate = useNavigate()

    {/**idと一致するデータを取得 */}
    useEffect(() =>{
        const fetchData = async () => {
            try{
                if(!id) return
                const data = await getMenuById(id) 
                setDetail(data)             
            } catch(e) {
                console.error(e)
                alert('データが見つかりませんでした。')
                navigate('/')
            } finally {
                setLoading(false)
            }
    } 
    
    fetchData()
    }, [id]) 

    {/**戻るボタンから前のページへ遷移*/}
    const location = useLocation();
    const handleReturn = () => {
        if(location.state?.from == 'list'){
            navigate('/List', {state: {baseDate: location.state.baseDate}})
        }

        if(location.state?.from == 'category'){
            navigate(`/Category/${location.state.category}`,{state:{
                date: location.state.date,
                currentPage: location.state.currentPage}})
        }
    }

    {/**カテゴリー一覧へ遷移*/}
    const handleCategory = ( category : string ) => {
        navigate(`/Category/${category}`)
    }

    {/**編集フォームへ遷移 */}
    const handleEdit = ( id : string ) => {
        navigate(`/Edit/${id}`)
    }

    {/**削除処理 */}
    const handleDelete = async ( id : string ) => {
        if(confirm('本当に削除しますか？')){
            try{
                if(!id) return
                await deleteMenu(id)
                navigate('/List')
            } catch(e) {
                console.error(e)
                alert('エラーが発生しました。')
                navigate('/')
            }
        } else {
            return
        }
    }

    {/**ローディング中の画面描画 */}
    if(loading){
        return <h3 className={styles.loading}>読み込み中・・・</h3>}

    {/**データがなかった場合の画面描画 */}
    if(!detail) {
        return(
            <div>
                <h2 className={styles.loading}>データが見つかりません。</h2>
                <Link className={styles.loading} to= '/'>ホーム</Link>
            </div>
        )
    }
    {/**データが取得できた場合の画面描画 */}
    return(
        <div>
            <h2 className={styles.title}>{formatDate(detail.date)}{addDay(detail.date)}</h2>      
            { detail.photo && <img className={styles.photo} src={detail.photo} />}
            <div className={styles.container}>
                <p className={styles.label}>献立</p>
                <button className={styles.category} onClick={() => handleCategory(detail.category)}>（{detail.category}）</button>
            </div >
            <div className={styles.menu}>
                <ul>
                    {detail.text
                        .filter((d) => d !== "")
                        .map((d, index) => 
                        <li key = {index}>{d}</li>      
                    )} 
                </ul>
            </div>
            <p className={styles.label}>メイン料理</p>
            <p className={styles.mainMenu}>{detail.main}</p>
            <div className={styles.buttonContainer}>
                <button className={styles.tranButton} onClick={() => handleReturn()}>戻る</button>
                <button className={styles.tranButton} onClick={() => handleEdit(detail.id)}>編集</button>
                <button className={styles.tranButton} onClick={() => handleDelete(detail.id)}>削除</button>
            </div>
            <div className={styles.bottomContainer}>
                <Link className={styles.tranLink} to= '/'>ホーム</Link>
                <Link className={styles.tranLink} to = '/List'>献立一覧</Link>
            </div>
        </div>
    ) 
}