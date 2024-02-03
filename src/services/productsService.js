import { useMutation, useQuery } from "@tanstack/react-query"
import { apiUrls } from "../constants"
import { getRequest, postRequest, deleteRequestById, putRequest, postRequestWithFile } from "../helpers/index"

export const productsService = {
    getProducts: (key, options) => {
        return useQuery([key], () => {
            return getRequest(apiUrls.getProducts)
        }, options)
    },
}
