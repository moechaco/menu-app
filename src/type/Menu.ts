{/**Menuオブジェクトの型を指定 */}
export type Menu = {
    id : string,
    date : string,
    category : string,
    photo : string | null,
    text : string[],
    main : string
}

export type Input = {
    date : string,
    category : string,
    photo : string | null,
    text : string[],
    main : string
}