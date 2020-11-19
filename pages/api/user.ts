import { PrismaClient } from "@prisma/client";
import build_handler from "./_utils";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const find_all = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.query;
    const result = await prisma.user.findMany({
        //@ts-ignore
        where: { email: email },
    });
    res.json(result);
};

const find_one = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await prisma.user.findOne({
            //@ts-ignore
            where: { id: parseInt(req.query.id) },
        });
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const create_one = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await prisma.user.create({
            data: req.body,
        });
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const delete_one = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await prisma.user.delete({
            //@ts-ignore
            where: { id: parseInt(req.query.id) },
        });
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const update_one = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await prisma.user.update({
            //@ts-ignore
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
