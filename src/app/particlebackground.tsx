"use client";
import React from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";

function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      options={{
        background: {
          color: {
            value: "#242424",
          },
        },
        particles: {
          number: { value: 10, density: { enable: true, value_area: 600 } },
          color: { value: "#ffffff" },
          shape: {
            type: "square",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: {
            value: 0.25,
            random: true,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 29,
            random: true,
            anim: { enable: false, speed: 2, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: false,
            distance: 300,
            color: "#ffffff",
            opacity: 0,
            width: 0,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "top",
            straight: true,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: { enable: false, mode: "repulse" },
            onclick: { enable: false, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 800, line_linked: { opacity: 1 } },
            bubble: {
              distance: 790,
              size: 79,
              duration: 2,
              opacity: 0.8,
              speed: 3,
            },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      }}
      init={particlesInit}
    />
  );
}

export default ParticleBackground;
