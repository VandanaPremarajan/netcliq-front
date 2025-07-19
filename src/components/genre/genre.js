const Genre = ({genre}) => {
    return(
        <>
            <li className="list-group-item list-group-item-dark">{genre.name}</li>
        </>
    )
}
export default Genre;