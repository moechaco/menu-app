import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import styles from './css/Form.module.css'
import { uploadFiles } from './lib/storage';
import { insertMenu, updateMenu } from './lib/db';
import { getMenuById } from './lib/db';
import type { Input } from './type/Menu';

{/**modeはcreateもしくはeditであることを定義する */}
type Props = {
    mode : 'create' | 'edit'
}

export const Form = ({mode} : Props)  => {

    {/**受け取ったidを取得する */}
    const { id } = useParams<{ id : string }>();

    {/**modeがeditの場合、isEditフラグがtrueであることを宣言 */}
    const isEdit = mode === 'edit'

    {/**Form内のデータを管理するstate */}
    const [input, setInput] = useState<Input>({
        date: '',
        category: '和食',
        photo: null,
        text: [''],
        main: ''

    });

    {/**データ到着判定フラグ */}
    const [isLoading, setIsLoding] = useState(false)

    {/**必須項目に値が入ってない場合の、画面表示の判定フラグ */}
    const [isRequiredError, setIsRequiredError] = useState(false)
 
    {/**献立の行を管理する変数*/}
    const itemRefs = useRef<(HTMLInputElement | null)[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        {/**編集モードでない、もしくはidが存在しない場合は処理を飛ばす */}
        if(!isEdit || !id) return

        {/**読み込みモードにする */}
        setIsLoding(true)

        {/**編集もーふぉの場合、idを基にデータを取得する */}
            const fetchData = async () => {
                try{
                    const data = await getMenuById(id)
                    {/**データがなかった場合 */}
                    if(!data){
                        console.error('データが見つかりません')
                        alert('エラーが発生しました。')
                        navigate ('/')
                        return                            
                    }
                {/**データが存在した場合 */}
                setInput({
                    date: data.date,
                    category: data.category,
                    photo: data.photo,
                    text: data.text,
                    main: data.main
                })
                } catch(e) {
                    console.error(e)
                } finally {
                    setIsLoding(false)
                }
            }
            fetchData()
    }, [id, isEdit, navigate])



    {/**献立の配列を作成する */}
    const handleChange = (index : number, value :string) => {
        const newText = [...input.text]
        newText[index] = value
        setInput({...input, text: newText})
    }

    {/**特定のキーを押した場合の処理 */}
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        {/**Backspaceキーの場合、作成した行を消す。 */}
        if(e.key === 'Backspace'){

            {/**一行目の場合、削除不可  */}
            if(index == 0) return

            {/**対象の行に文字が入っていた場合、削除不可 */}
            if(input.text[index] != '')
                return

            const deleteText = [...input.text]
            deleteText.splice(index, 1)
            setInput({...input, text: deleteText})

            setTimeout(() => {
                itemRefs.current[index - 1]?.focus()
            }, 0.2)
            
        }

        {/**Enterキーの場合、新しい行を作る。 */}
        if(e.key === 'Enter'){
            e.preventDefault();

            const newText = [...input.text];
            newText.splice(index + 1, 0, '')
            setInput({...input, text: newText})

        setTimeout(() => {
            itemRefs.current[index + 1]?.focus()
        }, 0)
            
        }
    }

    {/**画像をアップロードする */}
    const handleUpload = async(file : File) => {
        try{
            const data = await uploadFiles(file)
            setInput({...input, photo :data})
        } catch(e){
            console.error(e)
        }       
    }

    {/**データを新規登録する */}
    const handleRegister = async () => {

        {/**必須項目に値が入ってなかった場合、警告文を出す。 */}
        if(input.date == '' || input.category == '' || input.main == ''){
            setIsRequiredError(true)
            return
        } else {
            setIsRequiredError(false)
        }
            
        try{
            const data = await insertMenu(input)
            navigate(`/Detail/${data.id}`)
        } catch(e) {
            console.error(e)
        }
    };

    {/**データを編集する */}
    const handleUpdate = async () => {

        {/**必須項目に値が入ってなかった場合、警告文を出す。 */}
        if(input.date == '' || input.category == '' || input.main == ''){
            setIsRequiredError(true)
            return
        } else {
            setIsRequiredError(false)
        }

        try{
            if(!id) return
            const data = await updateMenu(input, id)
            navigate(`/Detail/${data.id}`)
        } catch(e) {
            console.error(e)
        }
    };

    {/**ローディング中の画面描画 */}
    if(isLoading){
        return <h3 className={styles.loading}>読み込み中・・・</h3>
    }

        return(
            <div>
                <h1 className={styles.title}>{isEdit ? '献立編集' : '献立新規登録'}</h1>
                <div className={styles.mainContainer}>
                    <label className={styles.label}>日付登録</label>
                    <input className={styles.item} type = 'date' value = {input.date} onChange={(e) => setInput({...input, date: e.target.value})} />
                </div>
                <p className={styles.required}>{isRequiredError ? '※必須項目' : ''}</p>
                <div className={styles.mainContainer}>
                    <label className={styles.label}>カテゴリ</label>
                    <select className={styles.item} value = {input.category}  onChange={(e) => setInput({...input, category: e.target.value})}>
                        <option value = '和食'>和食</option>
                        <option value = '洋食'>洋食</option>
                        <option value = '外食'>外食</option>
                    </select>
                </div>
                <p className={styles.required}>{isRequiredError ? '※必須項目' : ''}</p>
                <div className={styles.mainContainer}>
                    <label className={styles.label}>献立写真</label>
                    <input 
                        className={styles.file}
                        type = 'file'
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleUpload(file)
                        }} />                  
                </div>
                {input.photo && <img src={input.photo} alt ='プレビュー' className={styles.photo}/>}
                <label className={styles.label}>献立</label>
                <div className={styles.text}>
                    {input.text.map((i, index) => 
                        <div className={styles.key} key ={index}>
                            ・
                            <input 
                                className={styles.input}
                                ref = {(el) => {itemRefs.current[index] = el}}
                                value = {i} 
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index,e)}/>  
                        </div>
                    )}
                </div>
                <div className={styles.mainContainer}>
                <label className={styles.label}>メイン料理 （店舗名）</label>
                <p className={styles.bottomRequired}>{isRequiredError ? '※必須項目' : ''}</p>
                </div>
                <input className={styles.mainText} value = {input.main} type = 'text' onChange={(e) => setInput({...input, main: e.target.value})} />
                <button className={styles.button} onClick={isEdit ? handleUpdate :handleRegister}>{isEdit ? '編集' : '登録'}</button >
                <div className={styles.bottomContainer}>
                    <Link className={styles.bottomItem} to='/'>ホーム</Link>
                    <Link className={styles.bottomItem} to='/List'>献立一覧</Link>
                </div>
            </div>
        )
}