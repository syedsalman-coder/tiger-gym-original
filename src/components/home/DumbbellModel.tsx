"use client";

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type ForwardedRef,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const TIGER_YELLOW = "#FFEA00";
const BRIGHT_YELLOW = "#FFF200";
const PLATE_BLACK = "#090909";
const DARK_CHROME = "#211D1E";

type Side = -1 | 1;

export type DumbbellModelProps = {
  compact: boolean;
  reducedMotion: boolean;
  active: boolean;
};

type PlateBlueprint = {
  distance: number;
  width: number;
  radius: number;
  ringRadius: number;
};

type PlateInstance = PlateBlueprint & {
  side: Side;
  stackIndex: number;
};

type WeightPlateProps = PlateInstance & {
  compact: boolean;
};

type SegmentName =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g";

const PLATE_BLUEPRINTS: readonly PlateBlueprint[] = [
  {
    distance: 1.36,
    width: 0.18,
    radius: 0.68,
    ringRadius: 0.53,
  },
  {
    distance: 1.54,
    width: 0.22,
    radius: 0.96,
    ringRadius: 0.78,
  },
  {
    distance: 1.77,
    width: 0.24,
    radius: 1.05,
    ringRadius: 0.86,
  },
  {
    distance: 2,
    width: 0.22,
    radius: 0.95,
    ringRadius: 0.77,
  },
  {
    distance: 2.18,
    width: 0.14,
    radius: 0.72,
    ringRadius: 0.57,
  },
];

const PLATE_INSTANCES: readonly PlateInstance[] = (
  [-1, 1] as const
).flatMap((side) =>
  PLATE_BLUEPRINTS.map((plate, stackIndex) => ({
    ...plate,
    side,
    stackIndex,
  })),
);

const DIGIT_SEGMENTS: Readonly<
  Record<"2" | "5", readonly SegmentName[]>
> = {
  "2": ["a", "b", "g", "e", "d"],
  "5": ["a", "f", "g", "c", "d"],
};

const SEGMENT_LAYOUT: Readonly<
  Record<
    SegmentName,
    {
      position: [number, number, number];
      vertical: boolean;
    }
  >
> = {
  a: {
    position: [0, 0.105, 0],
    vertical: false,
  },
  b: {
    position: [0, 0.055, 0.058],
    vertical: true,
  },
  c: {
    position: [0, -0.055, 0.058],
    vertical: true,
  },
  d: {
    position: [0, -0.105, 0],
    vertical: false,
  },
  e: {
    position: [0, -0.055, -0.058],
    vertical: true,
  },
  f: {
    position: [0, 0.055, -0.058],
    vertical: true,
  },
  g: {
    position: [0, 0, 0],
    vertical: false,
  },
};

function seededValue(
  index: number,
  salt: number,
): number {
  const value =
    Math.sin(index * 91.317 + salt * 47.113) *
    43_758.5453;

  return value - Math.floor(value);
}

function smootherStep(value: number): number {
  const clamped = THREE.MathUtils.clamp(
    value,
    0,
    1,
  );

  return (
    clamped *
    clamped *
    clamped *
    (clamped * (clamped * 6 - 15) + 10)
  );
}

function scrollPulse(progress: number): number {
  const open = smootherStep(
    (progress - 0.16) / 0.28,
  );

  const close = smootherStep(
    (progress - 0.66) / 0.3,
  );

  return open * (1 - close);
}

function createKnurlTexture(): THREE.DataTexture {
  const size = 64;
  const data = new Uint8Array(size * size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const risingGroove =
        (x + y) % 16 < 3;

      const fallingGroove =
        (x - y + size * 2) % 16 < 3;

      const crossed =
        risingGroove && fallingGroove;

      data[y * size + x] = crossed
        ? 236
        : risingGroove || fallingGroove
          ? 196
          : 92;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RedFormat,
    THREE.UnsignedByteType,
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 3);
  texture.minFilter =
    THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  return texture;
}

