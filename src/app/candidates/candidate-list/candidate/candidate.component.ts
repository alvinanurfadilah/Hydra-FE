import { Component, inject, Input, OnInit } from '@angular/core';
import { ResponseCandidate } from '../../candidates.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'tr[app-candidate]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit {
  @Input({ required: true }) candidate!: ResponseCandidate;
  private _authService = inject(AuthService);
  hasAdmin?: boolean;

  ngOnInit(): void {
    this._authService.hasAdmin$.subscribe((result) => (this.hasAdmin = result));
  }
}
