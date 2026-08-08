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
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  type Locale,
} from "@/i18n/config";
import DumbbellModel from "./DumbbellModel";

const TIGER_YELLOW = "#FFEA00";
const STUDIO_BLACK = "#050505";

type DumbbellSceneProps = {
  className?: string;
  locale: Locale;
};

type SceneProps = {
  compact: boolean;
  reducedMotion: boolean;
  active: boolean;
};

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
};

type BoundaryState = {
  failed: boolean;
};

class WebGLErrorBoundary extends Component<
  BoundaryProps,
  BoundaryState
> {
  state: BoundaryState = {
    failed: false,
  };

  static getDerivedStateFromError(): BoundaryState {
    return {
      failed: true,
    };
  }

  componentDidCatch(): void {
    this.props.onError?.();
  }

  render() {
    return this.state.failed
      ? this.props.fallback
      : this.props.children;
  }
}

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") {
        return () => undefined;
      }

      const mediaQuery =
        window.matchMedia(query);

      const handleChange = () => {
        onStoreChange();
      };

      mediaQuery.addEventListener(
        "change",
        handleChange,
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleChange,
        );
      };
    },
    [query],
  );

  const getSnapshot = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(
    () => false,
    [],
  );

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

function detectWebGLSupport(): boolean {
  try {
    const testCanvas =
      document.createElement("canvas");

    const context =
      testCanvas.getContext("webgl2") ??
      testCanvas.getContext("webgl");

    context
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext();

    return Boolean(context);
  } catch {
    return false;
  }
}

function StaticFallback({
  locale,
}: {
  locale: Locale;
}) {
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
          {getLocalizedValue(
            site.fullName,
            locale,
          )}
        </p>

        <p className="text-xl font-black tracking-[-0.04em] text-[#F7F7F5] sm:text-3xl">
          {getLocalizedValue(
            pageContent.footer.taglineLineOne,
            locale,
          )}
        </p>
      </div>
    </div>
  );
}

