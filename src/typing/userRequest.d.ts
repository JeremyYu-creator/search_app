interface RegisterCode {
    email: string
}

interface RegisterUser extends RegisterCode{
    password: string,
    code: string,
}

interface UserLogin extends RegisterCode{
    password: string,
}

export { RegisterCode, RegisterUser, UserLogin }