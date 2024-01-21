import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Attempt} from "../attempt";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {stringAsNumberRangeValidator} from "../StringAsNumberRangeValidator";
import {CheckedAttemptService} from "../checked-attempt.service";
import {DefaultPostResponse} from "../DefaultPostResponse";
import {CanvasService, MAX_CANVAS_COORDINATE} from "../canvas.service";
import {CheckedAttempt} from "../CheckedAttempt";
import {oneOfValueValidator} from "../OneOfValueValidator";

@Component({
  selector: 'app-check-point-form',
  templateUrl: './check-point-form.component.html',
  styleUrl: './check-point-form.component.css',
  providers: []
})
export class CheckPointFormComponent implements OnInit, AfterViewInit{
  attempt: Attempt = new Attempt( 0, 0, 1);
  checkPointForm: FormGroup;
  optionsX = Array<number>();
  optionsR = Array<number>();
  checkedAttemptService: CheckedAttemptService;
  response: DefaultPostResponse = new DefaultPostResponse(true, "", "");
  @ViewChild('pointCanvas')
  canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  @ViewChild('submitButton')
  submitButton: ElementRef<HTMLButtonElement>;
  @ViewChild('canvasContainer')
  container: ElementRef<HTMLDivElement>
  public onFormSubmit() {
    this.attempt.x = +this.checkPointForm.controls['x'].value;
    this.attempt.y = +this.checkPointForm.controls['y'].value;
    this.attempt.r = +this.checkPointForm.controls['r'].value;
    this.add(this.attempt);
  }
  ngOnInit(): void {
    for (let i=-5; i<=3;i++){
      this.optionsX.push(i);
      this.optionsR.push(i);
    }
  }
  constructor(private fb: FormBuilder, checkedAttemptService: CheckedAttemptService, private canvasService: CanvasService) {
    this.checkedAttemptService = checkedAttemptService;
    this.checkPointForm = this.fb.group({
      x: new FormControl(this.attempt.x, [Validators.required,
      oneOfValueValidator(this.optionsX)]),
      y: new FormControl(this.attempt.y,[Validators.required,
        Validators.maxLength(15),
        stringAsNumberRangeValidator(-5, 3)]),
      r: new FormControl(this.attempt.r, [Validators.required,
        stringAsNumberRangeValidator(0, Number.MAX_VALUE),
        oneOfValueValidator(this.optionsR)])
    });
  }
  add(attempt: Attempt){
    this.checkedAttemptService.addCheckedAttempt(attempt, this.response);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasService.setUpCanvas(this.canvas.nativeElement, this.context, +this.checkPointForm.controls['r'].value, [])
    this.checkedAttemptService.carList$.subscribe(value => {
      this.drawCanvas(value);
    })
    if (document.readyState == "complete"){
      this.resize();
      window.addEventListener('resize', ()=>{
        this.resize();
      })
    }
    else{
      this.resize();
      window.addEventListener('resize', ()=>{
        this.resize();
      })
    }
    this.canvas.nativeElement.addEventListener("click", (event)=>{
      let  r = +this.checkPointForm.controls['r'].value;
      if (r>0) {
        const rect = this.canvas.nativeElement.getBoundingClientRect();
        let x = event.clientX - rect.left - this.canvas.nativeElement.width / 2;
        x = 2 * x / this.canvas.nativeElement.width * MAX_CANVAS_COORDINATE;
        x = Math.round(x);
        let y = -(event.clientY - rect.top) + this.canvas.nativeElement.height / 2;
        y = 2 * y / this.canvas.nativeElement.height * MAX_CANVAS_COORDINATE;
        if (!(this.optionsX.includes(x) && (-5<y && y<3))){
          return;
        }
        this.checkPointForm.controls['x'].setValue(x);
        this.checkPointForm.controls['y'].setValue(y);
        if(!this.submitButton.nativeElement.disabled){
          this.onFormSubmit();
        }
      }
    });
    this.checkPointForm.controls['r'].valueChanges.subscribe(()=>{
        this.drawCanvas(this.checkedAttemptService.checkedAttempts);
    })
  }
  drawCanvas(value: CheckedAttempt[]){
    this.canvasService.clearCanvas(this.canvas.nativeElement, this.context);
    this.canvasService.setUpCanvas(this.canvas.nativeElement, this.context, +this.checkPointForm.controls['r'].value, value)
  }
  resize(){
    this.canvas.nativeElement.width = this.container.nativeElement.offsetWidth*0.79;
    this.canvas.nativeElement.height = this.canvas.nativeElement.width;
    this.drawCanvas(this.checkedAttemptService.checkedAttempts);
  }
}
