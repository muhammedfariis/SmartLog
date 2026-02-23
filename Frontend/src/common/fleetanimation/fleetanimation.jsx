import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./fleetanimation.module.css";

const VEHICLE_ASSETS = [
  "/images/container.png",
  "/images/truck.png",
  "/images/mintruck.png",
  "/images/van.png",
];

const ROAD_HEIGHT = 280;
const LANE_HEIGHT = ROAD_HEIGHT / 4; 
const CONTAINER_H = 380;
const ROAD_TOP    = (CONTAINER_H - ROAD_HEIGHT) / 2; 

const LANES = [
  { id: 0, dir: -1, yPx: ROAD_TOP + LANE_HEIGHT * 0.5 },
  { id: 1, dir: -1, yPx: ROAD_TOP + LANE_HEIGHT * 1.5 },
  { id: 2, dir:  1, yPx: ROAD_TOP + LANE_HEIGHT * 2.5 },
  { id: 3, dir:  1, yPx: ROAD_TOP + LANE_HEIGHT * 3.5 },
];

const VEHICLE_W   = 180;
const MIN_GAP     = 60;
const SAFE_DIST   = VEHICLE_W + MIN_GAP;
const BASE_SPEED  = 2.2;
const STOP_OFFSET = 8;      
const SIGNAL_MS   = 8000;

let _uid = 0;
const uid = () => ++_uid;

function spawnVehicle(laneId, xOverride) {
  const lane  = LANES[laneId];
  const speed = BASE_SPEED + Math.random() * 1.2;
  const src   = VEHICLE_ASSETS[Math.floor(Math.random() * VEHICLE_ASSETS.length)];
  const x     = xOverride !== undefined
    ? xOverride
    : lane.dir === 1 ? -VEHICLE_W - 20 : window.innerWidth + 20;
  return { id: uid(), laneId, dir: lane.dir, yPx: lane.yPx, x, speed, src };
}

function getStopLine(dir) {
  const ctr = typeof window !== "undefined" ? window.innerWidth / 2 : 800;
  return dir === 1
    ? ctr - VEHICLE_W - STOP_OFFSET
    : ctr + STOP_OFFSET;
}

export default function FleetAnimation() {
  const [isGreen, setIsGreen]   = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const isGreenRef  = useRef(true);
  const rafRef      = useRef(null);
  const vehiclesRef = useRef([]);

  useEffect(() => { isGreenRef.current = isGreen; }, [isGreen]);

  useEffect(() => {
    const initial = [];
    LANES.forEach(lane => {
      for (let i = 0; i < 3; i++) {
        const offset = (i + 1) * (VEHICLE_W + 220);
        const x = lane.dir === 1 ? -offset : window.innerWidth + offset;
        initial.push(spawnVehicle(lane.id, x));
      }
    });
    vehiclesRef.current = initial;
    setVehicles(initial);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIsGreen(p => !p), SIGNAL_MS);
    return () => clearInterval(t);
  }, []);

  const animate = useCallback(() => {
    const green = isGreenRef.current;
    const W     = window.innerWidth;

    vehiclesRef.current = vehiclesRef.current.map(v => {
      const stopLine = getStopLine(v.dir);

      const pastStop = v.dir === 1 ? v.x >= stopLine : v.x <= stopLine;

      const approachingStop = !pastStop && (
        v.dir === 1 ? v.x > stopLine - 4 : v.x < stopLine + 4
      );

      const blockedBySignal = !green && approachingStop;

      const leader = vehiclesRef.current.find(other => {
        if (other.id === v.id || other.laneId !== v.laneId) return false;
        return v.dir === 1
          ? other.x > v.x && other.x < v.x + SAFE_DIST
          : other.x < v.x && other.x > v.x - SAFE_DIST;
      });

      const shouldStop = blockedBySignal || !!leader;

      let nextX = v.x;
      if (!shouldStop) {
        nextX += v.speed * v.dir;
        if (!green && !pastStop) {
          if (v.dir ===  1 && nextX > stopLine) nextX = stopLine;
          if (v.dir === -1 && nextX < stopLine) nextX = stopLine;
        }
      }

      const exited = v.dir === 1 ? nextX > W + VEHICLE_W + 50 : nextX < -VEHICLE_W - 50;
      if (exited) {
        return spawnVehicle(v.laneId, v.dir === 1 ? -VEHICLE_W - 20 : W + 20);
      }

      return { ...v, x: nextX };
    });

    setVehicles([...vehiclesRef.current]);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const ctrX = typeof window !== "undefined" ? window.innerWidth / 2 : 800;

  return (
    <div className={styles.container}>

      <div className={styles.road}>
        <div
          className={`${styles.laneRule} ${styles.dashed}`}
          style={{ top: `${LANE_HEIGHT * 1}px` }}
        />
        <div
          className={`${styles.laneRule} ${styles.solid}`}
          style={{ top: `${LANE_HEIGHT * 2}px` }}
        />
        <div
          className={`${styles.laneRule} ${styles.dashed}`}
          style={{ top: `${LANE_HEIGHT * 3}px` }}
        />
      </div>

      <div className={styles.signalWrap} style={{ left: `${ctrX}px` }}>
        <div className={styles.trafficLight}>
          <div className={`${styles.bulb} ${!isGreen ? styles.redOn : styles.redOff}`} />
          <div className={`${styles.bulb} ${isGreen  ? styles.greenOn : styles.greenOff}`} />
        </div>
        <div className={styles.pole} />
      </div>

      {vehicles.map(v => (
        <div
          key={v.id}
          className={`${styles.vehicle} ${v.dir === -1 ? styles.rtl : ""}`}
          style={{ left: `${v.x}px`, top: `${v.yPx}px` }}
        >
          <img
            src={v.src}
            alt="fleet vehicle"
            className={styles.vehicleImg}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}