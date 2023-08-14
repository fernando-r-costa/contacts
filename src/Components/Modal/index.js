import { useState } from 'react';
import InputMask from 'react-input-mask';
import Button from '../Button';
import './Modal.css';
import API from '../../Services/api';

const Modal = (props) => {

    const [name, setName] = useState('');
    const [fone, setFone] = useState('');

    const noSubmit = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    const onSave = () => {
        const names = name.split(' ');
        const upperCaseName = names.map((name) => {
            return name[0].toUpperCase() + name.substring(1);
        }).join(' ');

        API
            .post('',
                {
                    "id": "",
                    "name": `${upperCaseName}`,
                    "fone": `${fone}`,
                    "firstLetter": `${name[0].toLowerCase()}`,
                }, {
                headers: { 'Content-Type': 'application/json' }
            })
            .catch(function (error) { console.log(error); })
            .then(setName(''), setFone(''))
    }

    const onDelete = () => {
        API
            .delete(props.id)
            .catch(function (error) { console.log(error); })
    }

    const onUpdate = () => {
        if (name === '' && fone === '') {
            return null
        } else if (name !== '' && fone !== '') {
            API
                .put(props.id,
                    {
                        "id": props.id,
                        "name": `${name}`,
                        "fone": `${fone}`
                    }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .catch(function (error) { console.log(error); })
                .then(setName(''), setFone(''))
        } else if (name === '') {
            API
                .put(props.id,
                    {
                        "id": props.id,
                        "name": props.name,
                        "fone": `${fone}`
                    }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .catch(function (error) { console.log(error); })
                .then(setName(''), setFone(''))
        } else if (fone === '') {
            API
                .put(props.id,
                    {
                        "id": props.id,
                        "name": `${name}`,
                        "fone": props.fone
                    }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .catch(function (error) { console.log(error); })
                .then(setName(''), setFone(''))
        }
    }

    if (props.isOpen) {

        if (props.type === 'new') {
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
                        <InputMask
                            className='table_modal_add_input_fone'
                            mask="(99) 99999-9999"
                            placeholder='Telefone*'
                            value={fone}
                            onChange={(event) => setFone(event.target.value)}
                            pattern="\(\d{2}\)\s*\d{5}-\d{4}"
                            required
                        />
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
                    <form className='table_modal_edit' onSubmit={onUpdate} onKeyDown={noSubmit}>
                        <h1>Editar contato</h1>
                        <input
                            className='table_modal_add_input_name'
                            defaultValue={props.name}
                            onChange={(event) => setName(event.target.value)}
                        ></input>
                        <InputMask
                            className='table_modal_add_input_fone'
                            mask="(99) 99999-9999"
                            defaultValue={props.fone}
                            onChange={(event) => setFone(event.target.value)}
                            pattern="\(\d{2}\)\s*\d{5}-\d{4}"
                            required
                        />
                        <Button
                            type='addCancel'
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='update'
                        />
                    </form>
                </div>
            )

        } else if (props.type === 'delete') {
            return (
                <div className='table_modal'>
                    <form className='table_modal_delete' onSubmit={onDelete} onKeyDown={noSubmit}>
                        <h1>Excluir contato</h1>
                        <div className='table_modal_delete_user'>
                            <div>Nome: {props.name}</div>
                            <div>Telefone: {props.fone}</div>
                        </div>
                        <Button
                            type='deleteCancel'
                            closeModal={props.closeModal}
                        />
                        <Button
                            type='confirm'
                        />
                    </form>
                </div>
            )
        } else if (props.type === "loading") {
            return (
                <div className='table_modal'>
                    <form className='table_modal_loading'>
                        <div className="custom-loader"></div>
                    </form>
                </div>
            )
        } else if (props.type === "saved") {
            return (
                <div className='table_modal'>
                    <form className='table_modal_loading'>
                        <h1>Salvo</h1>
                        <Button
                            type='ok'
                        />
                    </form>
                </div>
            )
        }
    }
    return null
}


export default Modal