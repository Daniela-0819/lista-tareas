"use client";
import React from "react";
import estilo from "./tarea.module.css";

export default function Tarea({ tarea, onCompletar, onEliminar }) {
  return (
    <div className={estilo.tarea}>
      <div className={estilo.tarea__info}>
        <input
          type="checkbox"
          checked={tarea.hecha}
          onChange={() => onCompletar(tarea.id)}
          className={estilo.checkbox}
        />
        <div className={estilo.textos}>
          <strong
            className={estilo.descripcion}
            style={{ textDecoration: tarea.hecha ? "line-through" : "none" }}
          >
            {tarea.descripcion}
          </strong>
          <span className={estilo.fecha}>{tarea.fecha}</span>
        </div>
      </div>
      <button className={estilo.boton_eliminar} onClick={() => onEliminar(tarea.id)}>
        Eliminar
      </button>
    </div>
  );
}
