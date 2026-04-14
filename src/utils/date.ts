{/**yyyy-mm-ddからyyyy/mm/ddに変換する関数 */}
export const formatDate = ( date:string ) =>{
    return date.replace(/-/g, '/')
}

{/**曜日をつける関数 */}
export const addDay = (date:string) => {
    const weekDay: {[key:number] : string } ={
        0 :'(日)',
        1 :'(月)',
        2 :'(火)',
        3 :'(水)',
        4 :'(木)',
        5 :'(金)',
        6 :'(土)',       
    };

    const day = new Date(date).getDay()
    
    return weekDay[day]

}