var Token = (function() {
  var full_name = "";
  let token = "";

  let getToken = () => {
    return window.localStorage.getItem('token')
  }
  let setToken = (newToken) => {
    window.localStorage.setItem('token', newToken)
  }
 
  return {
    getToken,
    setToken
  }

})();

export default Token;
