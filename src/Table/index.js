import './Table.css';
import API from '../Services/api.js';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

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
            // {
                //     accessorFn: (originalRow) => originalRow.fone, //alternate way
                //     id: 'fone', //id required if you use accessorFn instead of accessorKey
                //     header: 'fone',
                //     Header: <i style={{ color: 'red' }}>Telefone</i>, //optional custom markup
                // },
            ],
            [],);
            
            return (
                <div className='table'>
            <h2>Meus contatos</h2>

            <MaterialReactTable
                columns={columns}
                data={contacts}
                enableHiding= {false}
                enableFullScreenToggle= {false}
                enableDensityToggle= {false}
                enableColumnActions= {false}
                enableFilters= {false}
                enableSorting= {false}
            />

        </div>
    )
}

export default Table