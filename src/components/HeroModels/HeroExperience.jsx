import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particales";
import { useInView } from "react-intersection-observer";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    // <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
    //   <ambientLight intensity={0.2} color="#1a1a40" />
    //   <directionalLight intensity={5} position={[5, 5, 5]} />

    //   <OrbitControls
    //     enablePan={false}
    //     enableZoom={!isTablet}
    //     maxDistance={20}
    //     minDistance={5}
    //     minPolarAngle={Math.PI / 5}
    //     maxPolarAngle={Math.PI / 2}
    //   />
     

    //   <HeroLights />
    //   <Particles count={100} />

    //   <group
    //     scale={isMobile ? 0.7 : 1}
    //     position={[0, -3.5, 0]}
    //     rotation={[0, -Math.PI / 4, 0]}
    //   >
    //     <Room />
    //   </group>
    // </Canvas>

    <div ref={ref} style={{ height: "100vh" }}>
      {inView && (
        <Canvas className="pointer-events-none" frameloop="demand" camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.2} color="#1a1a40" />
          <directionalLight intensity={5} position={[5, 5, 5]} />

          <OrbitControls
            enablePan={false}
            enableZoom={!isTablet}
            maxDistance={20}
            minDistance={5}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2}
            makeDefault enableDamping dampingFactor={0.1}
          />

          <HeroLights />
          <Particles count={100} />

          <group
            scale={isMobile ? 0.7 : 1}
            position={[0, -3.5, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          >
            <Room />
          </group>
        </Canvas>
      )}
    </div>
  );
};

export default HeroExperience;

// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useMediaQuery } from "react-responsive";
// import { Room } from "./Room";
// import HeroLights from "./HeroLights";
// import Particles from "./Particales";

// const HeroExperience = () => {
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
//   const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

//   return (
//     <Canvas
//       camera={{ position: [0, 0, 15], fov: 45 }}
//       onCreated={({ gl }) => {
//         gl.setClearColor("#0f0f1a");
//       }}
//     >
//       <ambientLight intensity={0.2} color="#1a1a40" />
//       <directionalLight intensity={5} position={[5, 5, 5]} />

//       {/* ✅ `makeDefault` ensures OrbitControls attach to the right camera */}
//       <OrbitControls
//         makeDefault
//         enablePan={false}
//         enableZoom={!isTablet}
//         maxDistance={20}
//         minDistance={5}
//         minPolarAngle={Math.PI / 5}
//         maxPolarAngle={Math.PI / 2}
//       />

//       <HeroLights />
//       <Particles count={100} />

//       <group
//         scale={isMobile ? 0.7 : 1}
//         position={[0, -3.5, 0]}
//         rotation={[0, -Math.PI / 4, 0]}
//       >
//         <Room />
//       </group>
//     </Canvas>
//   );
// };

// export default HeroExperience;
