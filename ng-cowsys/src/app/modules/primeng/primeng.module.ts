import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    PanelModule,
    InputTextModule,
    CardModule,
    DialogModule,
    PasswordModule,
    ToastModule,
    ToolbarModule,
    MenubarModule,
    TableModule,
    BadgeModule,
    CalendarModule,
    InputNumberModule,
    InputTextareaModule,
    ConfirmDialogModule,
    TagModule,
    ChartModule,
    AutoCompleteModule,
    DropdownModule,
    SplitButtonModule
  ],
  exports: [
    ButtonModule,
    RippleModule,
    PanelModule,
    InputTextModule,
    CardModule,
    DialogModule,
    PasswordModule,
    ToastModule,
    ToolbarModule,
    MenubarModule,
    TableModule,
    BadgeModule,
    CalendarModule,
    InputNumberModule,
    InputTextareaModule,
    ConfirmDialogModule,
    TagModule,
    ChartModule,
    AutoCompleteModule,
    DropdownModule,
    SplitButtonModule
  ]
})
export class PrimengModule { }
