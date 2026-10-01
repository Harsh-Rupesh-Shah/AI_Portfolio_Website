import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 44);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLightEmerald = new THREE.DirectionalLight(0x10b981, 2.2);
    dirLightEmerald.position.set(25, 30, 25);
    scene.add(dirLightEmerald);

    const dirLightDark = new THREE.DirectionalLight(0x0f172a, 1.5);
    dirLightDark.position.set(-25, -20, -15);
    scene.add(dirLightDark);

    const pointLightCore = new THREE.PointLight(0x34d399, 3.5, 30);
    pointLightCore.position.set(0, 0, 0);
    scene.add(pointLightCore);

    // Master System Hierarchy Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- 1. DETERMINISTIC HYPER-CUBE / TESSERACT REASONING CORE ---
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // Inner Core - High-tech faceted Octahedron (Pydantic / Verification Engine)
    const innerCoreGeo = new THREE.OctahedronGeometry(3.0, 0);
    const innerCoreMat = new THREE.MeshPhongMaterial({
      color: 0x090d16,
      emissive: 0x064e3b,
      emissiveIntensity: 0.85,
      flatShading: true,
      shininess: 100
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCoreMesh);

    // Inner Core Wireframe Accent
    const innerWireGeo = new THREE.OctahedronGeometry(3.04, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    coreGroup.add(innerWireMesh);

    // Outer Geometric Cage - Dodecahedron (Model Context Protocol Gateway)
    const outerCageGeo = new THREE.DodecahedronGeometry(5.2, 0);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const outerCage = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreGroup.add(outerCage);

    // Orbital Ring 1
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const ringGeo1 = new THREE.TorusGeometry(7.0, 0.05, 16, 120);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup(coreGroup, ring1);

    // Orbital Ring 2
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    const ringGeo2 = new THREE.TorusGeometry(8.2, 0.04, 16, 120);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    ringGroup(coreGroup, ring2);

    function ringGroup(parent, ring) {
      parent.add(ring);
    }

    // --- 2. MULTI-AGENT SWARM CLUSTER & TOOL CALLING NODES (DAG NODES) ---
    const nodeTypes = [
      { role: 'Planner (LangGraph)', size: 0.95, color: 0x10b981, emissive: 0x059669, pos: [-11, 4.5, 3] },
      { role: 'Tool Dispatcher (MCP)', size: 0.85, color: 0x34d399, emissive: 0x10b981, pos: [-8, -6, 5] },
      { role: 'Reflection / Critic Node', size: 0.9, color: 0x0f172a, emissive: 0x1e293b, pos: [10, 5, 2] },
      { role: 'Memory / Vector Embed', size: 0.8, color: 0x0f172a, emissive: 0x334155, pos: [9, -5.5, 4] },
      { role: 'Evaluation / Fuzz Guard', size: 0.75, color: 0x10b981, emissive: 0x047857, pos: [0, 9.5, -4] },
      { role: 'A2A Message Broker', size: 0.8, color: 0x0f172a, emissive: 0x1e293b, pos: [-4, -8.5, -3] },
      { role: 'Output Schema Validator', size: 0.7, color: 0x34d399, emissive: 0x059669, pos: [5, 8, -3] },
      { role: 'Telemetry Streamer', size: 0.65, color: 0x0f172a, emissive: 0x475569, pos: [8, -1, -7] },
      { role: 'Context Cache (Redis)', size: 0.65, color: 0x10b981, emissive: 0x10b981, pos: [-9, 0, -6] }
    ];

    const agentNodes = [];
    nodeTypes.forEach((data, index) => {
      const nodeSubGroup = new THREE.Group();

      const geom =
        index % 2 === 0
          ? new THREE.IcosahedronGeometry(data.size, 1)
          : new THREE.SphereGeometry(data.size, 18, 18);

      const mat = new THREE.MeshPhongMaterial({
        color: data.color,
        emissive: data.emissive,
        emissiveIntensity: 0.7,
        shininess: 90,
        flatShading: index % 2 === 0
      });
      const nodeMesh = new THREE.Mesh(geom, mat);
      nodeSubGroup.add(nodeMesh);

      const miniRingGeo = new THREE.TorusGeometry(data.size * 1.5, 0.03, 8, 36);
      const miniRingMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.35
      });
      const miniRing = new THREE.Mesh(miniRingGeo, miniRingMat);
      miniRing.rotation.x = Math.random() * Math.PI;
      nodeSubGroup.add(miniRing);

      nodeSubGroup.position.set(data.pos[0], data.pos[1], data.pos[2]);
      masterGroup.add(nodeSubGroup);

      agentNodes.push({
        group: nodeSubGroup,
        basePos: new THREE.Vector3(...data.pos),
        speed: 0.5 + index * 0.12,
        freq: 1.2 + index * 0.15,
        offset: index * 0.9,
        miniRing
      });
    });

    // --- 3. DYNAMIC DIRECTED GRAPH (DAG) SYNAPSE EDGES ---
    const edgePairs = [
      [0, 1], [0, 2], [1, 3], [2, 3], [2, 6], [0, 4], [4, 6], [1, 5], [5, 7], [0, 8], [8, 1]
    ];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
      linewidth: 1
    });

    const linePositions = [];
    edgePairs.forEach(pair => {
      const pA = nodeTypes[pair[0]].pos;
      const pB = nodeTypes[pair[1]].pos;
      linePositions.push(...pA, ...pB);
    });
    for (let i = 0; i < 6; i++) {
      linePositions.push(0, 0, 0, ...nodeTypes[i].pos);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(networkLines);

    // --- 4. RUNTIME "TOOL CALL" DATA PACKETS ---
    const packetCount = 28;
    const packetsData = [];
    const packetGeo = new THREE.SphereGeometry(0.18, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });

    for (let i = 0; i < packetCount; i++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      masterGroup.add(mesh);

      const useCore = i % 3 === 0;
      const edge = edgePairs[i % edgePairs.length];

      packetsData.push({
        mesh,
        from: useCore ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(...nodeTypes[edge[0]].pos),
        to: new THREE.Vector3(...nodeTypes[edge[1]].pos),
        progress: i / packetCount,
        speed: 0.22 + Math.random() * 0.25
      });
    }

    // --- 5. VECTOR EMBEDDING / LATENT SPACE PARTICLES ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particleCoords.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.75,
        radius * Math.cos(phi)
      );
    }
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particleCoords, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.38,
      transparent: true,
      opacity: 0.45
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleField);

    // --- 6. MOUSE PARALLAX & CAMERA DYNAMICS ---
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const mouseX = (clientX / rect.width) * 2 - 1;
      const mouseY = -(clientY / rect.height) * 2 + 1;
      targetRotY = mouseX * 0.55;
      targetRotX = -mouseY * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- 7. ANIMATION LOOP ---
    const startTime = performance.now();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Core Octahedron breathing & precision rotation
      innerCoreMesh.rotation.y = elapsedTime * 0.3;
      innerCoreMesh.rotation.z = elapsedTime * 0.2;
      innerWireMesh.rotation.y = elapsedTime * 0.3;
      innerWireMesh.rotation.z = elapsedTime * 0.2;

      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.05;
      innerCoreMesh.scale.set(pulse, pulse, pulse);
      innerWireMesh.scale.set(pulse, pulse, pulse);

      // Outer MCP Dodecahedron cage counter-rotation
      outerCage.rotation.y = -elapsedTime * 0.22;
      outerCage.rotation.x = elapsedTime * 0.15;

      // Orbital Vector Rings precession
      ring1.rotation.z = elapsedTime * 0.28;
      ring2.rotation.z = -elapsedTime * 0.22;

      // Living Agent Nodes floating & orbiting gently
      agentNodes.forEach((node) => {
        const floatY = Math.sin(elapsedTime * node.freq + node.offset) * 0.45;
        const floatX = Math.cos(elapsedTime * (node.freq * 0.7) + node.offset) * 0.3;
        node.group.position.y = node.basePos.y + floatY;
        node.group.position.x = node.basePos.x + floatX;
        node.miniRing.rotation.z = elapsedTime * 0.8;
      });

      // Flow Tool-Call data packets along the DAG edges
      packetsData.forEach(pkt => {
        pkt.progress += pkt.speed * 0.016;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
        }
        pkt.mesh.position.lerpVectors(pkt.from, pkt.to, pkt.progress);
      });

      // Vector space particle drift
      particleField.rotation.y = elapsedTime * 0.04;

      // Smooth cinematic mouse damping
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045 + 0.001;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-canvas-root" />;
}
