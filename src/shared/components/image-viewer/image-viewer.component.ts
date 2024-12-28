import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'footiedrop-web-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { image: string },
    public dialogRef: MatDialogRef<ImageViewerComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
