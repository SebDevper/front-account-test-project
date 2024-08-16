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

    useEffect(()=>{
        if(!bankCode){
            navigate('/banklist')
            return
        }
        console.log('bankSelected', bankCode)
        getAccounts()
    }, [])

    return (
        <div>
            <h1>Lista de cuentas</h1>
            <h2>Banco: {bankDisplayName}</h2>
            {
                accounts.map((account)=>{
                    return (
                        <div
                            key={account.id}
                            onClick={()=>{
                                    selectAccount(
                                        account.name,
                                        account.id,
                                        account.link
                                    )}
                            }
                        >
                            ({account.currency}) {account.name} - {account.type} - {account.internal_identification}
                        </div>
                    )
                })
            }
        </div>
    )
}