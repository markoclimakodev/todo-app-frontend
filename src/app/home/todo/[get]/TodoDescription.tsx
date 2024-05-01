import { ITodoDescription } from "@/interface/todo/ITodoDescription";

function TodoDescription({ descriptionParts, description }: ITodoDescription) {
    return (
        <>
            {descriptionParts ? (
                descriptionParts.map((desc, index) => (
                    <section key={index} className="px-3 w-2/3">
                        {desc.string.includes('*')  ? (
                            <ul className="px-10 w-2/3 list-disc">
                                <li className="mt-0">{desc.string.replace('*', '')}</li>
                            </ul>
                        ) : (
                            desc.string
                        )}
                    </section>
                ))
            ) : (
                <p className="px-3 w-2/3">{description}</p>
            )}
        </>
    );

}

export default TodoDescription