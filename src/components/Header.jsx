import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlP from "./ControlP";

const Header = ({
  gastosModal,
  setGastosModal,
  presupuesto,
  setPresupuesto,
  validP,
  setValidP,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {validP ? (
        <ControlP
          gastosModal={gastosModal}
          setGastosModal={setGastosModal}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidP={setValidP}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidP={setValidP}
        />
      )}
    </header>
  );
};

export default Header;
