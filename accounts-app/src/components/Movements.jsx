import { useEffect, useState } from "react"
import { useNavigate, useLocation  } from 'react-router-dom';

import Token from '../states/token'


export default function Movements(){
    const [movements, setMovements] = useState([])
    const [loading, setLoading] = useState(false)
    const [kpi, setKpi] = useState()

    const{state: stateInput} = useLocation()
    const accountName = stateInput.accountName
    const accountId = stateInput.accountId
    const linkId = stateInput.linkId

    const calculateKpi = (data)=>{
        console.log('calcular KPI')
        let kpi = data.reduce((total, movement)=> {
            if (movement.type === "OUTFLOW"){
                return total - movement.amount
            }
            if (movement.type === "INFLOW"){
                return total + movement.amount
            }
        }, 0)
        kpi = Math.round(kpi * 100) / 100
        console.log("KPI:",kpi)
        setKpi(kpi)
    }

    const getMovements = async ()=>{
        setLoading(true)
        console.log('get movements')
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': Token.getToken()
            }
        }
        const url = `${import.meta.env.VITE_GET_MOVEMENTS_BY_ACCOUNT}/${accountId}/${linkId}`
        const response = await fetch(url, options)
        const data = await response.json()
        console.log('data response', data)
        setLoading(false)
        setMovements(data)
        calculateKpi(data)
    }

    useEffect(()=>{
        console.log('state info: ', accountName, accountId, linkId)
        getMovements()
    },[])
    return (
        <>
            <h1>Movimientos para: {accountName}</h1>
            <h2>KPI: {kpi}</h2>
            {
                movements.map((movement)=>{
                    return (
                        <div key={movement.id}>
                            {movement.description} - {movement.amount} - {movement.type}
                        </div>
                    )
                })
            }
        </>
    )
}