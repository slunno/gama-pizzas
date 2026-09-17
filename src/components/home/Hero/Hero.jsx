import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import AnimatedGradient from "./AnimatedGradient";

import imgMarguerita from "../../../assets/images/pizzas/marguerita.jpg";
import imgCalabresa from "../../../assets/images/pizzas/calabresa.jpg";
import imgQuatroQueijos from "../../../assets/images/pizzas/quatro-queijos.jpg";
import imgPepperoni from "../../../assets/images/pizzas/pepperoni.jpg";
import imgFrangoCatupiry from "../../../assets/images/pizzas/frango-catupiry.jpg";
import imgSensacao from "../../../assets/images/pizzas/sensacao.jpg";

import "./Hero.css";

const pizzas = [
  {
    name: "Marguerita",
    image: imgMarguerita,
    glow: "rgba(76, 175, 80, 0.25)",
  },
  {
    name: "Calabresa Acebolada",
    image: imgCalabresa,
    glow: "rgba(183, 28, 28, 0.25)",
  },
  {
    name: "Quatro Queijos",
    image: imgQuatroQueijos,
    glow: "rgba(255, 193, 7, 0.3)",
  },
  {
    name: "Pepperoni",
    image: imgPepperoni,
    glow: "rgba(230, 74, 25, 0.25)",
  },
  {
    name: "Frango com Catupiry",
    image: imgFrangoCatupiry,
    glow: "rgba(255, 235, 59, 0.2)",
  },
  {
    name: "Sensação",
    image: imgSensacao,
    glow: "rgba(211, 47, 47, 0.25)",
  },
];

/* ---------- animações do Framer Motion ---------- */

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    rotateY: direction > 0 ? 35 : -35,
    scale: 0.5,
    opacity: 0,
  }),
  center: {
    x: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 24,
      mass: 1,
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -500 : 500,
    rotateY: direction > 0 ? -35 : 35,
    scale: 0.5,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 24,
    },
  }),
};

const floatAnimation = {
  y: [0, -18, 0],
  rotateZ: [-1.5, 1.5, -1.5],
  transition: {
    duration: 4.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const textVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

/* ========================================
   HERO COMPONENT
======================================== */

const AUTOPLAY_INTERVAL = 5000;

function Hero() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const isPaused = useRef(false);
  const timerRef = useRef(null);

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => {
      const next = (prev + dir + pizzas.length) % pizzas.length;
      return [next, dir];
    });
  }, []);

  /* ---------- autoplay ---------- */
  useEffect(() => {
    const startTimer = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (!isPaused.current) {
          paginate(1);
        }
      }, AUTOPLAY_INTERVAL);
    };

    startTimer();
    return () => clearInterval(timerRef.current);
  }, [paginate]);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };
  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  const pizza = pizzas[current];

  return (
    <section className="hero" id="inicio">
      <AnimatedGradient />

      <div className="hero-overlay" />

      <div className="hero-content">

        {/* carrossel 3D */}
        <div
          className="pizza-carousel"
          style={{ perspective: "1200px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="carousel-arrow left"
            onClick={() => paginate(-1)}
            aria-label="Pizza anterior"
          >
            <FaChevronLeft />
          </button>

          <div className="pizza-stage">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                className="pizza-3d-wrapper"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="pizza-float-container"
                  animate={floatAnimation}
                >
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-image-3d"
                    draggable={false}
                  />
                  {/* sombra elíptica projetada abaixo da pizza */}
                  <div className="pizza-shadow-3d" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* glow ambiente sob a pizza */}
            <div
              className="pizza-glow"
              style={{
                background: `radial-gradient(ellipse, ${pizza.glow} 0%, transparent 70%)`,
              }}
            />
          </div>

          <button
            className="carousel-arrow right"
            onClick={() => paginate(1)}
            aria-label="Próxima pizza"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* nome do sabor */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="pizza-info"
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h2 className="pizza-name">{pizza.name}</h2>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="hero-actions">
          <a href="#rodizios" className="hero-button primary">
            Conhecer Rodízios
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
