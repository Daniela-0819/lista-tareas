"use client";
import React from "react";

export default function Tarea({ tarea, onCompletar, onEliminar }) {
  return (
    <div>
      <p>{tarea.descripcion}</p>
      <p>{tarea.fecha}</p>
      <p>{tarea.hecha ? "Hecha" : "Pendiente"}</p>
      <button onClick={() => onCompletar(tarea.id)}>Marcar como hecha</button>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </div>
  );
}
