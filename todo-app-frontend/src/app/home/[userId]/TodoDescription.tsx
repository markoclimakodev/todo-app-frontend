interface TodoDescriptionParams {
    descriptionParts: { position: number; string: string; }[] | null | undefined;
    description: string;
}

function TodoDescription({ descriptionParts, description }: TodoDescriptionParams) {
    return (
        <>
            {descriptionParts ? (
                descriptionParts.map((desc, index) => (
                    <p key={index} className="px-3 w-2/3 text-gray-700">
                        {desc.string.includes('*') && desc.string.includes('.') ? (
                            <ul className="px-10 w-2/3 list-disc">
                                <li className="mt-0 text-gray-700">{desc.string.replace('*', '')}</li>
                            </ul>
                        ) : (
                            desc.string
                        )}
                    </p>
                ))
            ) : (
                <p className="px-3 w-2/3 text-gray-700">{description}</p>
            )}
        </>
    );

}

export default TodoDescription