import React, { useState } from 'react';

const VehiculoNew = ({ addVehiculo }) => {
    
    const [vehiculo, setVehiculo] = useState({
        marca: '',
        modelo: '',
        año: '',
        color: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar recargar la página al enviar el formulario

        // Validación básica
        if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.año || !vehiculo.color) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('Id', 0); // Aquí se debe añadir un ID, puedes ajustarlo según sea necesario
        formData.append('Marca', vehiculo.marca);
        formData.append('Modelo', vehiculo.modelo);
        formData.append('Año', vehiculo.año);
        formData.append('Color', vehiculo.color);

        fetch('https://localhost:5000/Vehiculos', {
            method: 'POST',
            headers: {
                'accept': 'application/json', // Para que el servidor sepa que esperamos respuesta en JSON
            },
            body: formData, // Usamos FormData en lugar de JSON.stringify
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setVehiculo({ marca: '', modelo: '', año: '', color: '' }); // Limpiar el formulario
                addVehiculo(data); // Llamar a la función `addVehiculo` para actualizar la lista
            })
            .catch(error => console.error('Error al agregar vehículo:', error));
    };

    return (
        <div>
            <h1>Nuevo Vehículo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Marca"
                    value={vehiculo.marca}
                    onChange={(e) => setVehiculo({ ...vehiculo, marca: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={vehiculo.modelo}
                    onChange={(e) => setVehiculo({ ...vehiculo, modelo: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Año"
                    value={vehiculo.año}
                    onChange={(e) => setVehiculo({ ...vehiculo, año: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={vehiculo.color}
                    onChange={(e) => setVehiculo({ ...vehiculo, color: e.target.value })}
                />
                <button type="submit">Agregar Vehículo</button>
            </form>
        </div>
    );
};

export default VehiculoNew;
