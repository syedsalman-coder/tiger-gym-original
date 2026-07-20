"use client";

import Image from "next/image";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import DumbbellModel from "./DumbbellModel";

const TIGER_YELLOW = "#FFEA00";
const STUDIO_BLACK = "#050505";

type DumbbellSceneProps = {
  className?: string;
};

type SceneProps = {
  compact: boolean;
  reducedMotion: boolean;
};

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
};

type BoundaryState = {
  failed: boolean;
};

class WebGLErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(): void {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => undefined;

      const mediaQuery = window.matchMedia(query);
      const handleChange = () => onStoreChange();
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
    [query],
  );
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function detectWebGLSupport(): boolean {
  try {
    const testCanvas = document.createElement("canvas");
    const context = testCanvas.getContext("webgl2") ?? testCanvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,234,0,0.14),transparent_42%)]" />
      <div className="absolute left-[8%] top-[18%] h-px w-[34%] bg-gradient-to-r from-transparent to-[#FFEA00]/50" />
      <div className="absolute bottom-[17%] right-[7%] h-px w-[28%] bg-gradient-to-l from-transparent to-[#FFEA00]/40" />
      <div className="relative flex max-w-[78%] flex-col items-center gap-4 text-center">
        <div className="relative aspect-[1.18] w-32 sm:w-40">
          <Image
            src="/tiger-logo.png"
            alt=""
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_0_28px_rgba(255,234,0,0.22)]"
          />
        </div>
        <p className="text-[0.62rem] font-bold tracking-[0.38em] text-[#FFEA00] sm:text-xs">
          TIGER GYM FITNESS CENTER
        </p>
        <p className="text-xl font-black tracking-[-0.04em] text-[#F7F7F5] sm:text-3xl">
          BUILT FOR STRENGTH
        </p>
      </div>
    </div>
  );
}

function ScenePlaceholder({ compact }: { compact: boolean }) {
  return (
    <group scale={compact ? 0.64 : 0.96} rotation={[0.08, -0.4, -0.1]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 2.15, 20]} />
        <meshBasicMaterial color="#363735" />
      </mesh>
      {([-1, 1] as const).map((side) => (
        <group key={side}>
          <mesh position={[side * 1.58, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1, 1, 0.65, 28]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
          <mesh
            position={[side * 1.91, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.77, 0.03, 6, 28]} />
            <meshBasicMaterial color={TIGER_YELLOW} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StudioScene({ compact, reducedMotion }: SceneProps) {
  const floorY = compact ? -0.78 : -1.14;

  return (
    <>
      <color attach="background" args={[STUDIO_BLACK]} />
      <fog attach="fog" args={[STUDIO_BLACK, 7.5, 15]} />

      <ambientLight intensity={0.42} color="#AEB3B7" />
      <hemisphereLight args={["#FFF1A4", "#050505", compact ? 0.35 : 0.48]} />
      <spotLight
        position={[2.8, 4.8, 4.5]}
        angle={0.48}
        penumbra={0.92}
        intensity={compact ? 34 : 52}
        distance={13}
        color="#FFF8D6"
        castShadow={!compact}
        shadow-bias={-0.00015}
        shadow-mapSize-width={compact ? 512 : 1024}
        shadow-mapSize-height={compact ? 512 : 1024}
      />
      <pointLight
        position={[-3.4, 0.35, 1.2]}
        intensity={compact ? 18 : 31}
        distance={8}
        color={TIGER_YELLOW}
      />
      <pointLight
        position={[3.1, -0.55, 2.3]}
        intensity={compact ? 14 : 24}
        distance={7}
        color="#FFF200"
      />
      <pointLight position={[0, 1.3, -2.4]} intensity={10} distance={6} color="#6C7278" />

      <DumbbellModel compact={compact} reducedMotion={reducedMotion} />

      <mesh
        position={[0, floorY, -0.55]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow={!compact}
      >
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#090909" roughness={0.94} metalness={0.05} />
      </mesh>

      <ContactShadows
        position={[0, floorY + 0.008, 0]}
        opacity={compact ? 0.24 : 0.46}
        scale={compact ? 4.2 : 6.5}
        blur={compact ? 2.8 : 2.3}
        far={3.8}
        resolution={compact ? 128 : 256}
        frames={compact || reducedMotion ? 1 : 55}
        color="#000000"
      />
    </>
  );
}

export default function DumbbellScene({ className = "" }: DumbbellSceneProps) {
  const compact = useMediaQuery("(max-width: 767px), (pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const removeContextListenerRef = useRef<() => void>(() => undefined);
  const readyDispatchedRef = useRef(false);

  const dispatchReady = useCallback(() => {
    if (readyDispatchedRef.current) return;
    readyDispatchedRef.current = true;
    window.dispatchEvent(new Event("tiger-scene-ready"));
  }, []);

  useEffect(() => {
    const detectionFrame = window.requestAnimationFrame(() => {
      const supported = detectWebGLSupport();
      setWebGLSupported(supported);
      if (!supported) dispatchReady();
    });

    return () => window.cancelAnimationFrame(detectionFrame);
  }, [dispatchReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "180px", threshold: 0.01 },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      removeContextListenerRef.current();
    },
    [],
  );

  const fallback = <StaticFallback />;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-[#050505] ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {webGLSupported !== true || contextLost ? (
        fallback
      ) : (
        <WebGLErrorBoundary fallback={fallback} onError={dispatchReady}>
          <Canvas
            className="absolute inset-0"
            dpr={[1, compact ? 1.15 : 1.5]}
            frameloop={reducedMotion || !inView ? "demand" : "always"}
            shadows={!compact}
            camera={{
              position: [0, 0.06, compact ? 7.6 : 7.2],
              fov: compact ? 46 : 36,
              near: 0.1,
              far: 28,
            }}
            gl={{
              alpha: false,
              antialias: !compact,
              depth: true,
              powerPreference: "high-performance",
              stencil: false,
            }}
            performance={{ min: 0.62 }}
            fallback={fallback}
            onCreated={({ gl }) => {
              removeContextListenerRef.current();

              const handleContextLost = (event: Event) => {
                event.preventDefault();
                removeContextListenerRef.current();
                setContextLost(true);
              };

              gl.domElement.addEventListener("webglcontextlost", handleContextLost);
              removeContextListenerRef.current = () => {
                gl.domElement.removeEventListener("webglcontextlost", handleContextLost);
              };

              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = compact ? 1.02 : 1.08;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
              dispatchReady();
            }}
            tabIndex={-1}
          >
            <Suspense fallback={<ScenePlaceholder compact={compact} />}>
              <StudioScene compact={compact} reducedMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      )}
    </div>
  );
}
