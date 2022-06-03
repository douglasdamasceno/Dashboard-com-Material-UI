import { Environment } from '../../environment';
import { Api } from "./axios-config";


export interface IPerson{
    id: number;
    email: string;
    cityId: number;
    name: string;
}

export interface IPersonDetails{
    id: number;
    email: string;
    cityId: number;
    name: string;
}

type TPersonWithCount = {
    data:IPerson[];
    totalCount:number;
}

const getAll = async (page=1,filter=''):Promise<TPersonWithCount | Error> => {
    try {
        const urlRelative = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
        const {data,headers} = await Api.get(urlRelative);
        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }
        return new Error("Erro ao buscar pessoas");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao buscar pessoas");
    }
};

const getById = async (id:number):Promise<IPersonDetails | Error> => {
    try {
        const {data} = await Api.get(`/pessoas/${id}`);
        if(data){
            return data;
        }
        return new Error("Erro ao buscar pessoa");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao buscar pessoa");
    }
};

const create = async (person:Omit<IPersonDetails,'id'>):Promise<number | Error> => {
    try {
        const {data} = await Api.post<IPersonDetails>('/pessoas',person);
        if(data){
            return data.id;
        }
        return new Error("Erro ao criar o registro");
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao criar o registro");
    }
};

const updateById = async (id:number, person:IPersonDetails):Promise<void | Error> => {
    try {
        await Api.put(`/pessoas/${id}`,person);
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao atualizar o registro");
    }
};

const deleteById = async (id:number):Promise<void | Error> => {
    try {
        await Api.delete(`/pessoas/${id}`);
    } catch (error) {
        console.log(error);
        return new Error((error as {message:string}).message || "Erro ao deletar o registro");
    }
};

export const PersonService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}