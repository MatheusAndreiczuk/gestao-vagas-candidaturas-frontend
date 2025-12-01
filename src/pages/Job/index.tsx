import { Navbar } from '../../components/Navbar.js'
import React, { useEffect, useState } from "react";
import { GetJobSchema } from '../../schemas/jobSchema.js'
import { JobCard } from '../../components/JobCard.js'
import { api } from '../../services/axios.js';
import { useAuth } from '../../context/AuthContext.js';
import { useParams } from 'react-router-dom';
import { jobResponseSchema, applicationsListResponseSchema } from '../../validators/serverResponseValidators';
import { useServerValidation } from '../../hooks/useServerValidation';


function Job() {
    const { token, decodedToken } = useAuth();
    const { validateSilent } = useServerValidation();
    const [job, setJob] = useState<GetJobSchema | null>(null);
    const [hasApplied, setHasApplied] = useState(false);
    const { id } = useParams();
    const role = decodedToken?.role;
    const userId = decodedToken?.sub;

    async function fetchJob(){
        console.log("ID do job:" + id);
        try {
            const response = await api.get(`/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            const validated = await validateSilent(jobResponseSchema, response.data, 'job details');
            
            if (validated) {
                const mappedJob = { ...validated, id: Number(validated.job_id) };
                setJob(mappedJob as GetJobSchema);
            } else {
                const jobData = response.data;
                const mappedJob = { ...jobData, id: Number(jobData.job_id) };
                setJob(mappedJob);
            }
        } catch (error) {
            return null;
        }
    }

    async function checkIfApplied() {
        if (role !== 'user') return;
        
        try {
            const response = await api.get(`/users/${userId}/jobs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const validated = await validateSilent(applicationsListResponseSchema, response.data, 'user applications');
            
            const applications = validated?.items ?? response.data?.items ?? [];
            const applied = applications.some((app: any) => Number(app.job_id) === Number(id));
            setHasApplied(applied);
        } catch (error) {
            console.error("Erro ao verificar candidatura:", error);
        }
    }

    useEffect(() => {
        fetchJob();
        checkIfApplied();
    }, [id]);


    return (
        <>
        <Navbar role={role}/>
            <div className="mt-10 md:mt-20 flex justify-center px-4">
                <div className='w-full md:w-5/6 max-w-5xl'>
                    {job ? (
                        <JobCard {...job} isView={true} role={role} hasApplied={hasApplied} />
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Job;
