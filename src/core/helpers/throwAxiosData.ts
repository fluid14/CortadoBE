export default function throwAxiosData(data, res) {
    // console.log(data)
    // console.log(res)
    res.status(data.status);
    res.send(data.data);
    return data;
}

