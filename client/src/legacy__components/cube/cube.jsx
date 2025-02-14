
// this code is partially taken from the website https://blog.olivierlarose.com/tutorials/3d-cube
// adapted for the current project
'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

// import { TextureLoader } from 'three/src/loaders/TextureLoader'; Почитать про Лоадеры и подумать нужны ли они здесь

export default function Page() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })
    const progress = useTransform(scrollYProgress, [0, 1], [0, 5])
    const smoothProgress = useSpring(progress, { damping: 20 });

    return (
        <div ref={container} className="flex justify-center items-center w-full h-full">
            <div className="w-full h-full">
                <Canvas>
                    <OrbitControls enableZoom={true} enablePan={false} />
                    <ambientLight intensity={2} />
                    <directionalLight position={[2, 1, 1]} />
                    <Cube progress={smoothProgress} />
                </Canvas>
            </div>
        </div>
    )
}

function Cube({ progress }) {
    const mesh = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const options = {
        damping: 20
    }

    const mouse = {
        x: useSpring(useMotionValue(0), options),
        y: useSpring(useMotionValue(0), options)
    }

    useFrame((state, delta) => {
        if (!isHovered) {
            mesh.current.rotation.x += delta * 0.25;
            mesh.current.rotation.y += delta * 0.25;
            mesh.current.rotation.z += delta * 0.25;
        }
    });

    const manageMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const { clientX, clientY } = e;
        const x = -0.5 + (clientX / innerWidth)
        const y = -0.5 + (clientY / innerHeight)
        mouse.x.set(x);
        mouse.y.set(y);
    }

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove)
        return () => window.removeEventListener("mouse", manageMouseMove);
    }, [])

    // Video elements
    // const videos = [];
    // for (let i = 0; i < 6; i++) {
    //     const video = document.createElement('video');
    //     video.src = `/cube/test.mp4`;
    //     video.loop = true;
    //     video.muted = true;
    //     video.play();
    //     videos.push(video);
    // }

    // ВАРИАНТ С ОДНИМ ВИДЕО ДЛЯ ТЕСТА
    const video1 = document.createElement('video');
    video1.src = `/cube/test.mp4`;
    video1.loop = true;
    video1.muted = true;
    video1.play();

    const texture_1 = new THREE.VideoTexture(video1);

    // const textures = videos.map(video => {
    //     return new THREE.VideoTexture(video);
    // });

    // const [texture_1, texture_2, texture_3, texture_4, texture_5, texture_6] = textures;

    // Create materials from video textures
    // const materials = textures.map(texture => {
    //     return new THREE.MeshBasicMaterial({ map: texture });
    // });

    // ВАРИАНТ С КАРТИНКАМИ
    // const texture_1 = useLoader(TextureLoader, "/cube/test.jpg")
    // const texture_2 = useLoader(TextureLoader, "/cube/test.jpg")
    // const texture_3 = useLoader(TextureLoader, "/cube/test.jpg")
    // const texture_4 = useLoader(TextureLoader, "/cube/test.jpg")
    // const texture_5 = useLoader(TextureLoader, "/cube/test.jpg")
    // const texture_6 = useLoader(TextureLoader, "/cube/test.jpg")

    // Positions and rotations of the sides
    // const sides = [
    //     { position: [0, 0, 1.5], rotation: [0, 0, 0] }, // Front
    //     { position: [0, 0, -1.5], rotation: [0, Math.PI, 0] }, // Back
    //     { position: [0, 1.5, 0], rotation: [-Math.PI / 2, 0, 0] }, // Top
    //     { position: [0, -1.5, 0], rotation: [Math.PI / 2, 0, 0] }, // Bottom
    //     { position: [1.5, 0, 0], rotation: [0, Math.PI / 2, 0] }, // Right
    //     { position: [-1.5, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // Left
    // ];

    // function handleHoverOverCube(e) {
    //     setIsHovered(true);
    //     e.object.material.opacity = 0.2; // Change opacity to make it visible
    // }

    // function handleHoverOutCube(e) {
    //     setIsHovered(false);
    //     e.object.material.opacity = 0; // Make it transparent
    // }

    // function handleClickOnSide(idx) {
    //     alert(`Clicked side ${idx}`)
    // }

    return (
        <>
            <motion.mesh ref={mesh} rotation-y={progress} rotation-x={progress}>
                {/* args: width, height, depth */}
                <boxGeometry args={[3, 3, 3]} />
                {/* attach - use different textures for different faces */}
                <meshStandardMaterial map={texture_1} attach="material-0" />
                <meshStandardMaterial map={texture_1} attach="material-1" />
                <meshStandardMaterial map={texture_1} attach="material-2" />
                <meshStandardMaterial map={texture_1} attach="material-3" />
                <meshStandardMaterial map={texture_1} attach="material-4" />
                <meshStandardMaterial map={texture_1} attach="material-5" />
            </motion.mesh>


        </>
    )
}


// {sides.map((side, idx) => (
//     <mesh
//         key={idx}
//         position={side.position}
//         rotation={side.rotation}
//         onPointerOver={handleHoverOverCube}
//         onPointerOut={handleHoverOutCube}
//         onClick={() => handleClickOnSide(idx)}>
//         <planeGeometry args={[3, 3]} />
//         <meshBasicMaterial color="blue" transparent opacity={0} />
//     </mesh>
// ))}