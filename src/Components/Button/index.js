import './Button.css';

const Button = (props) => {

    const newPage = () => {
        props.newPage(1)
    }

    const openModal = (type) => {
        props.openModal(true, type)
    }

    const closeModal = () => {
        props.closeModal(false)
    }

    if (props.type === 'new') {
        return (
            <button
                className="table_search_button_new"
                onClick={openModal}
            >
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
    } else if (props.type === 'addCancel') {
        return (
            <button className="table_modal_add_button_cancel">
                Cancelar
            </button>)
    } else if (props.type === 'save') {
        return (
            <button className="table_modal_add_button_save">
                Salvar
            </button>)
    } else if (props.type === 'deleteCancel') {
        return (
            <button
                className="table_modal_delete_button_cancel"
                onClick={closeModal}
            >
                Cancelar
            </button>)
    } else if (props.type === 'confirm') {
        return (
            <button className="table_modal_delete_button_confirm">
                Confirmar
            </button>)
    }

}

export default Button