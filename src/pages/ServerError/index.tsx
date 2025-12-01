import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { AlertTriangle } from 'lucide-react';

function ServerError() {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='text-center max-w-md'>
                <div className='flex justify-center mb-6'>
                    <AlertTriangle className='w-20 h-20 text-yellow-500' />
                </div>
                
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
                    Erro de Comunicação
                </h1>
                
                <p className='text-gray-600 mb-6'>
                    Ocorreu um erro ao processar os dados do servidor. 
                    O problema foi reportado automaticamente.
                </p>
                
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                    <Button onClick={() => navigate(-1)} color='blue'>
                        Voltar
                    </Button>
                    <Button onClick={() => navigate('/home')}>
                        Ir para Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ServerError;
