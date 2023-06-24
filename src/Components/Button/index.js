import './Button.css';

const Button = ({props}) => {
    if (props === 'new') {
        return (
            <button className="table_search_button_new">
                <img src='./plus.png' alt=''></img>
                Novo contato
            </button>)
    } else if(props === 'more') {
        return (
            <button className="table_button_more">
                Carregar mais
            </button>)
    }
}

export default Button