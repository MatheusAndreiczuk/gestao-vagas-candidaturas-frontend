import { Navbar } from '../../components/Navbar.js'
import React, { useEffect, useState } from "react";
import { GetJobSchema, CreateJobSchema } from '../../schemas/jobSchema.js'
import { JobCard } from '../../components/JobCard.js'
import { api } from '../../services/axios.js';
import { useAuth } from '../../context/AuthContext.js';
import { useParams } from 'react-router-dom';


function Job() {
    const { token, decodedToken } = useAuth();
    const [job, setJob] = useState<GetJobSchema | null>(null);
    const { id } = useParams();
    const role = decodedToken?.role;

    async function fetchJob(){
        console.log("ID do job:" + id);
        try {
            const response = await api.get(`/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const jobData = response.data.items;
            const mappedJob = { ...jobData, id: Number(jobData.job_id) };
            setJob(mappedJob);
            console.log('Job mapeado:', mappedJob);
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        fetchJob();
    }, [id]);


    return (
        <>
        <Navbar role={role}/>
            <div className="mt-20 flex justify-center">
                <div className='w-5xl'>{job ? <JobCard {...job} isView={true} role={role}/> : <p>Carregando...</p>}</div>
            </div>
        </>
    )
}

export default Job;
