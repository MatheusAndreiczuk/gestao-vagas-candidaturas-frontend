import { Navbar } from '../../components/Navbar.js'
import { useAuth } from '../../context/AuthContext.js'
import { Input } from '../../components/Input.js'
import { Button } from '../../components/Button.js'
import { Search, Filter, X } from 'lucide-react'
import React, { useEffect, useState } from "react";
import { GetJobSchema } from '../../schemas/jobSchema.js'
import { JobCard } from '../../components/JobCard'
import { useForm } from 'react-hook-form'
import { api } from '../../services/axios.js'
import { jobsListResponseSchema } from '../../validators/serverResponseValidators'
import { useServerValidation } from '../../hooks/useServerValidation'


type FilterData = {
    title: string | null,
    company: string | null,
    state: string | null,
    city: string | null,
    area: string | null,
    salary_range: { min: number | null, max: number | null } | null,
}

function mapJobsFromAPI(rawJobs: any[]): GetJobSchema[] {
    return rawJobs.map(job => ({
        ...job,
        id: Number(job.job_id)
    }));
}

function Home() {
    const { token, decodedToken } = useAuth();
    const { validateSilent } = useServerValidation();
    const [allJobs, setAllJobs] = useState<GetJobSchema[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const role = decodedToken?.role;
    const userID = decodedToken?.sub;

    const { register, handleSubmit, reset } = useForm<FilterData>({
        defaultValues: {
            title: '',
            company: '',
            state: '',
            city: '',
            area: '',
            salary_range: { min: null, max: null }
        }
    })

    async function fetchAllJobs() {
        try {
            const getRoute = role === "company"
                ? `/companies/${userID}/jobs`
                : '/jobs/search';
            console.log("Fetching jobs from:", getRoute);
            console.log("ID enviado token:", userID);
            const response = await api.post(getRoute,
                { filters: [{}] },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            const jobs = mapJobsFromAPI(response.data?.items ?? response.data ?? []);
            setAllJobs(jobs);

        } catch (err) {
            console.error("Erro ao buscar vagas:", err);
        }
    }

    useEffect(() => {
        fetchAllJobs();
    }, [token])

    async function handleSearch(data: FilterData) {
        try {
            const endpoint = role === "company"
                ? `/companies/${userID}/jobs`
                : '/jobs/search';

            const filters: any = {};

            if (data.title && data.title.trim()) filters.title = data.title.trim();
            if (data.company && data.company.trim() && role === 'user') filters.company = data.company.trim();
            if (data.area && data.area.trim()) filters.area = data.area.trim();
            if (data.state && data.state.trim()) filters.state = data.state.trim();
            if (data.city && data.city.trim()) filters.city = data.city.trim();

            const minSalary = data.salary_range?.min;
            const maxSalary = data.salary_range?.max;
            const hasMin = minSalary !== null && minSalary !== undefined && !isNaN(minSalary) && minSalary > 0;
            const hasMax = maxSalary !== null && maxSalary !== undefined && !isNaN(maxSalary) && maxSalary > 0;

            if (hasMin || hasMax) {
                filters.salary_range = {
                    min: hasMin ? minSalary : null,
                    max: hasMax ? maxSalary : null
                };
            }

            const response = await api.post(endpoint,
                { filters: [filters] },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            
            const jobs = mapJobsFromAPI(response.data?.items ?? response.data ?? []);
            setAllJobs(jobs);
            setIsFilterOpen(false);
        } catch (error) {
            console.error("Erro ao buscar vagas filtradas:", error);
        }
    }

    async function handleClearFilters() {
        reset();
        await fetchAllJobs();
    }

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Navbar role={role} />

            <div className='flex-1 flex items-start justify-center sm:px-9 pt-6 md:pt-10 md:px-0 relative'>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className='lg:hidden fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg z-40 hover:bg-blue-600'
                >
                    {isFilterOpen ? <X className='w-6 h-6' /> : <Filter className='w-6 h-6' />}
                </button>

                <div className='sm:border w-full rounded-md p-3 md:p-6 shadow-lg md:w-5/6 flex flex-col lg:flex-row gap-4 md:gap-6 h-[calc(100vh-120px)] md:h-[80vh]'>
                    <aside className={`
                        fixed lg:relative
                        top-0 left-0
                        w-full sm:w-80 lg:w-1/4
                        h-full lg:h-full
                        bg-white
                        z-50 lg:z-auto
                        transition-transform duration-300
                        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        overflow-auto
                        p-4
                        shadow-xl lg:shadow-none
                    `}>
                        <div className='h-full flex flex-col'>
                            <div className='flex items-center justify-between mb-4 lg:mb-0'>
                                <h2 className='font-semibold text-base md:text-lg px-1 pb-3 md:pb-4 border-b w-full'>Filtros</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className='lg:hidden text-gray-500 hover:text-gray-700 ml-2'
                                >
                                    <X className='w-6 h-6' />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(handleSearch)} className='flex flex-col gap-2 md:gap-3 flex-1 overflow-auto pt-3 md:pt-4 px-1'>
                                <Input
                                    placeholder='Digite a área de atuação'
                                    label="Área de atuação"
                                    {...register('area')}
                                />
                                <Input
                                    placeholder='Digite a localização'
                                    label="Estado"
                                    {...register('state')}
                                />
                                <Input
                                    placeholder='Digite a cidade'
                                    label="Cidade"
                                    {...register('city')}
                                />

                                <Input
                                    placeholder='Salário mínimo'
                                    type='number'
                                    label="Salário mínimo"
                                    {...register('salary_range.min', {
                                        setValueAs: (v) => v === "" || v === null || v === undefined ? null : Number(v)
                                    })}
                                />
                                <Input
                                    placeholder='Salário máximo'
                                    type='number'
                                    label="Salário máximo"
                                    {...register('salary_range.max', {
                                        setValueAs: (v) => v === "" || v === null || v === undefined ? null : Number(v)
                                    })}
                                />
                                <Button type="submit" color="blue" onClick={() => setIsFilterOpen(false)}>Aplicar filtros</Button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleClearFilters();
                                        setIsFilterOpen(false);
                                    }}
                                    className='text-red-600 cursor-pointer font-semibold hover:text-red-500 hover:font-bold'
                                >
                                    Limpar filtros
                                </button>
                            </form>
                        </div>
                    </aside>

                    {isFilterOpen && (
                        <div
                            className='fixed inset-0 bg-transparent z-40 lg:hidden'
                            onClick={() => setIsFilterOpen(false)}
                        />
                    )}

                    <main className='flex-1 h-full overflow-auto'>
                        <div className='p-2 md:p-4'>
                            <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full" onSubmit={handleSubmit(handleSearch)}>
                                <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <Input
                                        {...register('title')}
                                        type="search"
                                        placeholder="Pesquise pelo cargo"
                                        containerClassName="flex-1"
                                    />

                                    {role === 'user' && (
                                        <>
                                            <span className="text-sm font-semibold text-center hidden sm:block">E / OU</span>
                                            <Input
                                                type="search"
                                                placeholder="Pesquise pelo nome da empresa"
                                                containerClassName="flex-1"
                                                {...register('company')}
                                            />
                                        </>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    aria-label="Pesquisar"
                                    className="p-2 text-gray-600 rounded cursor-pointer hover:scale-110 shrink-0 self-center"
                                >
                                    <span className='hidden sm:inline'>
                                        <Search />
                                    </span>
                                    <span className='inline sm:hidden'>Buscar</span>
                                </button>
                            </form>

                            {allJobs.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 w-full mt-6 md:mt-8'>
                                    {allJobs.map((job) => (
                                        <JobCard key={job.id} {...job} role={role} />
                                    ))}
                                </div>
                            ) : (
                                <div className='translate-y-1/2 flex justify-center items-center h-64'>
                                    <p className='text-base md:text-lg text-gray-600 font-semibold'>Nenhuma vaga encontrada</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home