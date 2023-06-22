import './Table.css';
import API from '../Services/api.js';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Search from '../Search';

const Table = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        API
            .get()
            .then((response) => setContacts(response.data))
            .catch((err) => {
                console.error("Ocorreu um erro" + err);
            });
    }, []);

    console.log(contacts);

    const columns = useMemo(
        () => [
            {
                id: 'avatar',
                columnDefType: 'display',
                Cell: () => (
                    <div className='table_avatar'>
                        <img src='./avatar.png' alt=''></img>
                    </div>
                ),
            },
            {
                accessorFn: (row) => (
                    <div>
                        <h3>{row.name}</h3>
                        <p>{row.fone}</p>
                    </div>
                ),
                header: 'Nome',
                Header: '',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            },
            {
                id: 'edit',
                columnDefType: 'display',
                Cell: () => (
                    <div className='table_edit'>
                        <img src='./edit.png' alt=''></img>
                        <img src='./delete.png' alt=''></img>
                    </div>
                ),
            },
        ],
        [],);

    return (
        <div className='table'>
            <h2>Meus contatos</h2>

            <Search/>

            <MaterialReactTable
                columns={columns}
                data={contacts}
                enableColumnActions={false}
                enableSorting={false}
                enableTopToolbar={false}
                enableTableHead={false}
            />

        </div>
    )
}

export default Table