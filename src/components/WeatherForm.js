import { useState } from "react";
import styles from "./WeatherForm.module.css";
export default function WeatherForm({onChangeCity}){
    /* Creamos el estado "city" que por defecto es un strig vacio, este estado almacenara
        el valor de nuestro input */
    const [city, setCity] = useState("");

    /* La funcion onChange() tiene como parametro un evento, crearemos una constante
        llamada "value" que sera igual al valor de nuestro input.
        En la declaracion if, se establece que si "value" es diferente de "" se actualize
        el estado "city" con "value" en caso de retornar un false no se hara nada */
    function onChange(e){
        const value = e.target.value;

        if(value !== ""){
            setCity(value);
        }
    }
    /* La funcion handleSubmit() tiene como parametro un evento, con preventDefault() 
        evitamos el comportamiento por defecto del formulario, por ultimo la funcion
        llama a onChangeCity() para cambiar el objeto del estado "weather" */
    function handleSubmit(e){
        e.preventDefault();

        onChangeCity(city);
    }
    return(
        <form action="" onSubmit={handleSubmit} className={styles.container} >
            <input type="text" onChange={onChange} className={styles.input} />
        </form>

    );
}