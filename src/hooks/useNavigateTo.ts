import { UseNavigateToReturnType } from '@/interface/hooks/UseNavigateToReturnType';
import { useRouter } from 'next/navigation';

export const useNavigateTo = ():UseNavigateToReturnType => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return navigateTo;
};

export default useNavigateTo;
