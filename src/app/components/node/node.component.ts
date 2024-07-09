import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Node, Position } from "../../models/model";
import { CdkDragMove } from "@angular/cdk/drag-drop";
import { IOUtils } from "../../utils/io.utils";

@Component({
  selector: "node",
  templateUrl: "node.component.html",
  styleUrls: ["node.component.scss"]
})
export class NodeComponent {
  @Input() node: Node;
  @Output() changePosition: EventEmitter<{
    id: number;
    position: Position;
  }> = new EventEmitter<{ id: number; position: Position }>();

  handleDragMoved(event: CdkDragMove) {
    const newPosition = IOUtils.getElementPosition(
      event.source.element.nativeElement
    );
    this.changePosition.emit({ id: this.node.id, position: newPosition });
  }
}
