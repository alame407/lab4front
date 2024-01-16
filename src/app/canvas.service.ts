import {Injectable} from "@angular/core";
import {Attempt} from "./attempt";
import {CheckedAttempt} from "./CheckedAttempt";
export const MAX_CANVAS_COORDINATE = 5.5;
@Injectable({
  providedIn: "root"
})
export class CanvasService{
  drawPoint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D,checkedAttempt: CheckedAttempt){
    context.beginPath();
    let oldFillStyle = context.fillStyle;
    if (checkedAttempt.inFigure){
      context.fillStyle = "green";
    }
    else{
      context.fillStyle = "red";
    }
    let x = canvas.width/2/MAX_CANVAS_COORDINATE * checkedAttempt.x;
    let y = canvas.height/2/MAX_CANVAS_COORDINATE * checkedAttempt.y;
    context.arc(x, -y ,2, 0, 2* Math.PI, true);
    context.fill();
    context.fillStyle = oldFillStyle;
  }
  drawPoints(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, checkedAttempts: CheckedAttempt[]){
    for (let checkedAttempt of checkedAttempts){
      this.drawPoint(canvas, context, checkedAttempt);
    }
  }
  setUpCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, r: number, checkedAttempts: CheckedAttempt[]){
    context.beginPath();
    context.translate(canvas.width/2, canvas.height/2);
    context.font = "20px Arial";
    context.fillText("x", canvas.width/2-10, -10);
    context.fillText("y", 10, -canvas.height/2+15);
    context.beginPath();
    context.fillStyle = "rgb(51, 153, 255)";
    context.rect(0,0, canvas.width/2*(r/MAX_CANVAS_COORDINATE)/2,canvas.height/2*(r/MAX_CANVAS_COORDINATE));
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(0,0, canvas.height/2*(r/MAX_CANVAS_COORDINATE), Math.PI, 3*Math.PI/2, false);
    context.fill();
    context.stroke();
    context.beginPath();
    context.lineTo(-canvas.height/2*(r/MAX_CANVAS_COORDINATE)-1, 0);
    context.lineTo(0, -canvas.height/2*(r/MAX_CANVAS_COORDINATE)-1);
    context.lineTo(0,0);
    context.fill();
    context.beginPath();
    context.lineTo(canvas.width/2*(r/MAX_CANVAS_COORDINATE), 0);
    context.lineTo(0, -canvas.height/2*(r/MAX_CANVAS_COORDINATE));
    context.lineTo(0,0);
    context.fill();
    context.stroke();
    context.beginPath();
    context.fillStyle = "black"
    for (let i=-5; i<0; i++){
      context.fillText(i.toString(), canvas.width/2/MAX_CANVAS_COORDINATE*i, 15);
    }
    for (let i=1; i<=5; i++){
      context.fillText(i.toString(), canvas.width/2/MAX_CANVAS_COORDINATE*i, 15);
    }
    for (let i=-5; i<0; i++){
      context.fillText((-i).toString(), -20, canvas.height/2/MAX_CANVAS_COORDINATE*i);
    }
    for (let i=1; i<=5; i++){
      context.fillText((-i).toString(), -20, canvas.height/2/MAX_CANVAS_COORDINATE*i);
    }
    context.moveTo(-canvas.width/2,0);
    context.lineTo(canvas.width/2, 0);
    context.moveTo(0, -canvas.height/2);
    context.lineTo(0, canvas.height/2);
    context.stroke();
    this.drawPoints(canvas, context, checkedAttempts);
  }
  clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D){
    context.reset();
  }
}
