export interface ITodoDescription {
    descriptionParts: { position: number; string: string; }[] | null | undefined;
    description: string;
}