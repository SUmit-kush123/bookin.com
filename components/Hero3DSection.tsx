

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Center, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const torusMaterial = new THREE.MeshStandardMaterial({ color: "#0d9488", roughness: 0.3, metalness: 0.7 });
const globeMaterial = new THREE.MeshStandardMaterial({ color: "#f59e0b", wireframe: true });
const textMaterial = new THREE.MeshStandardMaterial({ color: "#fbbf24", roughness: 0.4, metalness: 0.6 });

const Lights = () => {
    const { scene } = useThree();
    useEffect(() => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 2);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-10, -10, -5);
        scene.add(pointLight2);

        return () => {
          scene.remove(ambientLight);
          scene.remove(pointLight1);
          scene.remove(pointLight2);
        };
    }, [scene]);
    return null;
};

const AnimatedLogo: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((_, delta) => {
        if(ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.y += delta * 0.3;
        }
    });
    return (
        <Torus ref={ref} args={[1.2, 0.4, 16, 100]} position={[-4, 0, 0]} material={torusMaterial} />
    );
};

const AnimatedGlobe: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((_, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * 0.15;
        }
    });
    return (
        <Sphere ref={ref} args={[1.5, 32, 32]} position={[4, 0, 0]} material={globeMaterial} />
    );
};

const Hero3DSection: React.FC = () => {
  return (
    <section className="relative bg-neutral-dark text-white py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Experience the Future of Booking
        </h2>
        <p className="text-md sm:text-lg mb-8 max-w-2xl mx-auto drop-shadow-sm opacity-90">
          Explore our services in a new dimension. Interact with our brand like never before.
        </p>
      </div>
      <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://picsum.photos/seed/3d-bg/1920/1080" alt="Abstract background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-neutral-dark/80"></div>
      </div>
      <div className="relative w-full h-[400px] z-10">
        <Canvas camera={{ position: [0, 1, 12], fov: 50 }}>
          <Suspense fallback={null}>
            <Lights />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <AnimatedLogo />

            <Center>
                <Text3D
                    font="https://assets.pmnd.rs/fonts/helvetiker_regular.typeface.json"
                    size={1.2}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    material={textMaterial}
                >
                    Bookin
                </Text3D>
            </Center>
            
            <AnimatedGlobe />

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero3DSection;