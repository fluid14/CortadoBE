export default function throwAxiosData(data, res = null) {
    console.log(data)
    // console.log(res)
    if (res) {
        res.status(data.status);
        res.send(data.data);
    }
    return data;
}

