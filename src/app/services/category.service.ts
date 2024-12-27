import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSource = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSource.asObservable();
  constructor() { }

  addCategory(category: Category) {
    const currentCategories = this.categoriesSource.value;
    const categoryExists = currentCategories.some(cat => cat.name.toLowerCase() === category.name.toLowerCase());
    if (categoryExists) {
      throw new Error('Category name must be unique.');
    }
    // Assign a unique ID if not provided
    const newId = currentCategories.length > 0
      ? Math.max(...currentCategories.map(cat => cat.id ?? 0)) + 1
      : 1;
    const newCategory = { ...category, id: category.id ?? newId };
    this.categoriesSource.next([...currentCategories, category]);
  }

  updateCategory(categoryToUpdate: Category, newCategoryName: string) {
    const currentCategories = this.categoriesSource.value;
    //category name must be unique
    const categoryExists = currentCategories.some(
      (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase() && cat.name !== categoryToUpdate.name
    );

    if (categoryExists) {
      throw new Error('Category name must be unique.');
    }

    const categoryIndex = currentCategories.findIndex(cat => cat.name === categoryToUpdate.name);

    if (categoryIndex !== -1) {
      currentCategories[categoryIndex] = { name: newCategoryName };
      // Emit the updated list
      this.categoriesSource.next([...currentCategories]);
    }
  }

  deleteCategory(categoryToDelete: Category) {
    const currentCategories = this.categoriesSource.value;
    // Filter out the category to delete
    const updatedCategories = currentCategories.filter(cat => cat.name !== categoryToDelete.name);
    // Emit the updated list
    this.categoriesSource.next(updatedCategories);
  }
}
