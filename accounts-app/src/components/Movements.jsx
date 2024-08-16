import { useEffect, useState } from "react"
import { useNavigate, useLocation  } from 'react-router-dom';

import Token from '../states/token'


export default function Movements(){
    const [movements, setMovements] = useState([])
    const [loading, setLoading] = useState(false)
    const [kpi, setKpi] = useState("Cargando...")

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

    const table = ()=>{
        return (
            <div className="relative overflow-x-auto flex justify-center">
            <table className="w-full lg:w-7/12 text-sm text-left rtl:text-right text-gray-500 border-b">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-14">
                    <tr className="border-b">
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
            {
                movements.map((movement)=>{
                    return (
                        <tr key={movement.id}>
                            <td>{movement.description? movement.description : "movimiento sin identificar"}</td>
                            <td>{movement.type}</td>
                            <td className={movement.type === "OUTFLOW"? "text-red-400": ""}>
                                {movement.amount}
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
        console.log('state info: ', accountName, accountId, linkId)
        getMovements()
    },[])
    return (
        <>
            <h1 className="text-center text-2xl mb-2 mt-6">
                Movimientos para la cuenta: <span className="font-bold">{accountName}</span>
            </h1>
            <h2 className="text-center text-lg mb-6">
                KPI: {kpi}
            </h2>
            {!loading && movements.length === 0 && (
                <h2 className="text-center text-lg mb-6 text-gray-700">
                    Esta cuenta no tiene movimientos
                </h2>
            )}
            {!loading && movements.length > 0 && table()}
        </>
    )
}