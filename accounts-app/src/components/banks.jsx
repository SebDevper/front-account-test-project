import Token from '../states/token'
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Banks() { 
  let [bankData, setBankData] = useState([])
  let [bankSelected, setBankSelectd] = useState(null)
  let [pageTitle, setPageTitle] = useState("Seleccione un banco")

  let [loadingBanks, setLoadingBanks] = useState(true)

  let navigate = useNavigate();

  const getBanks = async () => {
    console.log('getBanks')
    setLoadingBanks(true)

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': Token.getToken()
      }
    }

    let response = await fetch('https://back-account-app-test.onrender.com/get_accounts_by_bank', options)
    let data = await response.json()
    console.log(data)
    setBankData(data.accounts)
    setLoadingBanks(false)
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

  const renderBankLoader = () => {
    if (!loadingBanks){
      return null
    }

    return (
      <div className="text-xl font-bold text-center">
        Cargando bancos...
      </div>
    )
  }

  const renderBackButton = () => {
    if (bankSelected)
    {
      return (
      <div className='w-full flex justify-center'>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-7/12 lg:w-2/12 xl:w-2/12 2xl:w-2/12"
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
      <>
        <section className='w-full flex justify-center'>
          {renderKpi()}
        </section>
        <section className='w-full flex justify-center'>
          <table className="border-collapse border border-slate-500 table-auto">
            <tr>
              <th className="border border-stone-400">Tipo</th>
              <th className="border border-stone-400">Balance</th>
              <th className="border border-stone-400">Nombre</th>
            </tr>
            {
              bankAccounts.map(account => {
                if (account.balance_type === "LIABILITY"){
                  return (
                    <tr key={account.id}>
                      <td className="border border-stone-400">
                        Deuda
                      </td>
                      <td className="border border-stone-400">
                        {account.currency} -{account.balance.current}
                      </td>
                      <td className="border border-stone-400">
                        {account.name}
                      </td>
                    </tr>
                  )
                }
                if (account.balance_type === "ASSET"){
                  return (
                    <tr key={account.id}>
                      <td className="border border-stone-400">
                        Ingreso
                      </td>
                      <td className="border border-stone-400">
                        {account.currency} {account.balance.current}
                      </td>
                      <td className="border border-stone-400">
                        {account.name}
                      </td>
                    </tr>
                  )
                }
              })
            }
          </table>
        </section>
      </>
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
        <h1 className="text-3xl font-bold my-5">{pageTitle}</h1>
      </div>
      { renderBankLoader()}
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
                    className="border-2 border-blue-500 text-blue-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-7/12 lg:w-2/12 xl:w-2/12 2xl:w-2/12"
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
