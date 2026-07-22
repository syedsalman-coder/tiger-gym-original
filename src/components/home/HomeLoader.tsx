"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useState,
} from "react";

import Logo from "@/components/shared/Logo";
import { pageContent } from "@/data/pages";
import { site } from "@/data/site";
import {
  getLocalizedValue,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const loaderStorageKey =
  "tiger-gym-home-loader-seen";

export default function HomeLoader({
  locale,
}: {
  locale: Locale;
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const dictionary = getDictionary(locale);

  const text = (
    value: Parameters<typeof getLocalizedValue>[0],
  ) => getLocalizedValue(value, locale);

  useEffect(() => {
    let hasSeenLoader = false;

    try {
      hasSeenLoader =
        window.sessionStorage.getItem(
          loaderStorageKey,
        ) === "true";
    } catch {
      hasSeenLoader = false;
    }

    if (hasSeenLoader) {
      const hideFrame =
        window.requestAnimationFrame(() => {
          setProgress(100);
          setVisible(false);
        });

      return () => {
        window.cancelAnimationFrame(hideFrame);
      };
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = reduceMotion ? 160 : 900;

    let animationFrame = 0;
    let exitTimer = 0;

    const updateProgress = (time: number) => {
      const nextProgress = Math.min(
        100,
        Math.round(
          ((time - start) / duration) * 100,
        ),
      );

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame =
          window.requestAnimationFrame(
            updateProgress,
          );

        return;
      }

      exitTimer = window.setTimeout(
        () => {
          try {
            window.sessionStorage.setItem(
              loaderStorageKey,
              "true",
            );
          } catch {
            // Continue when browser storage is unavailable.
          }

          setVisible(false);

          document.body.style.overflow =
            previousOverflow;
        },
        reduceMotion ? 30 : 100,
      );
    };

    animationFrame =
      window.requestAnimationFrame(
        updateProgress,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      window.clearTimeout(exitTimer);

      document.body.style.overflow =
        previousOverflow;
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="home-loader"
          role="status"
          aria-label={
            dictionary.accessibility.loading
          }
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: "-100%" }
          }
          transition={{
            duration: reduceMotion ? 0.12 : 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div
            className="home-loader__grid"
            aria-hidden="true"
          />

          <div className="home-loader__brand">
            <Logo
              locale={locale}
              priority
            />

            <p>
              {text(site.name)}

              <span>
                {text(site.descriptor)}
              </span>
            </p>
          </div>

          <div
            className="home-loader__claws"
            aria-hidden="true"
          >
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                initial={
                  reduceMotion
                    ? false
                    : { scaleX: 0 }
                }
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.38,
                  delay: reduceMotion
                    ? 0
                    : item * 0.08,
                }}
              />
            ))}
          </div>

          <div className="home-loader__progress">
            <span>
              {text(
                pageContent.home.loader
                  .progressLabel,
              )}
            </span>

            <strong>
              {progress
                .toString()
                .padStart(3, "0")}
            </strong>
          </div>

          <div className="home-loader__line">
            <span
              style={{
                transform: `scaleX(${
                  progress / 100
                })`,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}