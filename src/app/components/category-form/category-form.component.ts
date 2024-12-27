import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  categoryName: string = ''; // To hold the category name input
  @Input() categoryToUpdate: Category | null = null; // Input to update category
  @Output() categorySaved = new EventEmitter<Category>();
  errorMessage: string = ''; 

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    if (this.categoryToUpdate) {
      this.categoryName = this.categoryToUpdate.name || ''; 
    }
  }


  onSubmit() {
    if (this.categoryName) {
      try {
        let updatedCategory: Category;
        if (this.categoryToUpdate) {
          // Update existing category, include id along with name
          updatedCategory = { ...this.categoryToUpdate, name: this.categoryName };
          this.categoryService.updateCategory(this.categoryToUpdate, this.categoryName);
          console.log('Category Updated:', updatedCategory);
        } else {
          // Add new category, generate a new id (for example purposes, you can use an auto-generated or UUID value)
          updatedCategory = { name: this.categoryName };
          this.categoryService.addCategory(updatedCategory);
          console.log('Category Added:', updatedCategory);
        } 
        this.categorySaved.emit(updatedCategory);

      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
  
}