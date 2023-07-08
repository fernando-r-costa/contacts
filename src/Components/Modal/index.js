import { useEffect, useState } from 'react';
import Button from '../Button';
import './Modal.css';
import API from '../../Services/api';

const Modal = (props) => {

    const [name, setName] = useState('');
    const [fone, setFone] = useState('');
    const [reqBody, setReqBody] = useState('');

    const onSave = () => {
        setReqBody(
            {
                "id": "",
                "name": `${name}`,
                "fone": `${fone}`
            }
        )
    }

    useEffect(() => {
        API
            .post('', reqBody)

        console.log(reqBody)

    }, [reqBody]);

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
                    <div className='table_modal_add'>
                        <h1>Adicionar contato</h1>
                        <input
                            className='table_modal_add_input_name'
                            placeholder='Nome*'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        ></input>
                        <input
                            className='table_modal_add_input_fone'
                            placeholder='Telefone*'
                            value={fone}
                            onChange={(event) => setFone(event.target.value)}
                        ></input>
                        <Button
                            type='addCancel'
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='save'
                            onSave={onSave}
                        />
                    </div>
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