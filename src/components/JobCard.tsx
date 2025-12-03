import { useState } from "react"
import { GetJobSchema } from "../schemas/jobSchema"
import { AlertDialog } from "./AlertDialog"
import { Button } from "./Button"
import { MapPin, Briefcase, Banknote, Earth } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/axios"
import { useAuth } from "../context/AuthContext"

type JobCardProps = GetJobSchema & {
    role?: string | null
    isView?: boolean
    hasApplied?: boolean
}

export function JobCard({ role, isView, hasApplied, ...props }: JobCardProps) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

     const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async () => {
            setIsLoading(true);
            try {
                await api.delete(`/jobs/${props.id}`,
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                )
                navigate('/home')
            } catch (error) {
                console.error('Erro ao excluir vaga:', error);
            } finally {
                setIsLoading(false);
            }
        }

    return (
        <div className="border shadow-lg rounded-lg px-4 md:px-5 py-3 md:py-4 flex flex-col h-full">
            <div className="flex flex-col gap-3 md:gap-5 flex-1">
                <div>
                    <h1 className="text-base md:text-lg font-semibold flex items-center gap-1 wrap-break-words"> 
                        <Briefcase className="inline shrink-0 w-4 h-4 md:w-5 md:h-5" />
                        <span className="wrap-break-words">{props.title}</span>
                    </h1>
                    <p className="text-gray-500 flex items-center gap-1 text-xs md:text-sm mt-1 wrap-break-words">{props.company}</p>
                </div>
                <div className="flex flex-col gap-2 text-xs md:text-sm">
                    <p className="text-gray-500 flex items-center gap-1">
                        <MapPin className="shrink-0 w-4 h-4" />
                        <span className="wrap-break-words">{props.city}/{props.state}</span>
                    </p>
                    <p className="text-gray-500 flex items-center gap-1">
                        <Earth className="shrink-0 w-4 h-4" />
                        <span className="wrap-break-words">{props.area}</span>
                    </p>
                </div>
                {isView && (
                    <p className="text-xs md:text-sm text-gray-500 line-clamp-3">{props.description}</p>
                )}
            </div>
            <div className="flex flex-col gap-3 mt-3 md:mt-5 border-t pt-3">
                <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
                    <Banknote className="shrink-0 w-4 h-4" />
                    <span className="wrap-break-words">{props.salary ? `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(props.salary))}` : 'Não informado'}</span>
                </p>
                <div className="flex flex-col gap-2 w-full">{role == 'user' && isView ?
                        (
                            hasApplied ? (
                                <Button size="sm" onClick={() => navigate('/applications')}>
                                    Ver Candidaturas
                                </Button>
                            ) : (
                                <Button size="sm" onClick={() => navigate(`/jobs/application/${props.id}`)}>
                                    Candidatar-se
                                </Button>
                            )
                        ) : role == 'company' && isView ?
                            (
                                <div className="flex flex-col gap-2">
                                    <Button size="sm" onClick={() => { navigate(`/jobs/${props.id}/candidates`) }}>Ver Candidatos</Button>
                                    <Button size="sm" onClick={() => { navigate(`/jobs/edit/${props.id}`) }}>Editar</Button>
                                    <Button size="sm" onClick={handleOpenDialog}>Excluir</Button>

                                    <AlertDialog
                                        open={isDialogOpen}
                                        onClose={handleCloseDialog}
                                        onConfirm={handleConfirmDelete}
                                        title="Confirmação de Exclusão de Vaga anunciada"
                                        description="Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita."

                                        confirmText="Excluir definitivamente"
                                        confirmColor="error"
                                        isLoading={isLoading}
                                    />
                                </div>
                            ) : (
                                <Button size="sm" onClick={() => { navigate(`/jobs/${props.id}`) }}>Detalhes</Button>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
