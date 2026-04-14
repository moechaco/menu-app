import { Link } from 'react-router-dom'
import cookingImg from './assets/cooking.png'
import styles from './css/Home.module.css'

export const Home = () => {

    return (
    <div>
        <h1 className={styles.title}>献立管理アプリ</h1>
        <img src={cookingImg} alt='' className={styles.photo} /> 
        <Link to= '/New' className={styles.button}>新規献立</Link>
        <Link to= '/List' className={styles.button}>献立一覧</Link>
    </div>
    )
}