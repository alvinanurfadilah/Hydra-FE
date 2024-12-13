import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryResponse } from '../../categories.model';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'tr[app-category]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  @Input({ required: true }) category!: CategoryResponse;
  @Output() deleted = new EventEmitter<void>();

  constructor(private categoryService: CategoriesService) {}

  onDelete(id: number) {
    const isDelete = window.confirm(
      `Apakah anda yakin ingin menghapus category ${this.category.name}?`
    );
    if (isDelete) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          window.alert('Berhasil menghapus category ' + this.category.name);
          this.deleted.emit();
        },
        error: (err) => {
          console.log(err);
          window.alert(err.message);
        },
      });
    }
  }
}
