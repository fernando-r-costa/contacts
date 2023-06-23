import './Button.css';

const Button = ({props}) => {
    if (props === 'new') {
        return (
            <button className="search_button_new">
                <img src='./plus.png' alt=''></img>
                Novo contato
            </button>)
    }
}

export default Button