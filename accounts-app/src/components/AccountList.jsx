import { useEffect, useState } from "react"
import { useNavigate, useLocation  } from 'react-router-dom';

import Token from '../states/token'


export default function AccountList(){
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const{state: stateInput} = useLocation()

    const bankCode = stateInput.bankCode
    const bankDisplayName = stateInput.bankDisplayName

    const getAccounts = async () => {
        setLoading(true)
        console.log('get accounts')
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': Token.getToken()
            }
        }
        const url = `${import.meta.env.VITE_GET_ACCOUNTS_BY_BANK}/${bankCode}`
        const response = await fetch(url, options)
        const data = await response.json()
        console.log('data response', data)
        setLoading(false)
        setAccounts(data)
    }

    const selectAccount = async (accountName, accountId, linkId) => {
        console.log("select account:", accountName, accountId, linkId)
        const state = {
            accountName,
            accountId,
            linkId
        }
        navigate('/movements', {state: state})
    }

    const table = ()=>{
        return (
            <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-b">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-14">
                    <tr className="border-b ">
                        <th>
                            Nombre de cuenta
                        </th>
                        <th>
                            Tipo de cuenta
                        </th>
                        <th>
                            Código
                        </th>
                        <th>
                            Ver detalle
                        </th>
                    </tr>
                </thead>
                <tbody>
            {
                accounts.length > 0 && accounts.map((account)=>{
                    return (
                        <tr
                            className="border-b h-14"
                            key={account.id}
                        >
                            <td>
                                {account.name}
                            </td>
                            <td>
                                {account.type}
                            </td>
                            <td>
                                {account.internal_identification}
                            </td>
                            <td>
                                <button
                                    onClick={()=>{
                                        selectAccount(
                                            account.name,
                                            account.id,
                                            account.link
                                        )}
                                    }
                                    className="text-blue-500"
                                >
                                    Ver detalle
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
                </tbody>
            </table>
            </div>
        )
    }

    useEffect(()=>{
        if(!bankCode){
            navigate('/banklist')
            return
        }
        console.log('bankSelected', bankCode)
        getAccounts()
    }, [])

    return (
        <>
            <h1 className={
                `text-center text-2xl font-bold mt-6`
            }>
                    Lista de cuentas
            </h1>
            <h2 className={
                `text-center text-l mb-10`
            }>
                    Banco: {bankDisplayName}
            </h2>
            {
                // SI no hay ninguna cuenta
                !loading && accounts.length === 0 && (
                    <div
                        className="text-center text-lg"
                    >
                        Este banco no tiene ninguna cuenta
                    </div>
                )
            }
            {
                // Si está cargando
                loading && (
                    <div
                        className="text-center text-lg text-gray-500"
                    >
                        Cargando...
                    </div>
                )
            }
            {
                accounts.length > 0 && table()
            }
        </>
    )
}