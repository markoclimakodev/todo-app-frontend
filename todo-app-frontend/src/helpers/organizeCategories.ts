import { ICategory } from "@/interface/category/ICategory";

export const organizeCategories = (categories: ICategory[]) => {
    const organizedCategories: ICategory[] = [];
    let allIndex = 0;
    let importantIndex = 0;

    categories.forEach((category, index) => {
        if (category.name === 'todas') {
            allIndex = index;
        }
        if (category.name === 'importantes') {
            importantIndex = index
        }
    });

    if (allIndex !== -1) {
        organizedCategories.push(categories[allIndex]);
    }

    if (importantIndex !== -1) {
        organizedCategories.push(categories[importantIndex]);
    }

    const restCategories = categories.filter((_category, index) => {
        return index !== allIndex && index !== importantIndex;
    });

    const sortedCategories = restCategories.sort((categoryA, categoryB) => {
        return categoryA.name.localeCompare(categoryB.name);
    });

    organizedCategories.push(...sortedCategories)
    return organizedCategories
}