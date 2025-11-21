import { GetJobSchema } from '../schemas/jobSchema';
import { Button } from './Button';
import { X, Briefcase, Building2, MapPin, Earth, Banknote } from 'lucide-react';

type ConfirmApplicationModalProps = {
    job: GetJobSchema;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
}

export function ConfirmApplicationModal({ job, isOpen, onClose, onConfirm, isSubmitting }: ConfirmApplicationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-4 md:p-6 border-b">
                    <h2 className="text-xl md:text-2xl font-bold">Confirmar Candidatura</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700"
                        disabled={isSubmitting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 md:p-6">
                    <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                        Você está prestes a se candidatar para a seguinte vaga:
                    </p>

                    <div className="bg-gray-50 border rounded-lg p-4 md:p-5 space-y-3 md:space-y-4">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                {job.title}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm md:text-base">
                                <Building2 className="w-4 h-4" />
                                {job.company}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.city}/{job.state}
                            </span>
                            <span className="flex items-center gap-1">
                                <Earth className="w-4 h-4" />
                                {job.area}
                            </span>
                            <span className="flex items-center gap-1">
                                <Banknote className="w-4 h-4" />
                                {job.salary ? `R$ ${job.salary.toFixed(2)}` : 'Não informado'}
                            </span>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-2">Descrição:</h4>
                            <p className="text-xs md:text-sm text-gray-600 whitespace-pre-line">{job.description}</p>
                        </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
                        Ao confirmar, suas informações serão enviadas para a empresa. 
                        Certifique-se de que seu perfil está atualizado.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 md:p-6 border-t">
                    <Button 
                        color="red" 
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={onConfirm}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Confirmar Candidatura'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