function ScenePlaceholder({
  compact,
}: {
  compact: boolean;
}) {
  return (
    <group
      scale={compact ? 0.78 : 0.96}
      rotation={[0.08, -0.4, -0.1]}
    >
      <mesh
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            0.15,
            0.15,
            2.15,
            compact ? 18 : 20,
          ]}
        />

        <meshBasicMaterial color="#363735" />
      </mesh>

      {([-1, 1] as const).map((side) => (
        <group key={side}>
          <mesh
            position={[
              side * 1.58,
              0,
              0,
            ]}
            rotation={[
              0,
              0,
              Math.PI / 2,
            ]}
          >
            <cylinderGeometry
              args={[
                1,
                1,
                0.65,
                compact ? 22 : 28,
              ]}
            />

            <meshBasicMaterial color="#0A0A0A" />
          </mesh>

          <mesh
            position={[
              side * 1.91,
              0,
              0,
            ]}
            rotation={[
              0,
              Math.PI / 2,
              0,
            ]}
          >
            <torusGeometry
              args={[
                0.77,
                0.03,
                6,
                compact ? 22 : 28,
              ]}
            />

            <meshBasicMaterial
              color={TIGER_YELLOW}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MobileFloorShadow({
  floorY,
}: {
  floorY: number;
}) {
  return (
    <mesh
      position={[0, floorY + 0.012, 0]}
      rotation={[
        -Math.PI / 2,
        0,
        0,
      ]}
    >
      <circleGeometry args={[1.9, 36]} />

      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </mesh>
  );
}

function StudioScene({
  compact,
  reducedMotion,
  active,
}: SceneProps) {
  const floorY = compact
    ? -0.8
    : -1.14;

  return (
    <>
      <color
        attach="background"
        args={[STUDIO_BLACK]}
      />

      <fog
        attach="fog"
        args={[
          STUDIO_BLACK,
          compact ? 7.2 : 7.5,
          compact ? 13.5 : 15,
        ]}
      />

      <ambientLight
        intensity={compact ? 0.36 : 0.3}
        color="#AEB3B7"
      />

      <hemisphereLight
        args={[
          "#FFF1A4",
          "#050505",
          compact ? 0.34 : 0.36,
        ]}
      />

      <spotLight
        position={[
          compact ? 2.15 : 2.55,
          compact ? 4.25 : 5.25,
          compact ? 3.1 : 3.8,
        ]}
        angle={0.4}
        penumbra={0.96}
        intensity={compact ? 28 : 68}
        distance={14}
        color="#FFF8D6"
        castShadow={!compact}
        shadow-bias={-0.00015}
        shadow-mapSize-width={
          compact ? 256 : 1024
        }
        shadow-mapSize-height={
          compact ? 256 : 1024
        }
      />

      {!compact && (
        <>
          <pointLight
            position={[-3.4, 0.35, 1.2]}
            intensity={42}
            distance={8.5}
            color={TIGER_YELLOW}
          />

          <rectAreaLight
            position={[-2.35, 2.65, 2.75]}
            rotation={[-0.55, -0.42, 0.24]}
            width={3.8}
            height={4.6}
            intensity={13}
            color="#FFE66D"
          />
        </>
      )}

      {!compact && (
        <>
          <pointLight
            position={[3.1, -0.55, 2.3]}
            intensity={34}
            distance={7.5}
            color="#FFF200"
          />

          <pointLight
            position={[0, 1.3, -2.4]}
            intensity={10}
            distance={6}
            color="#6C7278"
          />
        </>
      )}

      <DumbbellModel
        compact={compact}
        reducedMotion={reducedMotion}
        active={active}
      />

      <mesh
        position={[0, floorY, -0.55]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow={!compact}
      >
        <planeGeometry args={[12, 9]} />

        <meshStandardMaterial
          color="#090909"
          roughness={0.94}
          metalness={0.05}
        />
      </mesh>

      {compact ? (
        <MobileFloorShadow
          floorY={floorY}
        />
      ) : (
        <ContactShadows
          position={[0, floorY + 0.008, 0]}
          opacity={0.46}
          scale={6.5}
          blur={2.3}
          far={3.8}
          resolution={256}
          frames={reducedMotion ? 1 : 55}
          color="#000000"
        />
      )}
    </>
  );
}

export default function DumbbellScene({
  className = "",
  locale,
}: DumbbellSceneProps) {
  const compact = useMediaQuery(
    "(max-width: 767px), (pointer: coarse)",
  );

  const reducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const [
    webGLSupported,
    setWebGLSupported,
  ] = useState<boolean | null>(null);

  const [
    contextLost,
    setContextLost,
  ] = useState(false);

  const [
    canvasRevision,
    setCanvasRevision,
  ] = useState(0);

  const [inView, setInView] =
    useState(true);

  const [pageVisible, setPageVisible] =
    useState(true);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const removeContextListenerRef =
    useRef<() => void>(
      () => undefined,
    );

  const recoveryTimerRef =
    useRef<number | null>(null);

  const stabilityTimerRef =
    useRef<number | null>(null);

  const recoveryAttemptsRef =
    useRef(0);

  const readyDispatchedRef =
    useRef(false);

  const dispatchReady = useCallback(() => {
    if (readyDispatchedRef.current) {
      return;
    }

    readyDispatchedRef.current = true;

    window.dispatchEvent(
      new Event("tiger-scene-ready"),
    );
  }, []);

  useEffect(() => {
    const detectionFrame =
      window.requestAnimationFrame(() => {
        const supported =
          detectWebGLSupport();

        setWebGLSupported(supported);

        if (!supported) {
          dispatchReady();
        }
      });

    return () => {
      window.cancelAnimationFrame(
        detectionFrame,
      );
    };
  }, [dispatchReady]);

  useEffect(() => {
    const container =
      containerRef.current;

    if (
      !container ||
      typeof IntersectionObserver ===
        "undefined"
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setInView(
            entry.isIntersecting,
          );
        },
        {
          rootMargin: "120px",
          threshold: 0.01,
        },
      );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setPageVisible(!document.hidden);
    };

    updateVisibility();

    document.addEventListener(
      "visibilitychange",
      updateVisibility,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateVisibility,
      );
    };
  }, []);

  useEffect(
    () => () => {
      removeContextListenerRef.current();

      if (recoveryTimerRef.current !== null) {
        window.clearTimeout(
          recoveryTimerRef.current,
        );
      }

      if (stabilityTimerRef.current !== null) {
        window.clearTimeout(
          stabilityTimerRef.current,
        );
      }
    },
    [],
  );

  const fallback = (
    <StaticFallback locale={locale} />
  );

  const sceneActive = inView && pageVisible;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden bg-[#050505] ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {webGLSupported !== true ||
      contextLost ? (
        fallback
      ) : (
        <WebGLErrorBoundary
          fallback={fallback}
          onError={dispatchReady}
        >
          <Canvas
            key={canvasRevision}
            className="absolute inset-0"
            style={{
              touchAction: "pan-y",
            }}
            dpr={compact ? 0.78 : [1, 1.25]}
            resize={{
              scroll: false,
              debounce: {
                scroll: 0,
                resize: compact
                  ? 180
                  : 50,
              },
            }}
            frameloop="demand"
            shadows={compact ? false : "basic"}
            camera={{
              position: [
                0,
                0.06,
                compact ? 7.45 : 7.2,
              ],
              fov: compact ? 45 : 36,
              near: 0.1,
              far: 28,
            }}
            gl={{
              alpha: false,
              antialias: !compact,
              depth: true,
              powerPreference:
                "high-performance",
              stencil: false,
              preserveDrawingBuffer: false,
            }}
            performance={{
              min: compact ? 0.5 : 0.62,
            }}
            fallback={fallback}
            onCreated={({ gl }) => {
              removeContextListenerRef.current();

              if (
                stabilityTimerRef.current !== null
              ) {
                window.clearTimeout(
                  stabilityTimerRef.current,
                );

                stabilityTimerRef.current = null;
              }

              const clearRecoveryTimer = () => {
                if (
                  recoveryTimerRef.current === null
                ) {
                  return;
                }

                window.clearTimeout(
                  recoveryTimerRef.current,
                );

                recoveryTimerRef.current = null;
              };

              const handleContextLost = (
                event: Event,
              ) => {
                event.preventDefault();

                clearRecoveryTimer();

                if (
                  stabilityTimerRef.current !== null
                ) {
                  window.clearTimeout(
                    stabilityTimerRef.current,
                  );

                  stabilityTimerRef.current = null;
                }

                const nextAttempt =
                  recoveryAttemptsRef.current + 1;

                recoveryAttemptsRef.current =
                  nextAttempt;

                setContextLost(true);

                if (nextAttempt > 2) {
                  dispatchReady();
                  return;
                }

                recoveryTimerRef.current =
                  window.setTimeout(
                    () => {
                      recoveryTimerRef.current =
                        null;

                      setCanvasRevision(
                        (current) => current + 1,
                      );

                      setContextLost(false);
                    },
                    nextAttempt === 1
                      ? 900
                      : 1800,
                  );
              };

              const handleContextRestored = () => {
                clearRecoveryTimer();

                recoveryAttemptsRef.current = 0;

                setCanvasRevision(
                  (current) => current + 1,
                );

                setContextLost(false);
              };

              gl.domElement.addEventListener(
                "webglcontextlost",
                handleContextLost,
              );

              gl.domElement.addEventListener(
                "webglcontextrestored",
                handleContextRestored,
              );

              removeContextListenerRef.current =
                () => {
                  gl.domElement.removeEventListener(
                    "webglcontextlost",
                    handleContextLost,
                  );

                  gl.domElement.removeEventListener(
                    "webglcontextrestored",
                    handleContextRestored,
                  );
                };

              gl.outputColorSpace =
                THREE.SRGBColorSpace;

              gl.toneMapping =
                THREE.ACESFilmicToneMapping;

              gl.toneMappingExposure =
                compact ? 1.03 : 1.08;

              gl.shadowMap.type =
                THREE.PCFShadowMap;

              stabilityTimerRef.current =
                window.setTimeout(
                  () => {
                    recoveryAttemptsRef.current = 0;
                    stabilityTimerRef.current =
                      null;
                  },
                  5000,
                );

              dispatchReady();
            }}
            tabIndex={-1}
          >
            <Suspense
              fallback={
                <ScenePlaceholder
                  compact={compact}
                />
              }
            >
              <StudioScene
                compact={compact}
                active={sceneActive}
                reducedMotion={
                  reducedMotion
                }
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      )}
    </div>
  );
}
