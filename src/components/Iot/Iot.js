import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import TemperatureDisplay from './TemperatureDisplay';
import HumidityDisplay from './HumidityDisplay';
import TemperatureChart from "./TemperatureChart";
import HumidityChart from './HumidityChart';
import './Iot.css'

const Iot = () => {
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const client = mqtt.connect('ws://172.16.15.64:8080');

        client.on('connect', () => {
            console.log('Connected to Node.js MQTT broker via WebSocket');
            setConnected(true);

            client.subscribe('home/dht22', (err) => {
                if (!err) {
                    console.log('Subscribed to topic: home/dht22');
                } else {
                    console.error('Error subscribing:', err);
                }
            });
        });

        client.on('message', (topic, message) => {
            if (topic === 'home/dht22') {
                const payload = message.toString();
                console.log('Received message:', payload);

                const data = JSON.parse(payload);
                setTemperature((prev) => [...prev.slice(-29), data.temperature]);
                // setTemperature(data.temperature);
                setHumidity(data.humidity);
            }
        });

        client.on('close', () => {
            console.log('Disconnected from MQTT broker');
            setConnected(false);
        });

        client.on('error', (error) => {
            console.error('MQTT connection error:', error);
            setConnected(false);
        });

        return () => {
            client.end();
        };
    }, []);

    return (
        <div className='main-container'>
            <h2>Temperature & Humidity</h2>
            {connected ? <p>Connected to broker!</p> : <p>Disconnected from broker</p>}

            {/* Phần hiển thị nhiệt độ và độ ẩm */}
            <div style={{ display: 'flex', gap: '675px', justifyContent: 'center', width: '100%' }}>
                <TemperatureDisplay temperature={temperature} />
                <HumidityDisplay humidity={humidity} />
            </div>

            {/* Phần hiển thị biểu đồ nhiệt độ và độ ẩm */}
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', width: '100%' }}>
                <TemperatureChart temperature={temperature} />
                <HumidityChart humidity={humidity} />
            </div>
        </div>

    );
}

export default Iot;
