export default function throwAxiosData(data, res) {
    res.status(data.status);
    res.send(data.data);
    return data;
}

