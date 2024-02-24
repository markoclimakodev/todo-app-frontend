import * as LucideIcons from 'lucide-react';
// import * as MaterialIcons from 'react-icons/md';

// type IconNames = keyof typeof MaterialIcons;

export type IconNames = keyof typeof LucideIcons;

type IconProp = {
    iconName: IconNames;
    color?: string;
    size?: number;
    className?: string;
    title?:string
};
const Icon = (iconProps: IconProp) => {
    let IconComponent = (LucideIcons as any)[iconProps.iconName];

    return IconComponent ? <IconComponent {...iconProps}/> : <div>Ícone não encontrado</div>;
};

export default Icon;
