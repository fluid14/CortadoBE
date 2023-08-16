export default function throwAxiosData(data, res = null) {
    if (res) {
        res.status(data.status);
        res.send(data.data);
    }
    return data;
}

