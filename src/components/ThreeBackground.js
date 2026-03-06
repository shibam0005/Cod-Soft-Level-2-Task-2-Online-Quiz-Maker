import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e0e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const questionTexture = createQuestionMarkTexture();

    const geometries = [
      new THREE.TorusGeometry(0.5, 0.2, 16, 100),
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.ConeGeometry(0.4, 0.8, 32)
    ];

    const shapes = [];

    for (let i = 0; i < 30; i++) {
      let mesh;
      if (Math.random() < 0.3) {
        // use plane with question mark texture
        const mat = new THREE.MeshBasicMaterial({ map: questionTexture, transparent: true });
        const geo = new THREE.PlaneGeometry(1, 1);
        mesh = new THREE.Mesh(geo, mat);
      } else {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 70%)`),
          roughness: 0.5,
          metalness: 0.3
        });
        mesh = new THREE.Mesh(geo, mat);
      }
      mesh.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      // Store initial rotation values for animation
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      
      scene.add(mesh);
      shapes.push(mesh);
    }
    
    shapesRef.current = shapes;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const point = new THREE.PointLight(0xffffff, 0.8);
    point.position.set(5, 5, 5);
    scene.add(point);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate each shape independently
      shapes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-bg" />;
}

function createQuestionMarkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = '100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ff4081';
  ctx.fillText('?', 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
