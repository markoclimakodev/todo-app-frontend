import * as LucideIcons from 'lucide-react';

export type IconNames = keyof typeof LucideIcons;

type IconProp = {
    iconname: IconNames;
    color?: string;
    size?: number;
    className?: string;
    title?:string
};
const Icon = (iconProps: IconProp) => {
    let IconComponent = (LucideIcons as any)[iconProps.iconname];

    return IconComponent ? <IconComponent {...iconProps}/> : <span>Ícone não encontrado</span>;
};

export default Icon;
