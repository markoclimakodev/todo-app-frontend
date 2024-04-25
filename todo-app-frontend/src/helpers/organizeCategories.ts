import { ICategory } from "@/interface/category/ICategory";

export const organizeCategories = (categories: ICategory[]) => {
    const organizedCategories: ICategory[] = [];
    let allIndex = 0;
    let importantIndex = 0;
    let completedIndex = 0;

    categories.forEach((category, index) => {
        if (category.name === 'todas') {
            allIndex = index;
        }
        if (category.name === 'importantes') {
            importantIndex = index
        }

        if (category.name === 'concluídas') {
            completedIndex = index
        }
    });

    if (allIndex !== -1) {
        organizedCategories.push(categories[allIndex]);
    }

    if (importantIndex !== -1) {
        organizedCategories.push(categories[importantIndex]);
    }

    if (completedIndex !== -1) {
        organizedCategories.push(categories[completedIndex])
    }

    const restCategories = categories.filter((_category, index) => {
        return index !== allIndex && index !== importantIndex && index !== completedIndex;
    });

    const sortedCategories = restCategories.sort((categoryA, categoryB) => {
        return categoryA.name.localeCompare(categoryB.name);
    });

    organizedCategories.push(...sortedCategories)
    return organizedCategories
}