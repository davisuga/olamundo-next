import type { NextApiRequest, NextApiResponse } from "next";

type handler_props = {
    create_one: (req: NextApiRequest, res: NextApiResponse) => void;
    find_all: (req: NextApiRequest, res: NextApiResponse) => void;
    find_one: (req: NextApiRequest, res: NextApiResponse) => void;
    update_one: (req: NextApiRequest, res: NextApiResponse) => void;
    delete_one: (req: NextApiRequest, res: NextApiResponse) => void;
};
export default function build_handler({
    create_one,
    find_one,
    find_all,
    update_one,
    delete_one,
}: handler_props) {
    return function handler(req, res) {
        switch (req.method) {
            case "POST":
                return create_one(req, res);
            case "GET":
                return parseInt(req.query.id)
                    ? find_one(req, res)
                    : find_all(req, res);
            case "PUT":
                return update_one(req, res);
            case "DELETE":
                return delete_one(req, res);
            default:
                break;
        }
    };
}
