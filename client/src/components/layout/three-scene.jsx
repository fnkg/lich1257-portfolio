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

        //=== TEST ZONE ===//

        // 1) Создаём внешний овал "пятачка"
        const pigSnoutShape = new THREE.Shape();
        // absellipse(cx, cy, xRadius, yRadius, startAngle, endAngle, clockwise, rotationOffset)
        pigSnoutShape.absellipse(
            0, // cx = центр по оси X
            0, // cy = центр по оси Y
            50, // xRadius
            30, // yRadius
            0,
            Math.PI * 2,
            false,
            0
        );

        // 2) Создаём два овала-«ноздри» внутри, каждый как Path
        const leftNostril = new THREE.Path();
        leftNostril.absellipse(
            -15, // смещение по X влево
            0, // центр по Y
            10, // xRadius для ноздри
            15, // yRadius для ноздри
            0,
            Math.PI * 2,
            false,
            0
        );

        const rightNostril = new THREE.Path();
        rightNostril.absellipse(
            15, // смещение по X вправо
            0, // центр по Y
            10,
            15,
            0,
            Math.PI * 2,
            false,
            0
        );

        // Добавляем «ноздри» в holes, чтобы при экструзии они вырезались из формы
        pigSnoutShape.holes.push(leftNostril, rightNostril);

        // 3) Настройки экструзии
        const extrudeSettingsPig = {
            steps: 2, // количество сегментов вдоль глубины
            depth: 10, // глубина выдавливания
            bevelEnabled: true, // включаем скос по краям
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 2,
        };

        // 4) Экструдируем 2D-фигуру в 3D
        const pigSnoutGeometry = new THREE.ExtrudeGeometry(
            pigSnoutShape,
            extrudeSettingsPig
        );

        // Для удобства позиционирования сдвигаем геометрию, чтобы её центр совпадал с (0,0,0)
        pigSnoutGeometry.center();

        // 5) Создаём меш с материалом в виде каркаса (wireframe) и белым цветом
        const pigSnoutMesh = new THREE.Mesh(
            pigSnoutGeometry,
            new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        );

        // 6) Добавляем в сцену
        //   scene.add(pigSnoutMesh);

        //=== TEST ZONE ===//

        // Создаем 2D фигуру сердца
        // Вариант 1: Классическое сердце
        // const heartShape = new THREE.Shape();
        // heartShape.moveTo(25, 25);
        // heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
        // heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
        // heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
        // heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
        // heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
        // heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

        // Вариант 2: Кодпен
        const heartShape2 = new THREE.Shape();
        heartShape2.moveTo(70, 40);
        heartShape2.bezierCurveTo(45, 0, 0, 60, 70, 95);
        heartShape2.bezierCurveTo(140, 60, 95, 0, 70, 40);

        // Настройки экструдера для создания 3D фигуры
        const extrudeSettings = {
            steps: 2,
            depth: 10,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1,
        };

        // Создаем 3D геометрию сердца
        const heartGeometry = new THREE.ExtrudeGeometry(
            heartShape2,
            extrudeSettings
        );
        // Центрируем и переворачиваем геометрию
        heartGeometry.center();
        heartGeometry.rotateZ(Math.PI);

        // Создаем меш с заданной геометрией и материалом
        const mesh3 = new THREE.Mesh(
            heartGeometry,
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        );

        // Пример меша
        mesh = new THREE.Mesh(
            new THREE.SphereGeometry(100, 16, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        );
        scene.add(mesh);

        // const mesh2 = new THREE.Mesh(
        //     new THREE.SphereGeometry(50, 16, 8),
        //     new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        // );
        pigSnoutMesh.position.y = 150;
        mesh.add(pigSnoutMesh);

        // const mesh3 = new THREE.Mesh(
        //     new THREE.SphereGeometry(5, 16, 8),
        //     new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        // );
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

            mesh.position.x = 700 * Math.cos(r);
            mesh.position.z = 700 * Math.sin(r);
            mesh.position.y = 700 * Math.sin(r);

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
            renderer.setClearColor(0x000000, 1);
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
