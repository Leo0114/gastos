import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  editarGasto,
  setEditarGasto,
}) => {
  const [mensajeForm, setMensajeForm] = useState("");
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setCantidadGasto] = useState("");
  const [categoriaSelect, setCategoriaSelect] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setNombreGasto(editarGasto.nombreGasto);
      setCantidadGasto(editarGasto.cantidadGasto);
      setCategoriaSelect(editarGasto.categoriaSelect);
      setFecha(editarGasto.fecha);
      setId(editarGasto.id);
    }
  }, []);

  const hideModal = () => {
    setAnimarModal(false);
    setEditarGasto({});
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombreGasto, cantidadGasto, categoriaSelect].includes("")) {
      setMensajeForm("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensajeForm("");
      }, 3000);
      return;
    }
    guardarGasto({ nombreGasto, cantidadGasto, categoriaSelect, id, fecha });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal cursor-pointer">
        <img src={CerrarBtn} alt="Cerrar modal" onClick={hideModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>
          {editarGasto.nombreGasto ? "Editar Gasto" : "Nuevo Gasto"}
        </legend>
        {mensajeForm && <Mensaje tipo="error">{mensajeForm}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
          />
        </div>
        
        <div className=" campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto del gasto: $300"
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoriaSelect}
            onChange={(e) => setCategoriaSelect(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subs">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={editarGasto.nombreGasto ? "Guardar Cambios" : "Añadir Gasto"}
          className=" rounded-full "
        />
      </form>
    </div>
  );
};

export default Modal;
