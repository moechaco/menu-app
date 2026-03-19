type Props = {
    title : string
    children : React.ReactNode
    newForm : string
    listForm : string
}

export function Home ({title, children, newForm, listForm} : Props)  {
    return (
    <div>
        <h1>{title}</h1>
        {children}
        <h1>{newForm}</h1>
        <h1>{listForm}</h1>
    </div>
    )
}