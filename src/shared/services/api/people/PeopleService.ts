import { Environment } from './../../../environment';
import { Api } from "../axios-config";


interface IPeople{
    id: number;
    email: string;
    cityId: number;
    name: string;
}
interface IPeopleDetail{
    id: number;
    email: string;
    cityId: number;
    name: string;
}
type TPeopleWithCount = {
    data:IPeople[];
    countTotal:number;
}

const getAll = async (page=1,filter=''):Promise<TPeopleWithCount | Error> => {
    try {
        const urlRelative = `/pessoas_page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
        const {data,headers} = await Api.get(urlRelative);
        if(data){
            return {
                data: data.data,
                countTotal: Number(headers['x-total-count']) || Environment.LIMITE_DE_LINHAS,
            }
        }
        return new Error("Erro ao buscar pessoas");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao buscar pessoas");
    }
};

export const PeopleService = {
    getAll,
}