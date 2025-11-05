import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDataConnectionStore } from "../../store/connectionData.ts";


interface ConnectionFormData {
    ip: string;
    port: number;
}



function Connection() {
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm<ConnectionFormData>()

    function connectServer(data: ConnectionFormData) {
        useDataConnectionStore.getState().setConnectionData(data.ip, data.port);
        navigate('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-10 w-lg bg-gray-50 rounded-md shadow-lg">
                <h1 className="text-center text-xl">Conecte-se com o servidor</h1>
                <form className="mt-5" onSubmit={handleSubmit(connectServer)}>
                    <fieldset className="border border-gray-500 rounded-md p-10">
                        <div className="flex flex-col gap-5">
                            <label htmlFor="ip">Digite o IP do servidor: </label>
                            <input type="text" className="border rounded-md p-3" placeholder="IP" {...register('ip')} />
                            <label htmlFor="port">Digite a porta do servidor: </label>
                            <input type="text" className="border rounded-md p-3" placeholder="Porta" {...register('port')} />
                        </div>
                    </fieldset>
                    <div className="flex justify-end mt-5">
                        <button type="submit" className="p-4 bg-blue-400 rounded-md font-semibold cursor-pointer">Conectar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Connection
