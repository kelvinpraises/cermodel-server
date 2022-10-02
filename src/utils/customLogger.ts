import { writeFile } from "node:fs/promises";

const cl = console.log;

export default async function customLogger(...args: any[]) {
  await writeFile("exp.txt", JSON.stringify(args));

  cl.apply(console, args);
}
