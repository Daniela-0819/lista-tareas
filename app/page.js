//al usar useState y useEffect, que solo funcionan en componentes cliente (en el navegador) debo poner esa linea.
"use client";
import { useEffect, useState } from "react";
import React from 'react';
import Tarea from "./components/Tarea";
import styles from './style.module.css';

export default function Page() {

  const [tareas, setTareas] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [filtro, setFiltro] = useState("");//este es para filtrar las tareas pendientes y las hechas

  //use efect
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas)); //convierte el texto en un arreglo
    }
  }, []);

  //este es para convertir el arreglo en un texto con formato JSON.stringfy
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    // Aquí luego pondremos código para actualizar la lista filtrada
  }, [filtro]);

  useEffect(() => {
    const pendientes = tareas.filter(t => !t.hecha).length;//aca la t es una variable temporal
    console.log(`Tienes ${pendientes} tareas pendientes`);

  }, [tareas]);

  //funcion para poder agregar las tareas
  function agregarTarea() {
    const nuevaTarea = {
      id: Date.now(),
      descripcion: descripcion,
      fecha: fecha,
      hecha: false
    };

    setTareas([...tareas, nuevaTarea]);
    setDescripcion("");
    setFecha("");
  }

  function calificarTarea() {
    const hecha = true;

  }

  //el return debe quedar dentro de la funcion, si no, no da
  return (
    <div className={styles.contenedor}>
      <div className={styles.form}>
        <h1>Agregar nueva tarea</h1>
        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} /><br></br>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} /><br></br>
        <button onClick={agregarTarea}>Agregar Tarea</button><br></br>
        <button onClick={calificarTarea}>Marcar como hecha</button>
      </div>

      <div className={styles.result}>
        <h1>Tareas</h1>
        <ul>
          {tareas.map(tarea => (
            <li key={tarea.id}>
              {tarea.descripcion} - {tarea.fecha} - {tarea.hecha ? "Hecha" : "Pendiente"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
