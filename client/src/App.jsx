import {EthProvider} from "./contexts/EthContext";
import './App.css';
import Maison from "./Maison";
import {useRef, useState} from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei'
import useEth from "./contexts/EthContext/useEth";

function App() {
    // const { state } = useEth();
    // const [value, setValue] = useState("?");

    return (
        <EthProvider>
            <div id="canvas-container">
                <Canvas>
                    <ambientLight intensity={0.1}/>
                    <directionalLight color="red" position={[0, 0, 5]}/>
                    <mesh>
                        {/*<Maison contract={state.contract}>*/}{/*</Maison>*/}
                        <OrbitControls/>
                    </mesh>
                </Canvas>
            </div>
        </EthProvider>
    );
}

export default App;
