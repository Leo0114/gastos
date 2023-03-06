import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlP = ({
  gastosModal,
  setGastosModal,
  presupuesto,
  setPresupuesto,
  setValidP,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastosModal.reduce((total, gasto) => {
      return gasto.cantidadGasto + total;
    }, 0);

    const totalDisponible = presupuesto - totalGastado;

    //Nuevo Porcentaje
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastosModal]);

  //Formatear Cantidad a moneda
  const formatMoney = (cantidad) => {
    return cantidad.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas resetear la app?");
    if (resultado) {
      setGastosModal([]);
      setPresupuesto(0);
      setValidP(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button
          onClick={handleResetApp}
          className="reset-app rounded-full"
          type="button"
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span>
          {formatMoney(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span>
          {formatMoney(disponible)}
        </p>

        <p>
          <span>Gastado:</span>
          {formatMoney(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlP;
