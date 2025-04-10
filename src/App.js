import React, { useState, useEffect } from 'react';
import VehiculoList from './components/vehiculoList';
import VehiculoNew from './components/vehiculoNew';

const App = () => {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        // Obtener la lista de vehículos desde la API
        fetch('https://localhost:5000/Vehiculos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setVehiculos(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Función para agregar un nuevo vehículo
    const addVehiculo = (nuevoVehiculo) => {
        setVehiculos((prevVehiculos) => [...prevVehiculos, nuevoVehiculo]);
    };

    return (
        <div>
            <VehiculoNew addVehiculo={addVehiculo} />
            <VehiculoList vehiculos={vehiculos} />
        </div>
    );
};

export default App;
