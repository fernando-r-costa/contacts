import './Button.css';

const Button = (props) => {

    const newPage = () => {
        props.newPage(1)
    }

    if (props.type === 'new') {
        return (
            <button className="table_search_button_new">
                <img src='./plus.png' alt=''></img>
                Novo contato
            </button>)
    } else if (props.type === 'more') {
        if (props.page === props.pageCount) {
            return (
                <button
                    className="table_button_more_disable"
                >
                    Carregar mais
                </button>)
        } else {
            return (
                <button
                    className="table_button_more_able"
                    onClick={newPage}
                >
                    Carregar mais
                </button>)
        }
    }
}

export default Button