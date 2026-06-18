import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export async function readJson<T>(
  filename: string,
  defaultValue: T,
): Promise<T> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const p = path.join(dataDir, filename);
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    return defaultValue;
  }
}

export async function writeJson(filename: string, value: any) {
  await fs.mkdir(dataDir, { recursive: true });
  const p = path.join(dataDir, filename);
  await fs.writeFile(p, JSON.stringify(value, null, 2), "utf8");
}
