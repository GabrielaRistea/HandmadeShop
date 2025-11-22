import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ArtistsService } from '../../../services/artists.service';
import { ArtistDto } from '../../../DTOs/ArtistDto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artist-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, RouterLink],
  templateUrl: './artist-create.html',
  styleUrls: ['./artist-create.scss'],
})
export class ArtistCreate {
  private readonly formBuilder = inject(FormBuilder);
  artistService = inject(ArtistsService);
  router = inject(Router);
  selectedFile: File | null = null;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required]
  })

  saveChanges(){
    const formData = new FormData();
    formData.append('Name', this.form.value.Name || '');
    formData.append('Description', this.form.value.Description || '');
    
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    this.artistService.postFormData(formData).subscribe( {
    
        next: () => this.router.navigate(['/artist']),
      
    });
  }

    onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
