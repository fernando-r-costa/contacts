import "./Table.css";
import API from "../../Services/api.js";
import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import Search from "../Search";
import Button from "../Button";
import Index from "../Index";
import Modal from "../Modal";

const Table = () => {
  const [contacts, setContacts] = useState([]);
  const [option, setOption] = useState("");
  const [search, setSearch] = useState("");

  let filterContacts = contacts;

  if (option === "name") {
    filterContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search)
    );
  } else if (option === "fone") {
    filterContacts = contacts.filter((contact) =>
      contact.fone.includes(search)
    );
  }

  // const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(4);
  const [url, setUrl] = useState(`?_sort=name&_page=1&_limit=${limitPage}`);
  const [pageCount, setPageCount] = useState();

  const morePage = (morePage) => {
    setLimitPage(limitPage + morePage);
  };

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [fone, setFone] = useState("");

  const isOpen = (isOpen, id, name, fone) => {
    setOpenModal(isOpen);
    setTypeModal(isOpen);
    setId(id);
    setName(name);
    setFone(fone);
  };

  useEffect(() => {
    API.get(url)
      .then(function (response) {
        setContacts(response.data);
        setPageCount(response.headers["x-total-count"]);
      })
      .catch((err) => {
        console.error("Ocorreu um erro" + err);
      });
  }, [url]);

  useEffect(() => {
    setUrl(`?_sort=name&_page=1&_limit=${limitPage}`);
  }, [limitPage, openModal]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => <Index letter={row.name[0]} />,
        header: "Index",
        maxSize: 20,
      },
      {
        id: "avatar",
        // columnDefType: 'display',
        Cell: () => (
          <div className="table_avatar">
            <img src="./avatar.png" alt=""></img>
          </div>
        ),
        header: "Avatar",
        maxSize: 30,
      },
      {
        accessorFn: (row) => (
          <div className="table_contato">
            <h3>{row.name}</h3>
            <p>{row.fone}</p>
          </div>
        ),
        header: "Nome",
        maxSize: 100,
      },
      {
        id: "edit",
        accessorFn: (row) => (
          <div className="table_edit">
            <img
              src="./edit.png"
              alt=""
              onClick={() => {
                isOpen("edit", row.id, row.name, row.fone);
              }}
            ></img>
            <img
              src="./delete.png"
              alt=""
              onClick={() => {
                isOpen("delete", row.id, row.name, row.fone);
              }}
            ></img>
          </div>
        ),
        header: "Editar",
        maxSize: 30,
      },
    ],
    []
  );

  if (contacts.length <= 0) {
    return (
      <div className="div_loader">
        <div className="custom_loader"></div>
      </div>
    )
  } else {
    return (
      <div className="table">
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
          <Search
            // newUrl={url => setUrl(url)}
            option={(option) => setOption(option)}
            search={(search) => setSearch(search.toLowerCase())}
          />

          <Button
            type="new"
            openModal={() => {
              isOpen("new");
            }}
          />
        </section>

        <MaterialReactTable
          columns={columns}
          data={filterContacts}
          enableColumnActions={false}
          enableSorting={false}
          enableTopToolbar={false}
          enableTableHead={false}
          enableBottomToolbar={false}
          enablePagination={false}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              border: "transparent",
            },
          }}
          muiTableBodyProps={{
            sx: {
              "& td:nth-of-type(1)": {
                borderBottom: "transparent",
                paddingLeft: "0",
              },
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: "1px solid #F2F2F2",
            },
          }}
        />

        <Button
          type="more"
          limitPage={limitPage}
          pageCount={pageCount}
          morePage={morePage}
        />
      </div>
    );
  }
}



export default Table;
