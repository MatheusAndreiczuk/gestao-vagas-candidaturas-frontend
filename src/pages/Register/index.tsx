import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/axios.js'
import { useNavigate } from 'react-router-dom'
import { createUserSchema } from '../../schemas/userSchema.ts'

type createUserSchema = z.infer<typeof createUserSchema>

function RegisterForm() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<createUserSchema>({
        resolver: zodResolver(createUserSchema)
    })

    async function handleCreateUser(data: createUserSchema) {
        const jsonResponse = JSON.stringify(data)
        await api.post('/users', jsonResponse)
        console.log(jsonResponse)
        navigate('/')
    }


    return (
        <>
            <div className='w-lg mx-auto mt-10'>
                <form className='flex flex-col gap-3 mx-auto bg-gray-100 p-10 rounded-lg'
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <h1 className='text-center font-semibold text-2xl'>Cadastro</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="username">Username: *</label>
                        <input type="text" className="border rounded-md p-2" placeholder='Digite seu username'
                            {...register('username')}
                        />
                        {errors.username && <span className='text-red-600'>{errors.username.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="name">Nome: *</label>
                        <input type="text" className="border rounded-md p-2" placeholder='Digite seu nome'
                            {...register('name')}
                        />
                        {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password">Senha: *</label>
                        <input type="password" className="border rounded-md p-2" placeholder='Digite uma senha'
                            {...register('password')}
                        />
                        {errors.password && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="border rounded-md p-2" placeholder='Digite um email (opcional)'
                            {...register('email')}
                        />
                        {errors.email && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="phone">Telefone:</label>
                        <input type="tel" className="border rounded-md p-2" placeholder='Digite um telefone (opcional)'
                            {...register('phone')}
                        />
                        {errors.phone && <span className='text-red-600'>{errors.phone?.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="experience">Experiência:</label>
                        <textarea className="border rounded-md p-2" placeholder='Experiência (opcional)'
                            {...register('experience')}
                        />
                        {errors.experience && <span className='text-red-600'>{errors.experience?.message}</span>}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="education">Educação:</label>
                        <textarea className="border rounded-md p-2" placeholder='Formação/educação (opcional)'
                            {...register('education')}
                        />
                        {errors.education && <span className='text-red-600'>{errors.education?.message}</span>}
                    </div>

                    <button className='bg-blue-400 rounded-md p-3 mt-3 cursor-pointer text-lg text-white font-semibold' type='submit'>Cadastrar</button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm