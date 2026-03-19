

export function NewForm() {
    return(
        <div>
            <label>日付登録</label><input type = "date"></input>
            <label>カテゴリ</label>
                <select name = "category">
                    <option value = "category1">和食</option>
                    <option value = "category2">洋食</option>
                    <option value = "category3">外食</option>
                </select>
            <label>献立写真</label><input type = "text"></input>
            <label>メイン料理</label><input type = "text"></input>
        </div>
    )
}