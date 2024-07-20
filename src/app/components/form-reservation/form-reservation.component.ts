import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrl: './form-reservation.component.css'
})
export class FormReservationComponent {
  reservationForm!: FormGroup;
  message: string | null = null;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.reservationForm = this.fb.group({
      roomId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      userId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      version: [0]  // Valor inicial para el campo version
    });
  }

  submitReservation(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe(
        response => {
          console.log('Reserva creada exitosamente!', response);
          this.success = true;
          this.message = '¡Reserva creada exitosamente!';
          Swal.fire('Éxito', '¡Reserva creada exitosamente!', 'success');
          this.resetForm();
        },
        error => {
          console.error('Error al crear la reserva', error);
          this.success = false;
          if (error.status === 409) {
            this.message = 'Conflicto de versión. Por favor, intente de nuevo.';
            Swal.fire('Conflicto de Versión', 'La reserva ha fallado debido a un conflicto de versión. Por favor, intente de nuevo.', 'warning');
          } else {
            this.message = error.error?.message || 'No se pudo crear la reserva';
            Swal.fire('Error', error.error?.message || 'No se pudo crear la reserva', 'error');
          }
        }
      );
    } else {
      Swal.fire('Error de Validación', 'Por favor, corrige los errores en el formulario', 'warning');
    }
  }

  private resetForm(): void {
    this.reservationForm.reset({ version: 0 });
    this.message = null;
  }
}
