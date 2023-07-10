import './Table.css';
import API from '../../Services/api.js';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Search from '../Search';
import Button from '../Button';
import Index from '../Index';
import Modal from '../Modal';

const Table = () => {

    const [contacts, setContacts] = useState([]);

    const [page, setPage] = useState(1);
    const [limitPage] = useState(4)
    const [url, setUrl] = useState(`?_sort=name&_page=${page}&_limit=${limitPage}`);
    const [pageCount, setPageCount] = useState()

    const newPage = (newPage) => {
        setPage(page + newPage);
    }

    const [openModal, setOpenModal] = useState(false)
    const [typeModal, setTypeModal] = useState('')
    
    const isOpen = (isOpen) => {
        setOpenModal(isOpen);
        setTypeModal(isOpen);
    }

    useEffect(() => {
        API
            .get(url)
            .then(function (response) {
                setContacts(response.data);
                setPageCount(Math.round(response.headers['x-total-count'] / limitPage))
            })
            .catch((err) => {
                console.error("Ocorreu um erro" + err);
            });
    }, [url, openModal]);

    useEffect(() => {
        setUrl(`?_sort=name&_page=${page}&_limit=${limitPage}`)
    }, [page])

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => (
                    <Index
                        letter={row.name[0]}
                    />
                ),
                header: 'Index',
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
                        <h3>{row.name}</h3>
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
                        <img src='./edit.png' alt='' onClick={() => { isOpen('edit') }}></img>
                        <img src='./delete.png' alt='' onClick={() => { isOpen('delete') }}></img>
                    </div>
                ),
                size: 60,
            },
        ],
        [],);

    return (
        <div className='table'>
            <h2>Meus contatos</h2>

            <Modal
                isOpen={openModal}
                type={typeModal}
                closeModal={() => setOpenModal(!openModal)}
            />

            <section>
                <Search
                    newUrl={url => setUrl(url)}
                />

                <Button
                    type='new'
                    openModal={() => { isOpen('new') }}
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
            />

            <Button
                type='more'
                page={page}
                pageCount={pageCount}
                newPage={newPage}
            />

        </div>
    )
}

export default Table