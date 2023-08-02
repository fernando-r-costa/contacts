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
    // const [limitPage] = useState(4)
    const [url, setUrl] = useState(``);
    // const [pageCount, setPageCount] = useState()

    const newPage = (newPage) => {
        setPage(page + newPage);
    }

    const [openModal, setOpenModal] = useState(false)
    const [typeModal, setTypeModal] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [fone, setFone] = useState('')

    const isOpen = (isOpen, id, name, fone) => {
        setOpenModal(isOpen);
        setTypeModal(isOpen);
        setId(id);
        setName(name);
        setFone(fone);
    }

    useEffect(() => {
        API
            .get(url)
            .then(function (response) {
                setContacts(response.data);
                // setPageCount(Math.round(response.headers['x-total-count'] / limitPage))
            })
            .catch((err) => {
                console.error("Ocorreu um erro" + err);
            });
    }, []);

    // useEffect(() => {
    //     setUrl(`?_sort=name&_page=${page}&_limit=${limitPage}`)
    // }, [page, openModal])

    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => (
                    <Index
                        letter={row.name[0]}
                    />
                ),
                header: 'Index',
                maxSize: 20,
            },
            {
                id: 'avatar',
                // columnDefType: 'display',
                Cell: () => (
                    <div className='table_avatar'>
                        <img src='./avatar.png' alt=''></img>
                    </div>
                ),
                maxSize: 30,
            },
            {
                accessorFn: (row) => (
                    <div className='table_contato'>
                        <h3>{row.name}</h3>
                        <p>{row.fone}</p>
                    </div>
                ),
                header: 'Nome',
                Header: '',
                maxSize: 100,
            },
            {
                id: 'edit',
                accessorFn: (row) => (
                    <div className='table_edit'>
                        <img src='./edit.png' alt=''
                            onClick={() => { isOpen('edit',row.id, row.name, row.fone) }}
                        ></img>
                        <img src='./delete.png' alt=''
                            onClick={() => { isOpen('delete',row.id, row.name, row.fone) }}
                        ></img>
                    </div>
                ),
                maxSize: 30,
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
                id={id}
                name={name}
                fone={fone}
            />

            <section>
                {/* <Search
                    newUrl={url => setUrl(url)}
                /> */}

                <Button
                    type='new'
                    openModal={() => { isOpen('new') }}
                />
            </section>

            <MaterialReactTable
                columns={columns}
                data={contacts}
                // enableColumnActions={false}
                // enableSorting={false}
                // enableTopToolbar={false}
                // enableTableHead={false}
                // enableBottomToolbar={false}
                // enablePagination={false}
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

            {/* <Button
                type='more'
                page={page}
                pageCount={pageCount}
                newPage={newPage}
            /> */}

        </div>
    )
}

export default Table