/**
 * Genera los iconos de sitio a partir del isotipo oficial
 * `public/logo_a_almate.png`, sin redibujarlo ni alterar su forma.
 *
 * Reglas:
 * - Se conserva la proporción original (cuadrado).
 * - El arte negro se compone sobre una superficie clara para garantizar
 *   contraste. No se aplican filtros ni recoloreados.
 * - El archivo original no se modifica.
 *
 * Uso:
 *   node scripts/generate-brand-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync, inflateSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const SOURCE = join(publicDir, 'logo_a_almate.png');

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function decodePng(buffer) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    }
    pos += 12 + length;
  }
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
    throw new Error(`Formato PNG no soportado: colorType=${colorType}, bitDepth=${bitDepth}`);
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const up = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let value = line[x];
      if (filter === 1) value += a;
      else if (filter === 2) value += up;
      else if (filter === 3) value += (a + up) >> 1;
      else if (filter === 4) {
        const p = a + up - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - c);
        value += pa <= pb && pa <= pc ? a : pb <= pc ? up : c;
      }
      cur[x] = value & 255;
    }
    cur.copy(out, y * stride);
    prev = cur;
  }
  return { width, height, bpp, data: out };
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function contentBounds(image) {
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const alpha = image.data[(y * image.width + x) * image.bpp + (image.bpp - 1)];
      if (alpha > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function renderIcon(image, bounds, size, padding) {
  const out = Buffer.alloc(size * size * 4);
  // Fondo claro oficial: niebla (#F2F2F2). Sin filtros sobre el arte original.
  for (let i = 0; i < size * size; i += 1) {
    out[i * 4] = 0xf2;
    out[i * 4 + 1] = 0xf2;
    out[i * 4 + 2] = 0xf2;
    out[i * 4 + 3] = 0xff;
  }

  const box = size - padding * 2;
  const scale = box / Math.max(bounds.width, bounds.height);
  const drawWidth = bounds.width * scale;
  const drawHeight = bounds.height * scale;
  const offsetX = (size - drawWidth) / 2;
  const offsetY = (size - drawHeight) / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sx = (x + 0.5 - offsetX) / scale + bounds.minX;
      const sy = (y + 0.5 - offsetY) / scale + bounds.minY;
      if (sx < bounds.minX || sy < bounds.minY || sx >= bounds.maxX + 1 || sy >= bounds.maxY + 1) continue;

      const x0 = Math.min(image.width - 1, Math.max(0, Math.floor(sx)));
      const y0 = Math.min(image.height - 1, Math.max(0, Math.floor(sy)));
      const index = (y0 * image.width + x0) * image.bpp;
      const alpha = (image.bpp === 4 ? image.data[index + 3] : 255) / 255;
      const r = image.data[index];
      const g = image.data[index + 1];
      const b = image.data[index + 2];
      const outIndex = (y * size + x) * 4;
      out[outIndex] = Math.round(r * alpha + out[outIndex] * (1 - alpha));
      out[outIndex + 1] = Math.round(g * alpha + out[outIndex + 1] * (1 - alpha));
      out[outIndex + 2] = Math.round(b * alpha + out[outIndex + 2] * (1 - alpha));
    }
  }
  return out;
}

const source = decodePng(readFileSync(SOURCE));
const bounds = contentBounds(source);
console.log(`Isotipo oficial: ${source.width}×${source.height}. Arte: ${bounds.width}×${bounds.height}.`);

const targets = [
  { file: 'favicon-32.png', size: 32, padding: 2 },
  { file: 'apple-touch-icon.png', size: 180, padding: 22 },
  { file: 'icon-192.png', size: 192, padding: 24 },
  { file: 'icon-512.png', size: 512, padding: 64 },
];

for (const target of targets) {
  const rgba = renderIcon(source, bounds, target.size, target.padding);
  const png = encodePng(target.size, target.size, rgba);
  writeFileSync(join(publicDir, target.file), png);
  console.log(`Generado public/${target.file} (${target.size}×${target.size}, ${png.length} bytes)`);
}
