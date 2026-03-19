type Props = {
    time : string
    children : React.ReactNode
    main : string

}

export function Detail({time, children, main} : Props) {
    return(
        <div>
            <p>日付</p>
            <p>{time}</p>
            {children}
            <p>メイン料理</p>
            <p>{main}</p>
        </div>
    )
}