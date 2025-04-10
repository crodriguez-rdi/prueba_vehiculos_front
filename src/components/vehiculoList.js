import React, { useState, useEffect } from 'react';

const VehiculoList = () => {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = () => {
        fetch('https://localhost:5000/Vehiculos')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => setVehiculos(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const eliminarVehiculo = (id) => {
        fetch(`https://localhost:5000/Vehiculos/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*'
            }
        })
            .then(response => {
                if (response.status === 204) {
                    setVehiculos(vehiculos.filter(v => v.id !== id));
                } else {
                    throw new Error(`Error al eliminar. Status: ${response.status}`);
                }
            })
            .catch(error => console.error('Error al eliminar vehículo:', error));
    };

    return (
        <div>
            <h1>Lista de Vehículos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Color</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map(vehiculo => (
                        <tr key={vehiculo.id}>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.año}</td>
                            <td>{vehiculo.color}</td>
                            <td>
                                <button onClick={() => eliminarVehiculo(vehiculo.id)} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehiculoList;
