import { useEffect, useState } from "react"
import { useNavigate  } from 'react-router-dom';

import Token from '../states/token'
import BankComponent from "./BankComponent";

export default function BankList(){
    const [bankList, setBankList] = useState([])
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('Seleccione un banco')
    const navigate = useNavigate();

    const getAllBanks = async ()=>{
        setLoading(true)
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': Token.getToken()
            }
        }
        const response = await fetch(import.meta.env.VITE_GET_BANK_LIST, options)
        const data = await response.json()
        setBankList(data)
        setLoading(false)
    }

    const selectBank = (bankCode, bankDisplayName)=>{
        console.log('bank code', bankCode)
        const state = {bankCode, bankDisplayName}
        navigate('/accountlist', {state: state})
    }

    useEffect(()=>{
        getAllBanks()
    },[])

    useEffect(()=>{
        if(loading){
            setTitle('cargando...')
        } else {
            setTitle('Seleccione un banco')
        }
    },[loading])

    return (
        <>
            <section>
                <h1 className={
                    `text-center text-2xl font-bold mb-10 mt-6`
                }>
                    {title}
                </h1>

                {
                    bankList.map((bank)=>{
                    return (
                        <BankComponent
                            key={bank.id}
                            onClick={()=>{selectBank(bank.name, bank.display_name)}}
                            displayName={bank.display_name}
                            countryCode={bank.country_code}
                        />
                    )
                    })
                }
            </section>
        </>
    )
}