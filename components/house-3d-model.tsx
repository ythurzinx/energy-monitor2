"use client";

import dynamic from "next/dynamic";
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

import { OrbitControls } from "@react-three/drei";
import React, { useState, Suspense } from "react";

export default function House3DModel() {
  const [luzSala, setLuzSala] = useState(false);
  const [portaAberta, setPortaAberta] = useState(false);
  const [portaoAberto, setPortaoAberto] = useState(false);
  const [carroNaGaragem, setCarroNaGaragem] = useState(true);

  return (
    <div className="w-full h-[600px] flex flex-col gap-4">
      {/* Status */}
      <div className="bg-gray-100 p-4 rounded text-sm">
        <p><b>Luz da sala:</b> {luzSala ? "Ligada" : "Desligada"}</p>
        <p><b>Porta:</b> {portaAberta ? "Aberta" : "Fechada"}</p>
        <p><b>Portão:</b> {portaoAberto ? "Aberto" : "Fechado"}</p>
        <p><b>Carro:</b> {carroNaGaragem ? "Na garagem" : "Fora"}</p>
      </div>

      {/* Botões */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setLuzSala(!luzSala)} className="px-3 py-1 bg-blue-500 text-white rounded">
          {luzSala ? "Apagar luz sala" : "Ligar luz sala"}
        </button>
        <button onClick={() => setPortaAberta(!portaAberta)} className="px-3 py-1 bg-green-500 text-white rounded">
          {portaAberta ? "Fechar porta" : "Abrir porta"}
        </button>
        <button onClick={() => setPortaoAberto(!portaoAberto)} className="px-3 py-1 bg-purple-500 text-white rounded">
          {portaoAberto ? "Fechar portão" : "Abrir portão"}
        </button>
        <button onClick={() => setCarroNaGaragem(!carroNaGaragem)} className="px-3 py-1 bg-red-500 text-white rounded">
          {carroNaGaragem ? "Carro sai" : "Carro entra"}
        </button>
      </div>

      {/* Cena 3D */}
      <Canvas shadows camera={{ position: [12, 12, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />

        <Suspense fallback={null}>
          <group>
            {/* Terreno */}
            <mesh position={[0, -0.5, 0]} receiveShadow>
              <boxGeometry args={[30, 1, 30]} />
              <meshStandardMaterial color="#4CAF50" />
            </mesh>

            {/* Casa */}
            <mesh position={[0, 1, 0]} castShadow>
              <boxGeometry args={[6, 2, 6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Telhado */}
            <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[5, 2, 4]} />
              <meshStandardMaterial color="#b22222" />
            </mesh>

            {/* Porta */}
            <mesh position={[portaAberta ? -2 : 0, 0.5, 3.05]}>
              <boxGeometry args={[1, 1.5, 0.1]} />
              <meshStandardMaterial color="#654321" />
            </mesh>

            {/* Luz da sala */}
            {luzSala && (
              <pointLight position={[0, 2, 0]} intensity={2} distance={10} color="yellow" />
            )}

            {/* Portão garagem */}
            <mesh position={[8, portaoAberto ? 2 : 0.5, 0]}>
              <boxGeometry args={[0.2, 3, 6]} />
              <meshStandardMaterial color="#555" />
            </mesh>

            {/* Carro */}
            {!carroNaGaragem && (
              <group position={[12, 0.6, 0]}>
                <mesh>
                  <boxGeometry args={[2, 0.6, 1]} />
                  <meshStandardMaterial color="#0000ff" />
                </mesh>
                {[
                  [0.8, -0.3, 0.5],
                  [-0.8, -0.3, 0.5],
                  [0.8, -0.3, -0.5],
                  [-0.8, -0.3, -0.5],
                ].map((pos, i) => (
                  <mesh key={i} position={pos}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
                    <meshStandardMaterial color="#333" />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

