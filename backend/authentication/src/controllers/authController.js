
class AuthController {
    constructor(AuthService){
        this.AuthService = AuthService
    }

    register = async (req , res ,next)=>{
        const user = await this.AuthService.register(req.body)
        res.json(user)

    }

    login = async (req , res, next)=>{
        const loged = await this.AuthService.login(req.body)
        res.json(loged)
    }

    getAllUsers = async (req , res , next)=>{
        const finding  = await this.AuthService.getAllUsers()
        res.json(finding)
    }

}

export default AuthController