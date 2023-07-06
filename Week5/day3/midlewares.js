import bcrypt from "bcrypt";

// function global middleware
export const meGlobalhu = (req, res, next) => {
  console.log("into global middleware");
  next();
};

// function to encrypt the password
export const hashpassword = (req, res, next) => {
  const { password } = req.body;
  const salt = 12;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err?.message) return res.json({ message: true, err: err.message });
    console.log("Into hashing password====" + hash);
    req.hashpassword = hash;
    next();
  });
};
