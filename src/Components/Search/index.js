import { useState } from 'react';
import './Search.css';

const Search = (props) => {

    const [option, setOption] = useState('name');
    const [search, setSearch] = useState('');

    const onSearch = (event) => {
        if(search === '') {
            event.preventDefault()
            props.newUrl(`?_page=1&_limit=4`)    
        } else {
            event.preventDefault()
            props.newUrl(`?${option}=${search}`)
        }
    }

    return (
        <form className='table_search' onSubmit={onSearch}>
            <div className='table_search_options'>
                <label>Pesquisar por</label>
                <select
                    name='options'
                    onChange={(event) => setOption(event.target.value)}
                >
                    <option value="name">Nome</option>
                    <option value="fone">Telefone</option>
                </select>
            </div>
            <div className='table_search_text'>
                <img src='./search.png' alt='' onClick={onSearch}></img>
                <input
                    type='search'
                    placeholder='Pesquisar'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                ></input>
            </div>
        </form>
    )
}

export default Search