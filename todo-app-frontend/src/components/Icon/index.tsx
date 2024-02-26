import * as LucideIcons from 'lucide-react';
// import * as MaterialIcons from 'react-icons/md';

// type IconNames = keyof typeof MaterialIcons;

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
