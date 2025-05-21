"use client";
import { useEffect, useState } from "react";
import React from "react";
import Tarea from "./components/Tarea";
import styles from "./style.module.css";

export default function Page() {
  const [tareas, setTareas] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pendientes, setPendientes] = useState(0);
  const [hechas, setHechas] = useState(0); // Nuevo estado para contar tareas hechas
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Actualizar conteo de pendientes y hechas cuando cambian las tareas
  useEffect(() => {
    const totalPendientes = tareas.filter((t) => !t.hecha).length;
    const totalHechas = tareas.filter((t) => t.hecha).length;
    setPendientes(totalPendientes);
    setHechas(totalHechas);
  }, [tareas]);

  useEffect(() => {
    if (filtro === "pendientes") {
      setTareasFiltradas(tareas.filter((t) => !t.hecha));
    } else if (filtro === "hechas") {
      setTareasFiltradas(tareas.filter((t) => t.hecha));
    } else {
      setTareasFiltradas(tareas);
    }
  }, [filtro, tareas]);

  function agregarTarea() {
    if (descripcion.trim() === "" || fecha === "") {
      alert("Por favor completa la descripción y la fecha.");
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      descripcion: descripcion,
      fecha: fecha,
      hecha: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setDescripcion("");
    setFecha("");
  }

  function completarTarea(id) {
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, hecha: !t.hecha } : t
    );
    setTareas(nuevasTareas);
  }

  function eliminarTarea(id) {
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.form}>
        <h1>Agregar nueva tarea</h1>

        <div className={styles.descripcion}>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <br />

        <div className={styles.fecha}>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}/>
        </div>

        <br />

        <div className={styles.botonAgregar}>
        <button onClick={agregarTarea}>Agregar Tarea</button>
        </div>
        <br />
      </div>

      <div className={styles.result}>
        <h1>Tareas</h1>
        <div className={styles.botones_Lista}>
          <button onClick={() => setFiltro("")}>Todas</button>
          <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
          <button onClick={() => setFiltro("hechas")}>Hechas</button>
        </div>
        <div className={styles.total}>
        <p>Tareas pendientes: {pendientes}</p>
        <p>Tareas hechas: {hechas}</p>{" "}
        </div>
        <ul>
          {tareasFiltradas.map((tarea) => (
            <li key={tarea.id}>
              <Tarea
                tarea={tarea}
                onCompletar={completarTarea}
                onEliminar={eliminarTarea}
              />
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}
