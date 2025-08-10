const validInfo = function(req, res, next) {
  const { email, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/login") {
    if (![email, password].every(Boolean)) { 
      return res.status(400).json({message: "Missing Credentials"});
    } else if (!validEmail(email)) {
      return res.status(400).json({message: "Invalid Email"});
    }
  }

  next();
};

export default validInfo;