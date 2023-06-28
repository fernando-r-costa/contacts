import Button from '../Button';
import './Modal.css';

const Modal = () => {

    return (
        <div className='table_modal'>
            <div className='table_modal_content'>
                <h1>Adicionar contato</h1>
                <input className='table_modal_content_input_name' placeholder='Nome*'></input>
                <input className='table_modal_content_input_fone' placeholder='Telefone*'></input>
                <Button
                    type='cancel'
                />
                <Button
                    type='save'
                />
            </div>
        </div>
    )

}

export default Modal