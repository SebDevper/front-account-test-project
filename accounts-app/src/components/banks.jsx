import Token from '../states/token'
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Banks() { 
  let [bankData, setBankData] = useState([])
  let [bankSelected, setBankSelectd] = useState(null)
  let [pageTitle, setPageTitle] = useState("Seleccione un banco")

  let navigate = useNavigate();

  const getBanks = async () => {
    console.log('getBanks')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': Token.getToken()
      }
    }

    let response = await fetch('http://127.0.0.1:8000/get_accounts_by_bank', options)
    let data = await response.json()
    console.log(data)
    setBankData(data.accounts)
  }

  const showBalance = (event) => {
    console.log('showBalance')
    console.log(event.target.id)
    setBankSelectd(event.target.id)
    setPageTitle("Detalle de balance: "+event.target.id)
  }

  const resetSelectedBank = () => {
    setBankSelectd(null)
    setPageTitle("Seleccione un banco")
  }

  const renderBackButton = () => {
    if (bankSelected)
    {
      return (
      <div className='w-full flex justify-center'>
        <button
          className="bg-blue-500 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-7/12 lg:w-2/12 xl:w-2/12 2xl:w-2/12"
          onClick={resetSelectedBank}>
          volver
        </button>
      </div>)
    }
  }

  const renderKpi = () => {
    if (bankSelected){
      const kpi = bankData.filter(bank => bank.bank_name === bankSelected)[0].kpi
      return (
      <div>
        <h1>Balance (KPI): {kpi}</h1>
      </div>
      )
    }
  }

  const renderAccounts = () => {
    if (!bankSelected){
      return null
    }

    const bankAccounts = bankData.filter(bank => bank.bank_name === bankSelected)[0].accounts
    return (
      <table>
        <tr>
          <th>Tipo</th>
          <th>Balance</th>
          <th>Nombre</th>
        </tr>
        {
          bankAccounts.map(account => {
            if (account.balance_type === "LIABILITY"){
              return (
                <tr>
                  <td>Deuda</td>
                  <td>{account.currency} {account.balance.current}</td>
                  <td>{account.name}</td>
                </tr>
              )
            }
            if (account.balance_type === "ASSET"){
              return (
                <tr>
                  <td>Ingreso</td>
                  <td>{account.currency} {account.balance.current}</td>
                  <td>{account.name}</td>
                </tr>
              )
            }
          })
        }
      </table>
    )
  }

  useEffect(()=> {
    console.log("token")
    console.log(Token.getToken())
    if (!Token.getToken())
      return navigate("/")

    if (bankData.length === 0)
      getBanks()
  })



  return (
    <>
      {
        renderBackButton()
      }
      <div className='w-full flex justify-center'>
        <h1>{pageTitle}</h1>
      </div>
      {renderKpi()}
      <section
        className=''>
        {
          bankData.map(bank => {
            if (!bankSelected){
              return (
                <div 
                  className='text-center mb-2 '
                  key={bank.bank_name}
                >
                  <button
                    key={bank.bank_name}
                    id={bank.bank_name}
                    className="bg-blue-500 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-7/12 lg:w-2/12 xl:w-2/12 2xl:w-2/12"
                    onClick={showBalance}>
                    {bank.bank_name}
                  </button>
                </div>
              )
            }
          })
        }
      </section>
      <section>
        {
          renderAccounts()
        }
      </section>
    </>
  )
}

export default Banks
