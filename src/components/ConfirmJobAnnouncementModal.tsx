import { CreateJobSchema } from '../schemas/jobSchema';
import { Button } from './Button';
import { X, Briefcase, MapPin, Earth, Banknote, FileText } from 'lucide-react';

type ConfirmJobAnnouncementModalProps = {
    jobData: CreateJobSchema;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
}

export function ConfirmJobAnnouncementModal({ jobData, isOpen, onClose, onConfirm, isSubmitting }: ConfirmJobAnnouncementModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-4 md:p-6 border-b">
                    <h2 className="text-xl md:text-2xl font-bold">Confirmar Anúncio da Vaga</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700"
                        disabled={isSubmitting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 md:p-6">
                    <p className="text-gray-700 mb-6">
                        Revise as informações da vaga antes de publicar:
                    </p>

                    <div className="bg-gray-50 border rounded-lg p-4 md:p-5 space-y-4">
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                {jobData.title}
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {jobData.city}/{jobData.state}
                            </span>
                            <span className="flex items-center gap-1">
                                <Earth className="w-4 h-4" />
                                {jobData.area}
                            </span>
                            <span className="flex items-center gap-1">
                                <Banknote className="w-4 h-4" />
                                {jobData.salary ? `R$ ${jobData.salary.toFixed(2)}` : 'Não informado'}
                            </span>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Descrição:
                            </h4>
                            <p className="text-sm text-gray-600 whitespace-pre-line bg-white p-3 rounded border">
                                {jobData.description}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-6">
                        Ao confirmar, a vaga será publicada e ficará visível para todos os usuários da plataforma.
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
                        {isSubmitting ? 'Publicando...' : 'Confirmar e Publicar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
