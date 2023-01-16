import {redisClient} from "../../config/RedisConfig";
import {CODE_OK} from "../enums/Errors";

export async function cacheDataParams(req, res, next) {
    const query = req.params;
    let results;
    try {
        const cacheResults = await redisClient.get(query);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.status(results?.code ?? CODE_OK).send(results);
        } else {
            next();
        }
    } catch (error) {
        res.status(404);
    }
}

export async function cacheDataBody(req, res, next) {
    const query = req.body;
    let results;
    try {
        const cacheResults = await redisClient.get(query);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.status(results?.code ?? CODE_OK).send(results);
        } else {
            next();
        }
    } catch (error) {
        res.status(404);
    }
}