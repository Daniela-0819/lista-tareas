"use client";
import React from "react";
import estilo from "./tarea.module.css";

export default function Tarea({ tarea, onCompletar, onEliminar }) {
  return (
    <div className={estilo.tarea}>
      <div className={estilo.tarea__info}>
      <p>{tarea.descripcion}</p>
      <p>{tarea.fecha}</p>
      <p>{tarea.hecha ? "Hecha" : "Pendiente"}</p>
      </div>
      <div className={estilo.botones}>
      <div className={estilo.boton_completar}>
      <button onClick={() => onCompletar(tarea.id)}>Marcar como hecha</button>
      </div>
      <div className={estilo.boton_eliminar}>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
      </div>
      </div>
    </div>
  );
}
