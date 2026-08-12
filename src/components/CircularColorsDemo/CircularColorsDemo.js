"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "motion/react";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    const updateElapsed = window.setInterval(() => {
      if (isRunning) {
        const newTimeElapsed = timeElapsed + 1;
        setTimeElapsed(newTimeElapsed);
      }
    }, 1 * 1000);

    return () => {
      window.clearInterval(updateElapsed);
    };
  }, [isRunning, timeElapsed]);

  const handlePlayPauseClick = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId="blockOutline"
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isRunning ? (
            <button>
              <Play onClick={handlePlayPauseClick} />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          ) : (
            <button>
              <Pause onClick={handlePlayPauseClick} />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button>
            <RotateCcw onClick={handleResetClick} />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
