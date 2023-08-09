import {EMPTY} from "rxjs";
import {Logger} from "@nestjs/common";

export default function catchAxiosError(error, res) {
    if (error.response?.status) res.status(error.response.status);
    if (error.response?.data) {
        res.send(error.response.data);
        Logger.error(error.response.data);
    }
    return EMPTY;
}

