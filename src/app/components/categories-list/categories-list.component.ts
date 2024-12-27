import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  showCategoryForm: boolean = false; 
  categoryToUpdate: Category | null = null; 

  constructor(private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    // Subscribe to the categories observable to get the updated list
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onAddCategory() {
    this.showCategoryForm = true;
    this.categoryToUpdate = null;
  }

  onUpdateCategory(category: Category) {
    this.showCategoryForm = true;
    this.categoryToUpdate = category; 
  }
  

  // Hide the form after saving the category
  onCategorySaved(category: Category) {
    this.showCategoryForm = false;
    this.categoryToUpdate = null; // Reset categoryToUpdate
    console.log('Category saved:', category);
  }
  // Delete category
  onDeleteCategory(category: Category) {
    console.log(' Category to delete:', category);
     this.categoryService.deleteCategory(category);  
       
  }
}
