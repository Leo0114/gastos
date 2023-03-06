import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from "../helpers/index";
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSubs from "../img/icono_suscripciones.svg";

const montondIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  subs: IconoSubs,
};

const Gasto = ({ gasto, setEditarGasto, eliminarGasto }) => {
  const { categoriaSeclect, nombreGasto, cantidadGasto, fecha, id } = gasto;

  const leadginActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditarGasto(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => eliminarGasto(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList className=" rounded-xl cursor-pointer">
      <SwipeableListItem
        leadingActions={leadginActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra ">
          <div className="contenido-gasto">
            <img src={montondIconos[categoriaSeclect]} alt="" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoriaSeclect}</p>
              <p className="nombre-gasto">{nombreGasto}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidadGasto}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
