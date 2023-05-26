import {useRef, useState} from 'react'
import './App.css';
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import Web3 from "web3";

async function init() {
    const artifact = require("./contracts/NFTMetaverse.json");

    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();
    const {abi} = artifact;

    let address, contract;
    try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
    } catch (err) {
        console.error(err);
    }

    return {
        "contract": contract,
        "address": address
    }
}

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

async function App() {
    const {contract, address} = await init();

    return (
        <div id="canvas-container">
            <Canvas>
                <ambientLight intensity={0.1}/>
                <directionalLight color="red" position={[0, 0, 5]}/>
                <mesh>
                    <Box position={[-1.2, 0, 0]}/>
                    <Box position={[1.2, 0, 0]}/>
                    <OrbitControls/>
                </mesh>
            </Canvas>
        </div>
    );
}

export default App;
