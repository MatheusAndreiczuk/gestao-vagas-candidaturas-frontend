import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '../../services/axios';
import { MessageSquare, Briefcase, Building2 } from 'lucide-react';

type Feedback = {
    job_id: number;
    job_title: string;
    company: string;
    message: string;
    created_at?: string;
}

function Feedbacks() {
    const { token, decodedToken } = useAuth();
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const role = decodedToken?.role;
    const userId = decodedToken?.sub;

    async function fetchFeedbacks() {
        setIsLoading(true);
        try {
            const response = await api.get(`/users/${userId}/feedbacks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(response.data?.items ?? []);
        } catch (error) {
            console.error("Erro ao buscar feedbacks:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId && token) {
            fetchFeedbacks();
        }
    }, [userId, token]);

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Navbar role={role} />

            <div className='flex-1 flex items-start justify-center pt-10 overflow-auto'>
                <div className='border rounded-md p-6 shadow-lg w-5/6 mb-10'>
                    <h1 className='text-2xl font-bold mb-6 flex items-center gap-2'>
                        <MessageSquare />
                        Meus Feedbacks
                    </h1>

                    {isLoading ? (
                        <div className='flex items-center justify-center h-64'>
                            <p className='text-lg text-gray-500'>Carregando feedbacks...</p>
                        </div>
                    ) : feedbacks.length > 0 ? (
                        <div className='space-y-4'>
                            {feedbacks.map((feedback, index) => (
                                <div key={index} className='border rounded-lg p-5 shadow-md bg-white'>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center justify-between'>
                                            <h2 className='text-lg font-semibold flex items-center gap-2'>
                                                <Briefcase className='w-5 h-5' />
                                                {feedback.job_title}
                                            </h2>
                                        </div>
                                        
                                        <p className='text-sm text-gray-600 flex items-center gap-2'>
                                            <Building2 className='w-4 h-4' />
                                            {feedback.company}
                                        </p>

                                        <div className='mt-2 pt-3 border-t'>
                                            <p className='text-sm font-semibold text-gray-700 mb-1'>Mensagem:</p>
                                            <p className='text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded'>
                                                {feedback.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-64'>
                            <p className='text-lg text-gray-500 font-semibold'>Você ainda não recebeu nenhum feedback</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feedbacks;
