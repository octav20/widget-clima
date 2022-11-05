import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from "./WeatherApp.module.css";
import Loading from "./Loading";
export default function WeatherApp() {
    {/* Creamos el estado el cual almacenara un objeto */}
    const [weather, setWeather] = useState(null);
    {/* Creamos un useEffect() para que cada vez que se recargue la pagina
        se llama a la funcion loadInfo() */}
    useEffect(()=>{
        loadInfo();
    },[]);

    {/* Creamos otro useEfeffect() para que cada vez que el estado "weather" cambie
        el titulo de la pagina cambie a "Weather | (nombre del lugar que se introduzco)" */}
    useEffect(()=>{
        document.title= `Weather | ${weather?.location.name ?? ""}`;
    },[weather])

    {/* Creamos la funcion asincronica loadInfo() con un parametro llamado city que por defecto
        sera igual a "london"  */}
    async function loadInfo(city= "london"){
       try {
           /* Creamos una constante llamda "request" para guardar la respuesta obtenida por
                llamar a la funcion fetch(), los paramatros pasados al 
                fetch se que son para llamar a la api, sin embargo desconozco
                esta manera de llamar a la api !INVESTIGAR!  */ 
           const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`); 
           /* Creamos la constante "json" ´para guardar la respuesta convertida a json con el
                metodo json(), cabe destacar que las 2 constantes anteriores son precedidas por 
                un await */ 
           const json = await request.json();
           //Actualizamos el estado "weather" con el json
           setWeather(json);
           console.log(json);

           setTimeout(() => {
            setWeather({ ...json });
          }, 2000);
       } catch (error) {

        console.error(error);
        
       } 
    }
    /* La funcion handleChangeCity() se ejecutara cada vez que se haga un submit, esta funcion
        tiene como parametro a city, lo primero que hara la funcion es actualizar el estado
        "weather" a null, esto permitira cargar otro objeto con la informacion de la 
        nueva ciudad, por el ultima la funcion llama a la funcion loadInfo() pasandole el
        parametro city  */
    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city)
    }
    /* El componente <WeatherApp/> retorna un div con el componente <WeatherForm/> el cual
        es un formulario, ademas este componente realiza un operacion ternaria, si "weather"
        es true regresa el componente <WeatherMainInfo/>, en caso contrario regresa el 
        componente <Loading/>  */
    return (
        // En este div se implementa una forma desconocida para mi de implementar css
        <div className={styles.weatherContainer}> 
            <WeatherForm onChangeCity={handleChangeCity} />
            {weather ? <WeatherMainInfo weather={weather}/>: <Loading />}
            
        </div>
    );
}