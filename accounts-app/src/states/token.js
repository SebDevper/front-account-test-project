var Token = (function() {
  var full_name = "";
  let token = "";

  let getToken = () => {
    return token
  }

  let setToken = (newToken) => {
    token = newToken
  }
 
  return {
    getToken,
    setToken
  }

})();

export default Token;
