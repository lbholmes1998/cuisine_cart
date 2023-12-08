import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'

type ResponseData = {
    data: object
}
interface Recipe {
    id: number,
    title: string,
    image: string,
    imageType: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const query = req.query.recipe
        const response = await axios.get(`http://127.0.0.1:8080/api/recipes?query=${query}`)
        const data: Recipe[] = await response.data.results;  // TS expects array type, not having 'await' gives 'response' the 'promise' type which causes errors.

        res.status(200).json({data})
    } catch (err) {
        console.log(err)
    }
    
}
