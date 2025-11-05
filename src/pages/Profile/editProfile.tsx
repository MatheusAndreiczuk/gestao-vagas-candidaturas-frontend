import { createUserSchema } from '../../schemas/userSchema.ts'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/axios.js';
import { useEditingProfileStore } from '../../store/editing.ts';
import { parseJwt } from '../../utils/parseJwt.js';
import { CompanySchema, companySchema } from '../../schemas/companySchema.ts';
import { useEffect, useState } from 'react';

type userSchema = z.infer<typeof createUserSchema>

interface SaveUserDataProps extends userSchema {
    refetchUserData: () => Promise<void>;
}

export function EditUserData({ refetchUserData, ...userData }: SaveUserDataProps) {
    const falseEditingProfile = useEditingProfileStore((state) => state.falseEditingProfile);
    const [isCompany, setIsCompany] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        setIsCompany(decodedToken?.role === 'company');
    }, []);

    const currentSchema = isCompany ? companySchema : createUserSchema;

    const { register, handleSubmit, formState: { errors } } = useForm<userSchema | CompanySchema>({
        resolver: zodResolver(currentSchema),
        defaultValues: userData
    });

    async function editUserData(data: userSchema | CompanySchema) {
        try {
            const userData = JSON.stringify(data);

            const token = localStorage.getItem('token');
            const decodedToken = parseJwt(token);
            const userId = decodedToken?.sub;
            const getRoute = isCompany ? 'companies' : 'users';

            console.log('Token atual:', token);
            console.log('User ID decodificado:', userId);
            console.log('Enviando dados para API:', userData);

            await api.patch(`/${getRoute}/${userId}`, userData, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            console.log('Dados salvos com sucesso');

            await refetchUserData();

            console.log('Dados recarregados, voltando para visualização');

            falseEditingProfile();
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(editUserData)}>
            <fieldset className="p-10 border rounded-md border-black">
                <div className="flex flex-col gap-5">
                    {!isCompany && (
                        <>
                            <label>
                                Name:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('name')} />
                            </label>
                            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}

                            <label>
                                Username:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('username')} />
                            </label>
                            {errors.username && <span className='text-red-600'>{errors.username.message}</span>}

                            <label>
                                Password:
                                <input type="password" className="ml-2 border rounded-md p-2" {...register('password')} />
                            </label>
                            {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                            <label>
                                Email:
                                <input type="email" className="ml-2 border rounded-md p-1" {...register('email')} />
                            </label>
                            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                            <label>
                                Phone:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('phone')} />
                            </label>
                            {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}

                            <label>
                                Education:
                                <textarea className="ml-2 border rounded-md p-2" {...register('education')} />
                            </label>
                            {(errors as any).education && <span className='text-red-600'>{(errors as any).education.message}</span>}

                            <label>
                                Experience:
                                <textarea className="ml-2 border rounded-md p-2" {...register('experience')} />
                            </label>
                            {(errors as any).experience && <span className='text-red-600'>{(errors as any).experience.message}</span>}
                        </>
                    )}

                    {isCompany && (
                        <>
                            <label>
                                Name:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('name')} />
                            </label>
                            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}

                            <label>
                                Username:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('username')} />
                            </label>
                            {errors.username && <span className='text-red-600'>{errors.username.message}</span>}

                            <label>
                                Password:
                                <input type="password" className="ml-2 border rounded-md p-2" {...register('password')} />
                            </label>
                            {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                            <label>
                                Email:
                                <input type="email" className="ml-2 border rounded-md p-1" {...register('email')} />
                            </label>
                            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                            <label>
                                Phone:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('phone')} />
                            </label>
                            {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                            <label>
                                Business:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('business')} />
                            </label>
                            {(errors as any).business && <span className='text-red-600'>{(errors as any).business.message}</span>}

                            <label>
                                Street:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('street')} />
                            </label>
                            {(errors as any).street && <span className='text-red-600'>{(errors as any).street.message}</span>}

                            <label>
                                Number:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('number')} />
                            </label>
                            {(errors as any).number && <span className='text-red-600'>{(errors as any).number.message}</span>}

                            <label>
                                City:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('city')} />
                            </label>
                            {(errors as any).city && <span className='text-red-600'>{(errors as any).city.message}</span>}

                            <label>
                                State:
                                <input type="text" className="ml-2 border rounded-md p-2" {...register('state')} />
                            </label>
                            {(errors as any).state && <span className='text-red-600'>{(errors as any).state.message}</span>}
                        </>
                    )}
                </div>
            </fieldset>
            <div className="flex flex-row justify-end gap-5 mt-5">
                <button type='submit'
                    className="p-3 bg-green-400 rounded-md font-semibold cursor-pointer"
                >
                    Salvar
                </button>
                <button type='button' onClick={() => falseEditingProfile()}
                    className="p-3 bg-red-400 rounded-md font-semibold cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}