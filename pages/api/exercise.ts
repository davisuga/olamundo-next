import { PrismaClient } from "@prisma/client";
import build_handler from "./_utils";

const prisma = new PrismaClient();

const find_all = async (req: any, res: any) => {
    const lessonId = req.query?.lessonId;
    console.log("searching exercises on lesson id ", lessonId);
    const result = await prisma.exercise.findMany(
        lessonId && { where: { lessonId: parseInt(lessonId) } }
    );
    res.json(result);
};

const find_one = async (req: any, res: any) => {
    try {
        const result = await prisma.exercise.findOne({
            where: {
                id: parseInt(req.query.id),
            },
        });

        res.json(result);
    } catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const create_one = async (req: any, res: any) => {
    try {
        const result = await prisma.exercise.create({
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
        const result = await prisma.exercise.delete({
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
        const result = await prisma.exercise.update({
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
