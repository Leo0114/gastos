import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers/index";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastosModal, setGastosModal] = useState(
    localStorage.getItem("gastosModal")
      ? JSON.parse(localStorage.getItem("gastosModal"))
      : []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  useEffect(() => {}, [gastosModal]);

  const [validP, setValidP] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }
  }, [editarGasto]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastosModal", JSON.stringify(gastosModal) ?? []);
  }, [gastosModal]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLS > 0) {
      setValidP(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastosModal.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastosModal.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastosModal(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastosModal([...gastosModal, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 200);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastosModal.filter((gasto) => gasto.id !== id);
    setGastosModal(gastosActualizados);
    setEditarGasto({});
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastosModal={gastosModal}
        setGastosModal={setGastosModal}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validP={validP}
        setValidP={setValidP}
      />
      {validP && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastosModal={gastosModal}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto cursor-pointer">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
