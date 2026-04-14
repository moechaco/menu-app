import styles from './css/Layout.module.css'

export const Layout = ({children}: {children :React.ReactNode}) => 
    (<div className={styles.container}>{children}</div>)
    