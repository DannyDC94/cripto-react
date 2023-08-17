import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import styled from "@emotion/styled";
import ImageCripto from "./assets/img/imagen-criptos.png";

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const ContenedorSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15%;
`

function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
    if(Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});
        const {moneda, criptomoneda} = monedas;
        const urlCripto = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const response = await fetch(urlCripto);
        const result = await response.json()
        setCargando(false);
        setResultado(result.DISPLAY[criptomoneda][moneda]);
      }
      cotizarCripto();
    }
  },[monedas])

  return (
    <Contenedor>
      <Imagen src={ImageCripto} alt="imagenes cripto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas}/>
        <ContenedorSpinner>
          {cargando && <Spinner/>}
        </ContenedorSpinner>
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  );
}

export default App;
