import { ICategory } from "@/interface/category/ICategory";
import { auth } from "./auth";
import { organizeCategories } from "@/helpers/organizeCategories";

const {token, userId} = auth()


export async function getCategories(): Promise<ICategory[]> {
    const response = await fetch('http://localhost:3002/category/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching categories");
    }

    const data = await response.json();
    const orgizedCategories = organizeCategories(data)
    
    return orgizedCategories as ICategory[];
}

export async function createCategory(name: string ): Promise<void> {
    const response = await fetch('http://localhost:3002/category/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            name: name.toLocaleLowerCase()
            ,userId }),
    });

    if (!response.ok) {
        throw new Error("Error creating category");
    }
}

export async function updateCategory(userCategoryId: string, name: string ): Promise<void> {
    const response = await fetch('http://localhost:3002/category/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            name: name.toLocaleLowerCase(),
            userCategoryId 
            }),
    });

    if (!response.ok) {
        throw new Error("Error updating category");
    }
}

export async function deleteCategory(id: string, ): Promise<void> {
    const response = await fetch('http://localhost:3002/category/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Error deleting category');
    }
}