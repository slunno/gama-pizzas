import { useEffect, useRef } from "react";

function AnimatedGradient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = [
      { r: 13, g: 16, b: 36 },    // --background-dark #0d1024
      { r: 21, g: 26, b: 53 },    // --background-card #151a35
      { r: 242, g: 140, b: 56 },  // --primary-color #f28c38
      { r: 17, g: 21, b: 47 },    // #11152f hero bg
      { r: 255, g: 159, b: 77 },  // --primary-hover #ff9f4d
    ];

    const blobs = colors.map((color, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (0.0003 + Math.random() * 0.0004) * (i % 2 === 0 ? 1 : -1),
      vy: (0.0003 + Math.random() * 0.0004) * (i % 2 === 0 ? -1 : 1),
      radius: 0.3 + Math.random() * 0.25,
      color,
    }));

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0d1024";
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((blob) => {
        blob.x += blob.vx + Math.sin(time + blob.x * 3) * 0.0005;
        blob.y += blob.vy + Math.cos(time + blob.y * 3) * 0.0005;

        if (blob.x < -0.2) blob.x = 1.2;
        if (blob.x > 1.2) blob.x = -0.2;
        if (blob.y < -0.2) blob.y = 1.2;
        if (blob.y > 1.2) blob.y = -0.2;

        const cx = blob.x * w;
        const cy = blob.y * h;
        const r = blob.radius * Math.max(w, h);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const { color } = blob;

        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.35)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.12)`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      });

      // vignette
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.75);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

export default AnimatedGradient;
