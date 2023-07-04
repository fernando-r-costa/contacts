import Button from '../Button';
import './Modal.css';

const Modal = () => {

    return (
        <div className='table_modal'>
            <div className='table_modal_delete'>
                <h1>Excluir contato</h1>
                <div className='table_modal_delete_user'>
                    <div>Usuário:nome</div>
                    <div>Telefone:fone</div>
                </div>
                <Button
                    type='deleteCancel'
                />
                <Button
                    type='confirm'
                />
            </div>
        </div>
    )

    // return (
    //     <div className='table_modal'>
    //         <div className='table_modal_add'>
    //             <h1>Adicionar contato</h1>
    //             <input className='table_modal_add_input_name' placeholder='Nome*'></input>
    //             <input className='table_modal_add_input_fone' placeholder='Telefone*'></input>
    //             <Button
    //                 type='addCancel'
    //             />
    //             <Button
    //                 type='save'
    //             />
    //         </div>
    //     </div>
    // )

}

export default Modal