import { useEffect, useState } from 'react';
import Button from '../Button';
import './Modal.css';
import API from '../../Services/api';

const Modal = (props) => {

    const [name, setName] = useState('');
    const [fone, setFone] = useState('');

    const onSave = (event) => {
        event.preventDefault()
        API
            .post('',
            {
                "id": "",
                "name": `${name}`,
                "fone": `${fone}`
            })
            .then(response => console.log(response.data))
            .then(setName(''), setFone(''))
    }

    const noSubmit = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
        }
    }

    if (props.isOpen) {

        if (props.type === 'delete') {
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
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='confirm'
                        />
                    </div>
                </div>
            )
        } else if (props.type === 'new') {
            return (
                <div className='table_modal'>
                    <form className='table_modal_add' onSubmit={onSave} onKeyDown={noSubmit}>
                        <h1>Adicionar contato</h1>
                        <input
                            className='table_modal_add_input_name'
                            placeholder='Nome*'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        ></input>
                        <input
                            className='table_modal_add_input_fone'
                            type='tel'
                            placeholder='Telefone*'
                            value={fone}
                            onChange={(event) => setFone(event.target.value)}
                            pattern="\(\d{2}\)\s*\d{5}-\d{4}"
                            required
                        ></input>
                        <Button
                            type='addCancel'
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='save'
                        />
                    </form>
                </div>
            )
        } else if (props.type === 'edit') {
            return (
                <div className='table_modal'>
                    <div className='table_modal_edit'>
                        <h1>Editar contato</h1>
                        <input className='table_modal_add_input_name' placeholder='Nome*'></input>
                        <input className='table_modal_add_input_fone' placeholder='Telefone*'></input>
                        <Button
                            type='addCancel'
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='save'
                        />
                    </div>
                </div>
            )
        }
    }
    return null
}


export default Modal