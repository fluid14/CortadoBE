import {EMPTY} from "rxjs";
import {Logger} from "@nestjs/common";

export default function catchAxiosError(error, res = null) {
    if (error.response?.status && res) res.status(error.response.status);
    if (error.response?.data) {
        if(res) res.send(error.response.data);
        Logger.error(error.response.data);
    }
    return EMPTY;
}

