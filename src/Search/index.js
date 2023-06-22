import './Search.css';

const Search = () => {
    return (
        <div className='search'>
            <div className='options'>
                <label>Pesquisar por</label>
                <select name='options'>
                    <option value={"Nome"}>Nome</option>
                    <option value={"Telefone"}>Telefone</option>
                </select>
            </div>
            <div className='field'>
                <img src='./vector.png' alt=''></img>
                <input type='search' placeholder='Pesquisar'></input>
            </div>
        </div>
    )
}

export default Search