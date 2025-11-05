import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/axios.js'
import { Link, useNavigate } from 'react-router-dom'

const loginSchema = z.object({
    username: z.
        string()
        .trim(),
    password: z.
        string(),
})

type loginSchema = z.infer<typeof loginSchema>

function Login (){
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors} } = useForm<loginSchema>({
        resolver: zodResolver(loginSchema)
    })

    async function login(data: loginSchema){
        const dataJson = JSON.stringify(data)
        const { data:response } = await api.post('/login', dataJson)
        localStorage.setItem('token', response.token)
        navigate('/home')
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="rounded-md bg-gray-100 w-lg">
                <h1 className="text-center font-bold text-2xl mt-10">Login</h1>
                <form className="flex flex-col gap-5 p-10" onSubmit={handleSubmit(login)}>
                    <input className="w-full border focus:outline-none rounded-md p-3 mt-4" 
                        type="text" 
                        placeholder="Username" 
                        {...register('username')}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                    <input className="w-full border focus:outline-none rounded-md p-3" type="password" placeholder="Senha" {...register('password')}/>
                    {errors.password && <span>{errors.password.message}</span>}
                    <button className="bg-blue-500 w-full p-2 rounded-md font-semibold cursor-pointer text-white text-lg">Entrar</button>
                </form>
                <Link to="/register" className="block text-center mb-10 text-blue-500 hover:underline cursor-pointer text-lg" >
                    Não possui conta? Registre-se
                </Link>
            </div>
        </div>
    )
}

export default Login