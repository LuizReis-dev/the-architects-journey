import { useEffect, useRef } from "react";
import type { PixelCharacter } from "../characters";

type PixelSpriteProps = {
  character: PixelCharacter;
  scale?: number;
  bob?: boolean;
};

export default function PixelSprite({ character, scale = 6, bob = false }: PixelSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rows = character.map.length;
    const columns = character.map[0].length;
    const context = canvas.getContext("2d");

    canvas.width = columns * scale;
    canvas.height = rows * scale;

    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const color = character.palette[character.map[y][x]];

        if (!color) {
          continue;
        }

        context.fillStyle = color;
        context.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }, [character, scale]);

  return (
    <canvas
      ref={canvasRef}
      className={bob ? "spr bob" : "spr"}
      style={{
        width: character.map[0].length * scale,
        height: character.map.length * scale,
        display: "block",
        imageRendering: "pixelated",
      }}
    />
  );
}
