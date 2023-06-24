import './Table.css';
import API from '../../Services/api.js';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Search from '../Search';
import Button from '../Button';

const Table = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        API
            .get('?_page=1&_limit=4')
            .then((response) => setContacts(response.data))
            .catch((err) => {
                console.error("Ocorreu um erro" + err);
            });
    }, []);

    console.log(contacts);

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => (

                    <div>
                        <h3>{row.name[0]}</h3>
                    </div>
                ),
                header: 'Indice',
                size: 50,
            },
            {
                id: 'avatar',
                columnDefType: 'display',
                Cell: () => (
                    <div className='table_avatar'>
                        <img src='./avatar.png' alt=''></img>
                    </div>
                ),
                size: 80,
            },
            {
                accessorFn: (row) => (
                    <div>
                        <h4>{row.name}</h4>
                        <p>{row.fone}</p>
                    </div>
                ),
                header: 'Nome',
                Header: '',
                size: 460,
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
                size: 60,
            },
        ],
        [],);

    return (
        <div className='table'>
            <h2>Meus contatos</h2>

            <section>
                <Search />

                <Button
                    props='new'
                />
            </section>

            <MaterialReactTable
                columns={columns}
                data={contacts}
                enableColumnActions={false}
                enableSorting={false}
                enableTopToolbar={false}
                enableTableHead={false}
                enableBottomToolbar={false}
                enablePagination={false}
                muiTablePaperProps={{
                    elevation: 0,
                    sx: {
                        border: 'transparent',
                    },
                }}
                muiTableBodyProps={{
                    sx: {
                        '& td:nth-of-type(1)': {
                            borderBottom: 'transparent',
                            paddingLeft: '0'
                        },
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        borderBottom: '1px solid #F2F2F2'
                    },
                }}
            // enableGrouping
            // initialState={{
            //     grouping: ['Indice'],
            //     expanded: true,
            // }}
            />

            <Button
                props='more'
            />

        </div>
    )
}

export default Table