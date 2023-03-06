import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastosModal,
  setEditarGasto,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className=" listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos"
              : "No Hay Gastos en esta categoría"}
          </h2>

          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastosModal.length ? "Gastos" : "Aun no Hay Gastos"}</h2>
          {gastosModal.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
