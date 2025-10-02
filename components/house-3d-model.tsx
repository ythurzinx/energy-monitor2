"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

function Model({ path }: { path: string }) {
  const gltf = useLoader(GLTFLoader, path);
  return <primitive object={gltf.scene} scale={1} />;
}

export default function House3DModel() {
  const [selectedModel, setSelectedModel] = useState<"sobrado" | "casa">("sobrado");

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Botões de seleção */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setSelectedModel("sobrado")}
          className={`px-4 py-2 rounded ${selectedModel === "sobrado" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Sobrado Tipo PB
        </button>
        <button
          onClick={() => setSelectedModel("casa")}
          className={`px-4 py-2 rounded ${selectedModel === "casa" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Casa Tipo C
        </button>
      </div>

      {/* Canvas 3D */}
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          {selectedModel === "sobrado" ? (
            <Model path="/models/sobrado_tipo_pb.glb" />
          ) : (
            <Model path="/models/casa_tipo_c.glb" />
          )}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