const WeightPlate = forwardRef(function WeightPlate(
  {
    width,
    radius,
    ringRadius,
    compact,
  }: WeightPlateProps,
  ref: ForwardedRef<THREE.Group>,
) {
  const radialSegments = compact ? 16 : 44;

  return (
    <group ref={ref}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow={!compact}
      >
        <cylinderGeometry
          args={[
            radius + 0.025,
            radius + 0.025,
            width * 0.52,
            radialSegments,
            1,
          ]}
        />

        <meshStandardMaterial
          color={TIGER_YELLOW}
          emissive={TIGER_YELLOW}
          emissiveIntensity={0.13}
          metalness={0.58}
          roughness={0.3}
        />
      </mesh>

      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow={!compact}
        receiveShadow={!compact}
      >
        <cylinderGeometry
          args={[
            radius,
            radius,
            width,
            radialSegments,
            1,
          ]}
        />

        <meshPhysicalMaterial
          color={PLATE_BLACK}
          metalness={0.62}
          roughness={0.38}
          clearcoat={0.28}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {([-1, 1] as const).map((face) => (
        <mesh
          key={face}
          position={[
            face * (width / 2 + 0.009),
            0,
            0,
          ]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <torusGeometry
            args={[
              ringRadius,
              compact ? 0.022 : 0.027,
              6,
              compact ? 16 : 40,
            ]}
          />

          <meshStandardMaterial
            color={BRIGHT_YELLOW}
            emissive={TIGER_YELLOW}
            emissiveIntensity={0.35}
            metalness={0.54}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
});

function MetalCollar({
  side,
  compact,
}: {
  side: Side;
  compact: boolean;
}) {
  return (
    <group position={[side * 1.16, 0, 0]}>
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow={!compact}
      >
        <cylinderGeometry
          args={[
            0.43,
            0.43,
            0.2,
            compact ? 14 : 36,
          ]}
        />

        <meshPhysicalMaterial
          color="#777874"
          metalness={0.98}
          roughness={0.18}
          clearcoat={0.65}
          clearcoatRoughness={0.14}
        />
      </mesh>

      <mesh
        position={[side * 0.101, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry
          args={[
            0.34,
            0.035,
            8,
            compact ? 14 : 36,
          ]}
        />

        <meshStandardMaterial
          color="#B4B5AF"
          metalness={1}
          roughness={0.16}
        />
      </mesh>
    </group>
  );
}

function SegmentDigit({
  value,
  position,
}: {
  value: "2" | "5";
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {DIGIT_SEGMENTS[value].map((segment) => {
        const layout =
          SEGMENT_LAYOUT[segment];

        return (
          <mesh
            key={segment}
            position={layout.position}
          >
            <boxGeometry
              args={
                layout.vertical
                  ? [0.036, 0.09, 0.024]
                  : [0.036, 0.024, 0.105]
              }
            />

            <meshStandardMaterial
              color={TIGER_YELLOW}
              emissive={TIGER_YELLOW}
              emissiveIntensity={0.45}
              metalness={0.45}
              roughness={0.28}
            />
          </mesh>
        );
      })}
    </group>
  );
}

const EndCapDetails = forwardRef(
  function EndCapDetails(
    {
      side,
    }: {
      side: Side;
    },
    ref: ForwardedRef<THREE.Group>,
  ) {
    const faceX = side * 2.259;

    return (
      <group
        ref={ref}
        position={[faceX, 0, 0]}
      >
        <mesh
          rotation={[0, Math.PI / 2, 0]}
        >
          <ringGeometry
            args={[0.53, 0.585, 36]}
          />

          <meshStandardMaterial
            color={TIGER_YELLOW}
            emissive={TIGER_YELLOW}
            emissiveIntensity={0.42}
            metalness={0.5}
            roughness={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group
          position={[side * 0.028, 0.11, 0]}
        >
          <group position={[0, 0, -0.2]}>
            <mesh position={[0, -0.045, 0]}>
              <boxGeometry
                args={[0.045, 0.38, 0.07]}
              />

              <meshStandardMaterial
                color={BRIGHT_YELLOW}
                emissive={TIGER_YELLOW}
                emissiveIntensity={0.55}
                metalness={0.45}
                roughness={0.25}
              />
            </mesh>

            <mesh position={[0, 0.145, 0]}>
              <boxGeometry
                args={[0.045, 0.07, 0.31]}
              />

              <meshStandardMaterial
                color={BRIGHT_YELLOW}
                emissive={TIGER_YELLOW}
                emissiveIntensity={0.55}
                metalness={0.45}
                roughness={0.25}
              />
            </mesh>
          </group>

          <group position={[0, -0.035, 0.2]}>
            <mesh
              rotation={[0, Math.PI / 2, 0]}
            >
              <torusGeometry
                args={[
                  0.19,
                  0.043,
                  7,
                  30,
                  Math.PI * 1.72,
                ]}
              />

              <meshStandardMaterial
                color={BRIGHT_YELLOW}
                emissive={TIGER_YELLOW}
                emissiveIntensity={0.55}
                metalness={0.45}
                roughness={0.25}
              />
            </mesh>

            <mesh position={[0, -0.04, 0.08]}>
              <boxGeometry
                args={[0.045, 0.07, 0.18]}
              />

              <meshStandardMaterial
                color={BRIGHT_YELLOW}
                emissive={TIGER_YELLOW}
                emissiveIntensity={0.55}
                metalness={0.45}
                roughness={0.25}
              />
            </mesh>
          </group>
        </group>

        <SegmentDigit
          value="2"
          position={[
            side * 0.03,
            -0.43,
            -0.072,
          ]}
        />

        <SegmentDigit
          value="5"
          position={[
            side * 0.03,
            -0.43,
            0.072,
          ]}
        />

        {Array.from(
          {
            length: 8,
          },
          (_, index) => {
            const angle =
              (index / 8) *
              Math.PI *
              2;

            return (
              <mesh
                key={index}
                position={[
                  side * 0.026,
                  Math.sin(angle) * 0.635,
                  Math.cos(angle) * 0.635,
                ]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry
                  args={[
                    0.035,
                    0.055,
                    0.018,
                  ]}
                />

                <meshStandardMaterial
                  color={TIGER_YELLOW}
                  emissive={TIGER_YELLOW}
                  emissiveIntensity={0.28}
                  metalness={0.5}
                  roughness={0.25}
                />
              </mesh>
            );
          },
        )}
      </group>
    );
  },
);

function ChalkParticles({
  compact,
  particlesRef,
}: {
  compact: boolean;
  particlesRef: ForwardedRef<THREE.Points>;
}) {
  const count = 88;

  const positions = useMemo(() => {
    const values =
      new Float32Array(count * 3);

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      values[index * 3] =
        (seededValue(index, 1) - 0.5) *
        6.1;

      values[index * 3 + 1] =
        (seededValue(index, 2) - 0.5) *
        3.2;

      values[index * 3 + 2] =
        -1.25 +
        seededValue(index, 3) * 2.25;
    }

    return values;
  }, [count]);

  if (compact) {
    return null;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#E6E2D7"
        size={compact ? 0.021 : 0.026}
        sizeAttenuation
        transparent
        opacity={compact ? 0.28 : 0.3}
        depthWrite={false}
      />
    </points>
  );
}

export default function DumbbellModel({
  compact,
  reducedMotion,
  active,
}: DumbbellModelProps) {
  const rootRef =
    useRef<THREE.Group>(null);

  const invalidate = useThree(
    (state) => state.invalidate,
  );

  const plateRefs = useRef<
    Array<THREE.Group | null>
  >([]);

  const endCapDetailsRefs = useRef<
    Array<THREE.Group | null>
  >([]);

  const particlesRef =
    useRef<THREE.Points>(null);

  const scrollProgressRef =
    useRef(0);

  const scrollVelocityTargetRef =
    useRef(0);

  const scrollVelocityRef =
    useRef(0);

  const previousScrollRef = useRef({
    position: 0,
    time: 0,
  });

  const touchTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const touchMotionRef = useRef({
    x: 0,
    y: 0,
  });

  const renderUntilRef = useRef(0);

  const firstFrameRenderedRef = useRef(false);

  const previousPointerRef = useRef({
    x: 0,
    y: 0,
  });

  const previousModelStateRef = useRef({
    x: 0,
    y: 0,
    z: 0,
    rx: 0.08,
    ry: -0.4,
    rz: -0.1,
    scale: compact ? 0.78 : 0.96,
    particlesX: 0,
    particlesY: 0,
    particlesZ: 0,
    particlesRy: 0,
    particlesRz: 0,
  });

  const knurlTexture = useMemo(
    () => createKnurlTexture(),
    [],
  );

  useEffect(
    () => () => {
      knurlTexture.dispose();
    },
    [knurlTexture],
  );

  useEffect(() => {
    if (!active) {
      return;
    }

    renderUntilRef.current = Math.max(
      renderUntilRef.current,
      performance.now() + (compact ? 520 : 1300),
    );
    firstFrameRenderedRef.current = false;
    invalidate();
  }, [active, compact, invalidate]);

  useEffect(() => {
    if (!active || compact || reducedMotion) {
      return;
    }

    const requestPointerRender = () => {
      renderUntilRef.current = Math.max(
        renderUntilRef.current,
        performance.now() + (compact ? 240 : 420),
      );
      invalidate();
    };

    window.addEventListener(
      "pointermove",
      requestPointerRender,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        requestPointerRender,
      );
    };
  }, [active, compact, invalidate, reducedMotion]);

  /*
   * Track scroll progress and scroll speed.
   *
   * Scroll speed creates a short motion impulse on phones.
   * The model is not tied directly to the scroll position,
   * which prevents snapping and sideways glitches.
   */
  useEffect(() => {
    const updateScrollInformation = () => {
      const viewportHeight = Math.max(
        window.innerHeight,
        1,
      );

      const currentPosition =
        window.scrollY;

      const currentTime =
        performance.now();

      const previous =
        previousScrollRef.current;

      if (previous.time > 0) {
        const elapsedTime = Math.max(
          currentTime - previous.time,
          16,
        );

        const pixelVelocity =
          (currentPosition -
            previous.position) /
          elapsedTime;

        scrollVelocityTargetRef.current =
          THREE.MathUtils.clamp(
            pixelVelocity / 2.2,
            -1,
            1,
          );
      }

      previousScrollRef.current = {
        position: currentPosition,
        time: currentTime,
      };

      scrollProgressRef.current =
        THREE.MathUtils.clamp(
          currentPosition /
            (viewportHeight * 0.92),
          0,
          1.15,
        );

      if (active) {
        renderUntilRef.current = Math.max(
          renderUntilRef.current,
          performance.now() + (compact ? 300 : 520),
        );
        invalidate();
      }
    };

    previousScrollRef.current = {
      position: window.scrollY,
      time: performance.now(),
    };

    updateScrollInformation();

    window.addEventListener(
      "scroll",
      updateScrollInformation,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollInformation,
      );
    };
  }, [active, compact, invalidate]);

  /*
   * Track finger position without preventing native scrolling.
   *
   * The values are normalized between -1 and 1 and then
   * smoothed inside useFrame.
   */
  useEffect(() => {
    if (!compact || reducedMotion) {
      touchTargetRef.current = {
        x: 0,
        y: 0,
      };

      return;
    }

    const updateTouchPosition = (
      event: TouchEvent,
    ) => {
      const touch =
        event.touches[0];

      if (!touch) {
        return;
      }

      const width = Math.max(
        window.innerWidth,
        1,
      );

      const height = Math.max(
        window.innerHeight,
        1,
      );

      touchTargetRef.current = {
        x: THREE.MathUtils.clamp(
          (touch.clientX / width) * 2 - 1,
          -1,
          1,
        ),
        y: THREE.MathUtils.clamp(
          (touch.clientY / height) * 2 - 1,
          -1,
          1,
        ),
      };

      renderUntilRef.current = Math.max(
        renderUntilRef.current,
        performance.now() + (compact ? 300 : 520),
      );
      invalidate();
    };

    const releaseTouch = () => {
      touchTargetRef.current = {
        x: 0,
        y: 0,
      };

      renderUntilRef.current = Math.max(
        renderUntilRef.current,
        performance.now() + (compact ? 240 : 420),
      );
      invalidate();
    };

    window.addEventListener(
      "touchstart",
      updateTouchPosition,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchmove",
      updateTouchPosition,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchend",
      releaseTouch,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchcancel",
      releaseTouch,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        updateTouchPosition,
      );

      window.removeEventListener(
        "touchmove",
        updateTouchPosition,
      );

      window.removeEventListener(
        "touchend",
        releaseTouch,
      );

      window.removeEventListener(
        "touchcancel",
        releaseTouch,
      );
    };
  }, [compact, invalidate, reducedMotion]);

  useFrame((state, frameDelta) => {
    const root = rootRef.current;
    const now = performance.now();

    if (!root) {
      return;
    }

    const pointer = state.pointer;
    const previousPointer =
      previousPointerRef.current;
    previousPointer.x = pointer.x;
    previousPointer.y = pointer.y;

    if (!active) {
      firstFrameRenderedRef.current = false;
      return;
    }

    if (reducedMotion) {
      if (firstFrameRenderedRef.current) {
        return;
      }

      firstFrameRenderedRef.current = true;

      root.position.set(0, 0, 0);

      root.rotation.set(
        0.08,
        -0.4,
        -0.1,
      );

      root.scale.setScalar(
        compact ? 0.78 : 0.96,
      );

      PLATE_INSTANCES.forEach(
        (plate, index) => {
          const plateGroup =
            plateRefs.current[index];

          if (plateGroup) {
            plateGroup.position.x =
              plate.side *
              plate.distance;
          }
        },
      );

      ([-1, 1] as const).forEach(
        (side, index) => {
          const details =
            endCapDetailsRefs.current[index];

          if (details) {
            details.position.x =
              side * 2.259;
          }
        },
      );

      return;
    }

    if (!firstFrameRenderedRef.current) {
      renderUntilRef.current = Math.max(
        renderUntilRef.current,
        now + (compact ? 520 : 1300),
      );
      firstFrameRenderedRef.current = true;
    }

    if (now > renderUntilRef.current) {
      return;
    }

    const delta = Math.min(
      frameDelta,
      1 / 20,
    );

    const elapsed =
      state.clock.elapsedTime;

    const scroll =
      scrollProgressRef.current;

    const intro = smootherStep(
      elapsed / (compact ? 0.72 : 1.25),
    );

    /*
     * Smoothly reduce the scroll impulse after scrolling
     * stops. This gives the dumbbell spring-like momentum.
     */
    scrollVelocityTargetRef.current =
      THREE.MathUtils.damp(
        scrollVelocityTargetRef.current,
        0,
        5.8,
        delta,
      );

    scrollVelocityRef.current =
      THREE.MathUtils.damp(
        scrollVelocityRef.current,
        scrollVelocityTargetRef.current,
        10,
        delta,
      );

    const scrollImpulse =
      THREE.MathUtils.clamp(
        scrollVelocityRef.current,
        -1,
        1,
      );

    const scrollEnergy =
      Math.abs(scrollImpulse);

    touchMotionRef.current.x =
      THREE.MathUtils.damp(
        touchMotionRef.current.x,
        touchTargetRef.current.x,
        touchTargetRef.current.x === 0
          ? 3.4
          : 6.2,
        delta,
      );

    touchMotionRef.current.y =
      THREE.MathUtils.damp(
        touchMotionRef.current.y,
        touchTargetRef.current.y,
        touchTargetRef.current.y === 0
          ? 3.4
          : 6.2,
        delta,
      );

    const touchX =
      touchMotionRef.current.x;

    const touchY =
      touchMotionRef.current.y;

    const settleWeight =
      1 -
      smootherStep(
        (scroll - 0.62) / 0.38,
      );

    const pointerWeight =
      compact ? 0 : settleWeight;

    /*
     * Strong mobile idle animation.
     */
    const mobileFloatX = scrollEnergy * 0.035;

    const mobileFloatY =
      scrollEnergy * -0.055;

    const mobileFloatZ =
      scrollEnergy * 0.12;

    const mobileRotationX =
      scrollImpulse * -0.04;

    const mobileRotationY =
      scrollImpulse * 0.08;

    const mobileRotationZ =
      scrollImpulse * 0.045;

    const mobileContinuousSpin = 0;

    const mobileScalePulse = 0;

    /*
     * Desktop animation.
     */
    const desktopFloatY =
      Math.sin(elapsed * 0.72) *
      0.085 *
      settleWeight *
      intro;

    const targetX = compact
      ? mobileFloatX +
        touchX * 0.055
      : 0;

    const targetY = compact
      ? -2.75 * (1 - intro) +
        mobileFloatY +
        touchY * 0.035 -
        scrollImpulse * 0.055
      : -2.75 * (1 - intro) +
        desktopFloatY -
        scroll * 0.06;

    const targetZ = compact
      ? mobileFloatZ +
        scrollEnergy * 0.19
      : smootherStep(
          scroll / 0.92,
        ) * 0.7;

    const targetRotationX = compact
      ? 0.08 +
        mobileRotationX -
        touchY * 0.18 -
        scrollImpulse * 0.13
      : 0.08 +
        elapsed *
          0.07 *
          settleWeight +
        scroll * 0.52 -
        state.pointer.y *
          0.075 *
          pointerWeight;

    const targetRotationY = compact
      ? -0.4 +
        mobileContinuousSpin +
        mobileRotationY +
        touchX * 0.22 +
        scrollImpulse * 0.27
      : -0.4 +
        scroll * 0.46 +
        state.pointer.x *
          0.1 *
          pointerWeight;

    const targetRotationZ = compact
      ? -0.1 +
        mobileRotationZ -
        touchX * 0.17 +
        scrollImpulse * 0.19
      : -0.1 +
        scroll * 0.2 +
        state.pointer.x *
          0.035 *
          pointerWeight;

    root.position.x =
      THREE.MathUtils.damp(
        root.position.x,
        targetX,
        compact ? 4.5 : 3.4,
        delta,
      );

    root.position.y =
      THREE.MathUtils.damp(
        root.position.y,
        targetY,
        compact ? 4.5 : 3.8,
        delta,
      );

    root.position.z =
      THREE.MathUtils.damp(
        root.position.z,
        targetZ,
        compact ? 4.2 : 3.5,
        delta,
      );

    root.rotation.x =
      THREE.MathUtils.damp(
        root.rotation.x,
        targetRotationX,
        compact ? 4.8 : 3.2,
        delta,
      );

    root.rotation.y =
      THREE.MathUtils.damp(
        root.rotation.y,
        targetRotationY,
        compact ? 4.6 : 3.2,
        delta,
      );

    root.rotation.z =
      THREE.MathUtils.damp(
        root.rotation.z,
        targetRotationZ,
        compact ? 4.8 : 3.4,
        delta,
      );

    const baseScale = compact
      ? 0.78
      : 0.96;

    const targetScale = compact
      ? baseScale +
        mobileScalePulse +
        scrollEnergy * 0.016
      : baseScale;

    const nextScale =
      THREE.MathUtils.damp(
        root.scale.x,
        targetScale,
        compact ? 5 : 3.5,
        delta,
      );

    root.scale.setScalar(nextScale);

    /*
     * Keep plate separation disabled on phones.
     */
    const separation = compact
      ? 0
      : scrollPulse(scroll);

    PLATE_INSTANCES.forEach(
      (plate, index) => {
        const plateGroup =
          plateRefs.current[index];

        if (!plateGroup) {
          return;
        }

        const offset =
          separation *
          (0.035 +
            plate.stackIndex * 0.045);

        const targetPlateX =
          plate.side *
          (plate.distance + offset);

        plateGroup.position.x =
          THREE.MathUtils.damp(
            plateGroup.position.x,
            targetPlateX,
            6.2,
            delta,
          );
      },
    );

    ([-1, 1] as const).forEach(
      (side, index) => {
        const details =
          endCapDetailsRefs.current[index];

        if (!details) {
          return;
        }

        const endCapOffset =
          separation *
          (0.035 + 4 * 0.045);

        const targetEndCapX =
          side *
          (2.259 + endCapOffset);

        details.position.x =
          THREE.MathUtils.damp(
            details.position.x,
            targetEndCapX,
            6.2,
            delta,
          );
      },
    );

    const particles =
      particlesRef.current;

    if (particles) {
      if (compact) {
        particles.position.y =
          scrollEnergy * 0.035;

        particles.position.x =
          scrollImpulse * 0.025;

        particles.position.z =
          scrollEnergy * 0.06;

        particles.rotation.y +=
          scrollImpulse * delta * 0.28;

        particles.rotation.z =
          scrollImpulse * 0.025;
      } else {
        particles.position.y =
          Math.sin(elapsed * 0.42) * 0.06;

        particles.position.x =
          Math.sin(elapsed * 0.31) * 0.045;

        particles.position.z =
          scrollEnergy * 0.08;

        particles.rotation.y =
          elapsed * 0.018;

        particles.rotation.z =
          Math.sin(elapsed * 0.22) * 0.04;
      }
    }

    const previousState =
      previousModelStateRef.current;
    const particlesChanged = particles
      ? Math.abs(
          particles.position.x -
            previousState.particlesX,
        ) > 0.0008 ||
        Math.abs(
          particles.position.y -
            previousState.particlesY,
        ) > 0.0008 ||
        Math.abs(
          particles.position.z -
            previousState.particlesZ,
        ) > 0.0008 ||
        Math.abs(
          particles.rotation.y -
            previousState.particlesRy,
        ) > 0.0008 ||
        Math.abs(
          particles.rotation.z -
            previousState.particlesRz,
        ) > 0.0008
      : false;

    const modelChanged =
      Math.abs(root.position.x - previousState.x) >
        0.0008 ||
      Math.abs(root.position.y - previousState.y) >
        0.0008 ||
      Math.abs(root.position.z - previousState.z) >
        0.0008 ||
      Math.abs(root.rotation.x - previousState.rx) >
        0.0008 ||
      Math.abs(root.rotation.y - previousState.ry) >
        0.0008 ||
      Math.abs(root.rotation.z - previousState.rz) >
        0.0008 ||
      Math.abs(root.scale.x - previousState.scale) >
        0.0008 ||
      particlesChanged;

    previousState.x = root.position.x;
    previousState.y = root.position.y;
    previousState.z = root.position.z;
    previousState.rx = root.rotation.x;
    previousState.ry = root.rotation.y;
    previousState.rz = root.rotation.z;
    previousState.scale = root.scale.x;

    if (particles) {
      previousState.particlesX = particles.position.x;
      previousState.particlesY = particles.position.y;
      previousState.particlesZ = particles.position.z;
      previousState.particlesRy = particles.rotation.y;
      previousState.particlesRz = particles.rotation.z;
    }

    if (
      modelChanged &&
      active &&
      now <= renderUntilRef.current
    ) {
      invalidate();
    }
  });

  return (
    <>
      <group
        ref={rootRef}
        position={[
          0,
          reducedMotion ? 0 : -2.75,
          0,
        ]}
        rotation={[
          0.08,
          -0.4,
          -0.1,
        ]}
        scale={compact ? 0.78 : 0.96}
      >
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          castShadow={!compact}
        >
          <cylinderGeometry
            args={[
              0.16,
              0.16,
              2.22,
              compact ? 14 : 36,
              1,
            ]}
          />

          <meshPhysicalMaterial
            color={DARK_CHROME}
            metalness={0.94}
            roughness={0.3}
            bumpMap={knurlTexture}
            bumpScale={0.055}
            clearcoat={0.42}
            clearcoatRoughness={0.28}
          />
        </mesh>

        {([-1, 1] as const).map((side) => (
          <group key={side}>
            <mesh
              position={[
                side * 1.42,
                0,
                0,
              ]}
              rotation={[
                0,
                0,
                Math.PI / 2,
              ]}
              castShadow={!compact}
            >
              <cylinderGeometry
                args={[
                  0.22,
                  0.22,
                  0.66,
                  compact ? 14 : 32,
                ]}
              />

              <meshStandardMaterial
                color="#4D4F4D"
                metalness={0.98}
                roughness={0.2}
              />
            </mesh>

            <MetalCollar
              side={side}
              compact={compact}
            />
          </group>
        ))}

        {PLATE_INSTANCES.map(
          (plate, index) => (
            <WeightPlate
              key={`${plate.side}-${plate.stackIndex}`}
              ref={(node) => {
                plateRefs.current[index] =
                  node;
              }}
              {...plate}
              compact={compact}
            />
          ),
        )}

        <EndCapDetails
          ref={(node) => {
            endCapDetailsRefs.current[0] =
              node;
          }}
          side={-1}
        />

        <EndCapDetails
          ref={(node) => {
            endCapDetailsRefs.current[1] =
              node;
          }}
          side={1}
        />
      </group>

      <ChalkParticles
        compact={compact}
        particlesRef={particlesRef}
      />
    </>
  );
}