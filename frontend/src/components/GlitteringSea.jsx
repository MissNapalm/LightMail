import React, { useEffect } from "react";

const GlitteringSea = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    let X = (canvas.width = window.innerWidth);
    let Y = (canvas.height = window.innerHeight);
    const shapes = [];
    const shapeNum = 300;

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    class Shape {
      constructor(ctx, x, y) {
        this.ctx = ctx;
        this.init(x, y);
      }

      init(x, y) {
        this.x = x;
        this.y = y;
        this.r = rand(10, 25);
        this.ga = Math.random() * Math.random() * Math.random() * Math.random();
        this.v = { x: Math.random(), y: -1 };
        this.l = rand(0, 20);
        this.sl = this.l;
      }

      updateParams() {
        this.l -= 1;
        if (this.l < 0) {
          this.init(X * (Math.random() + Math.random()) / 2, rand(0, Y));
        }
      }

      updatePosition() {
        this.x += Math.random();
        this.y += -Math.random();
      }

      draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = this.ga;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
      }

      render() {
        this.updatePosition();
        this.updateParams();
        this.draw();
      }
    }

    for (let i = 0; i < shapeNum; i++) {
      shapes.push(new Shape(ctx, X * (Math.random() + Math.random()) / 2, rand(0, Y)));
    }

    const render = () => {
      ctx.clearRect(0, 0, X, Y);
      shapes.forEach((shape) => shape.render());
      requestAnimationFrame(render);
    };

    render();

    const onResize = () => {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas id="canvas" className="absolute top-0 left-0 w-full h-full" />;
};

export default GlitteringSea;
