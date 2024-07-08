import Token from '../states/token'
import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Banks() { 
  let [bankData, setBankData] = useState([])

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

  useEffect(()=> {
    console.log("token")
    console.log(Token.getToken())
    if (!Token.getToken())
      return navigate("/")
    getBanks()
  })



  return (
    <>
      <h1>Seleccione un banco</h1>
      <section>
        {
          bankData.map(bank => {
            return (
              <div>{bank.bank_name}</div>
            )
          })
        }
      </section>
    </>
  )
}

export default Banks
