import "./Button.css";

const Button = (props) => {
  const morePage = () => {
    props.morePage(4);
  };

  const openModal = (type) => {
    if (props.type === "save") {
      props.onSave();
      props.openModal(true, "loading");
    }
    props.openModal(true, type);
  };

  if (props.type === "new") {
    return (
      <button
        className="table_search_button_new"
        onClick={openModal}>
        <img src="./plus.png" alt=""></img>
        <span>Novo contato</span>
      </button>
    );
  } else if (props.type === "save") {
    return (
      <button
        className="table_modal_add_button_save"
        onClick={openModal}>
        Salvar
      </button>
    );
  } else if (props.type === "update") {
    return (
      <button
        className="table_modal_edit_button_save"
        onClick={props.onUpdate}>
        Salvar
      </button>
    );
  } else if (props.type === "addCancel") {
    return (
      <button
        className="table_modal_add_button_cancel"
        onClick={props.closeModal}
      >
        Cancelar
      </button>
    );
  } else if (props.type === "confirm") {
    return (
      <button
        className="table_modal_delete_button_confirm"
        onClick={props.onDelete}
      >
        Confirmar
      </button>
    );
  } else if (props.type === "deleteCancel") {
    return (
      <button
        className="table_modal_delete_button_cancel"
        onClick={props.closeModal}
      >
        Cancelar
      </button>
    );
  } else if (props.type === "more") {
    if (props.limitPage >= props.pageCount) {
      return (
        <button className="table_button_more_disable">Carregar mais</button>
      );
    } else {
      return (
        <button className="table_button_more_able" onClick={morePage}>
          Carregar mais
        </button>
      );
    }
  } else if (props.type === "ok") {
    return (
      <button
        className="table_modal_delete_button_confirm"
        onClick={props.closeModal}
      >
        OK
      </button>
    );
  }
};

export default Button;
