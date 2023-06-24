import './Search.css';

const Search = () => {
    return (
        <div className='table_search'>
            <div className='table_search_options'>
                <label>Pesquisar por</label>
                <select name='options'>
                    <option value={"Nome"}>Nome</option>
                    <option value={"Telefone"}>Telefone</option>
                </select>
            </div>
            <div className='table_search_text'>
                <img src='./search.png' alt=''></img>
                <input type='search' placeholder='Pesquisar'></input>
            </div>
        </div>
    )
}

export default Search