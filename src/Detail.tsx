import {useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Menu } from './type/Menu';
import styles from './css/Detail.module.css'
import { formatDate, addDay } from './utils/date';
import { getMenuById, deleteMenu } from './lib/db';

export const Detail = () => {

    {/**id取得 */}
    const { id } = useParams<{id : string}>();

    {/**データを管理するstate */}
    const [detail, setDetail] = useState<Menu | null>(null)

    {/**ローディング状況を管理するstate */}
    const [loading,setLoading] = useState(true)

    {/**idと一致するデータを取得 */}
    useEffect(() =>{
        const fetchData = async () => {
            try{
                if(!id) return
                const data = await getMenuById(id) 
                setDetail(data)             
            } catch(e) {
                console.error(e)
                alert('エラーが発生しました。')
            } finally {
                setLoading(false)
            }
    } 
    
    fetchData()
    }, [id]) 

    {/**カテゴリー一覧へ遷移*/}
    const navigate = useNavigate()
    const handleCategory = ( category : string ) =>{
        navigate(`/Category/${category}`)
    }

    {/**編集フォームへ遷移 */}
    const handleEdit = ( id : string ) => {
        navigate(`/Edit/${id}`)
    }

    {/**削除処理 */}
    const handleDelete = async ( id : string ) => {
        
        {/**削除するかアラートで確認 */}
        if(confirm('本当に削除しますか？')){
            try{
                if(!id) return
                await deleteMenu(id)
                navigate('/List')
            } catch(e) {
                console.error(e)
            }
        } else {
            return
        }
    }

    {/**ローディング中の画面描画 */}
    if(loading ){
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
                <a className={styles.category}onClick={() => handleCategory(detail.category)}>（{detail.category}）</a>
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
                <button className={styles.button} onClick={() => handleEdit(detail.id)}>編集</button>
                <button className={styles.button} onClick={() => handleDelete(detail.id)}>削除</button>
            </div>
            <div className={styles.bottomContainer}>
                <Link className={styles.tranLink} to= '/'>ホーム</Link>
                <Link className={styles.tranLink} to = '/List'>献立一覧</Link>
            </div>
        </div>
    ) 
}