import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ArtistsService } from '../../../services/artists.service';
import { ArtistDto } from '../../../DTOs/ArtistDto';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, RouterLink,
    MatCard, MatCardContent, CommonModule,
    MatInput
  ],
  templateUrl: './artist-edit.html',
  styleUrl: './artist-edit.scss',
})
export class ArtistEdit implements OnInit {
  
  @Input({transform: numberAttribute})
  id!: number;

 
  private readonly formBuilder = inject(FormBuilder);
  artistService = inject(ArtistsService);
  router = inject(Router);
  selectedFile: File | null = null;

  form = this.formBuilder.group({
    Name: ['', Validators.required],
    Description: ['', Validators.required]
  })

  ArtistDto?: ArtistDto; 

  ngOnInit(): void {
    this.artistService.getById(this.id).subscribe( ArtistDto => {
      this.ArtistDto = ArtistDto;
      this.form.patchValue({
        Name: ArtistDto.name,
        Description: ArtistDto.description
      });
    });
  }

  saveChanges(){
    const formData = new FormData();
    formData.append('Id', this.id.toString());
    formData.append('Name', this.form.value.Name || '');
    formData.append('Description', this.form.value.Description || '');
    
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
    }

    this.artistService.updateFormData(this.id, formData).subscribe( {
    
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
