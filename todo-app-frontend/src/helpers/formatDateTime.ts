import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", { locale: ptBR });
}