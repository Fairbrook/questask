import { lstatSync, mkdirSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { uid } from "uid";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const target = path.join("./public", "quiz");
  if (!lstatSync(target, { throwIfNoEntry: false })?.isDirectory()) {
    mkdirSync(target);
  }
  const quiz = JSON.parse(req.body);
  const id = uid();
  writeFileSync(
    path.join(target, `${id}:${quiz.name}:${quiz.author}.json`).toString(),
    req.body
  );
  res.status(200).send(id);
}
