import styles from './css/Layout.module.css'

{/**すべての画面に対して、統一のCSSを適応する。 */}
export const Layout = ({children}: {children :React.ReactNode}) => 
    (<div className={styles.container}>{children}</div>)