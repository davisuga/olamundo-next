import { PrismaClient } from "@prisma/client";
import build_handler from "../../utils/buildReqHandler";

const prisma = new PrismaClient();

const find_all = async (req: any, res: any) => {
  const result = await prisma.lesson.findMany({
    orderBy: {
      title: "asc",
    },
  });
  res.json(result);
};
const find_one = async (req: any, res: any) => {
  try {
    const result = await prisma.lesson.findOne({
      where: { id: parseInt(req.query.id) },
    });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
const create_one = async (req: any, res: any) => {
  try {
    const result = await prisma.lesson.create({
      data: req.body,
    });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
const delete_one = async (req: any, res: any) => {
  try {
    const result = await prisma.lesson.delete({
      where: { id: parseInt(req.query.id) },
    });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
const update_one = async (req: any, res: any) => {
  try {
    const result = await prisma.lesson.update({
      where: { id: parseInt(req.query.id) },
      data: req.body,
    });
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export default build_handler({
  find_all,
  find_one,
  delete_one,
  update_one,
  create_one,
});
