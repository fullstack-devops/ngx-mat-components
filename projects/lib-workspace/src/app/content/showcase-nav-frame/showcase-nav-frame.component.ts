import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-showcase-nav-frame',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './showcase-nav-frame.component.html',
})
export class ShowcaseNavFrameComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {}
