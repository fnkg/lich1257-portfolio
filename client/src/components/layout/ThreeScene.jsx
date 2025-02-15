import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let container = containerRef.current;
        let camera, scene, renderer, mesh;
        let cameraRig, activeCamera;
        let cameraPerspective, cameraOrtho;
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        const frustumSize = 600;

        // Создание сцены
        scene = new THREE.Scene();

        // Создание основных камер
        camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
        camera.position.z = 2500;

        cameraPerspective = new THREE.PerspectiveCamera(
            50,
            0.5 * aspect,
            150,
            1000
        );

        cameraOrtho = new THREE.OrthographicCamera(
            (0.5 * frustumSize * aspect) / -2,
            (0.5 * frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            150,
            1000
        );

        activeCamera = cameraPerspective;

        // Корректировка ориентации камер
        cameraOrtho.rotation.y = Math.PI;
        cameraPerspective.rotation.y = Math.PI;

        // Группа для камер
        cameraRig = new THREE.Group();
        cameraRig.add(cameraPerspective);
        cameraRig.add(cameraOrtho);
        scene.add(cameraRig);

        // Пример меша
        mesh = new THREE.Mesh(
            new THREE.SphereGeometry(100, 16, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        );
        scene.add(mesh);

        const mesh2 = new THREE.Mesh(
            new THREE.SphereGeometry(50, 16, 8),
            new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        );
        mesh2.position.y = 150;
        mesh.add(mesh2);

        const mesh3 = new THREE.Mesh(
            new THREE.SphereGeometry(5, 16, 8),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        );
        mesh3.position.z = 150;
        cameraRig.add(mesh3);

        // Частицы
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 60000; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
            vertices.push(THREE.MathUtils.randFloatSpread(1700)); // y
            vertices.push(THREE.MathUtils.randFloatSpread(1700)); // z
        }
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );
        const particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({ color: 0xff0000 })
        );
        scene.add(particles);

        // Создание рендерера
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.setScissorTest(true);
        container.appendChild(renderer.domElement);

        // Обработчик изменения размера окна
        function onWindowResize() {
            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = window.innerHeight;
            aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

            camera.aspect = 0.5 * aspect;
            camera.updateProjectionMatrix();

            cameraPerspective.aspect = 0.5 * aspect;
            cameraPerspective.updateProjectionMatrix();

            cameraOrtho.left = (-0.5 * frustumSize * aspect) / 2;
            cameraOrtho.right = (0.5 * frustumSize * aspect) / 2;
            cameraOrtho.top = frustumSize / 2;
            cameraOrtho.bottom = -frustumSize / 2;
            cameraOrtho.updateProjectionMatrix();
        }
        window.addEventListener("resize", onWindowResize);

        // Обработчик нажатий клавиш для переключения камер
        function onKeyDown(event) {
            switch (event.keyCode) {
                case 79: // O
                    activeCamera = cameraOrtho;
                    activeHelper = cameraOrthoHelper;
                    break;
                case 80: // P
                    activeCamera = cameraPerspective;
                    break;
            }
        }
        document.addEventListener("keydown", onKeyDown);

        // Анимация и рендеринг
        function animate() {
            render();
            requestAnimationFrame(animate);
        }
        function render() {
            const r = Date.now() * 0.0005;

            mesh.position.x = 900 * Math.cos(r);
            mesh.position.z = 500 * Math.sin(r);
            mesh.position.y = 200 * Math.sin(r);

            // Анимация дочернего объекта
            if (mesh.children[0]) {
                mesh.children[0].position.x = 70 * Math.cos(2 * r);
                mesh.children[0].position.z = 70 * Math.sin(r);
            }
            if (activeCamera === cameraPerspective) {
                cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
                cameraPerspective.far = mesh.position.length();
                cameraPerspective.updateProjectionMatrix();
            } else {
                cameraOrtho.far = mesh.position.length();
                cameraOrtho.updateProjectionMatrix();
            }

            cameraRig.lookAt(mesh.position);

            // левая часть
            renderer.setClearColor(0x000000, 1);
            renderer.setScissor(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
            renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
            renderer.render(scene, activeCamera);
            // правая часть
            renderer.setClearColor(0x111111, 1);
            renderer.setScissor(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
            renderer.setViewport(
                SCREEN_WIDTH / 2,
                0,
                SCREEN_WIDTH / 2,
                SCREEN_HEIGHT
            );
            renderer.render(scene, camera);
        }
        animate();

        // Очистка при размонтировании компонента
        return () => {
            window.removeEventListener("resize", onWindowResize);
            document.removeEventListener("keydown", onKeyDown);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="absolute" />;
};

export default ThreeScene;
