const validInfo = function(req, res, next) {
  const { email, username, password } = req.body; // Changed from password_hash to password

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log("Validation - email:", email, "username:", username, "password:", password); 
    if (![email, username, password].every(Boolean)) {
      return res.status(400).json({message: "Missing Credentials"});
    } else if (!validEmail(email)) {
      return res.status(400).json({message: "Invalid Email"});
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) { 
      return res.status(400).json({message: "Missing Credentials"});
    } else if (!validEmail(email)) {
      return res.status(400).json({message: "Invalid Email"});
    }
  }

  next();
};

export default validInfo;