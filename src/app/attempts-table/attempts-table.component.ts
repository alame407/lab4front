import {Component, OnInit} from '@angular/core';
import {CheckedAttemptService} from "../checked-attempt.service";

@Component({
  selector: 'app-attempts-table',
  templateUrl: './attempts-table.component.html',
  styleUrl: './attempts-table.component.css',
  providers: []
})
export class AttemptsTableComponent implements OnInit {
  columnsToDisplay = ['id', 'x', 'y', 'r', 'inFigure'];
  constructor(protected checkedAttemptService: CheckedAttemptService) {
  }
  ngOnInit() {
    this.checkedAttemptService.getCheckedAttempt();
  }
}
