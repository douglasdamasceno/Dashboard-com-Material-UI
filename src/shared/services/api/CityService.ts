import { Environment } from '../../environment';
import { Api } from "./axios-config";


export interface ICity{
    id: number;
    name: string;
}

export interface ICityDetails{
    id: number;
    name: string;
}

type TCityWithCount = {
    data:ICity[];
    totalCount:number;
}

const getAll = async (page=1,filter=''):Promise<TCityWithCount | Error> => {
    try {
        const urlRelative = `/cidades?_page=${page}&_limit=${Environment.ROWS_LIMIT }&name_like=${filter}`;
        const {data,headers} = await Api.get(urlRelative);
        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.ROWS_LIMIT ),
            }
        }
        return new Error("Erro ao buscar cidades");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao buscar cidades");
    }
};

const getById = async (id:number):Promise<ICityDetails | Error> => {
    try {
        const {data} = await Api.get(`/cidades/${id}`);
        if(data){
            return data;
        }
        return new Error("Erro ao buscar cidade");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao buscar cidade");
    }
};

const create = async (City:Omit<ICityDetails,'id'>):Promise<number | Error> => {
    try {
        const {data} = await Api.post<ICityDetails>('/cidades',City);
        if(data){
            return data.id;
        }
        return new Error("Erro ao criar o registro");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao criar o registro");
    }
};

const updateById = async (id:number, City:ICityDetails):Promise<void | Error> => {
    try {
        await Api.put(`/cidades/${id}`,City);
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao atualizar o registro");
    }
};

const deleteById = async (id:number):Promise<void | Error> => {
    try {
        await Api.delete(`/cidades/${id}`);
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao deletar o registro");
    }
};

export const CityService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}