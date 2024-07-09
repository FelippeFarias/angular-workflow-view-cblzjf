import { Component } from '@angular/core';
import { Node, Path, Position, Size } from './models/model';
import { IOUtils } from './utils/io.utils';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.html',
  styleUrls: ['./workflow.scss'],
})
export class Workflow {
  nodes: Node[];
  paths: Path[];

  private nodeSize: Size = { width: 100, height: 100 };
  private nodePositions: { [nodeId: number]: Position } = {};

  constructor() {
    this.nodePositions = {
      1: { x: 20, y: 30 },
      2: { x: 200, y: 100 },
      3: { x: 400, y: 30 },
      4: { x: 600, y: 100 },
    };

    this.nodes = [
      {
        id: 1,
        icon: '🔥',
        title: '開始',
        outputSocket: {},
        initialPosition: this.nodePositions[1],
      },
      {
        id: 2,
        icon: '🐛',
        title: 'テスト',
        inputSocket: {},
        outputSocket: {},
        initialPosition: this.nodePositions[2],
      },
      {
        id: 3,
        icon: '🛠️',
        title: 'ビルド',
        inputSocket: {},
        outputSocket: {},
        initialPosition: this.nodePositions[3],
      },
      {
        id: 4,
        icon: '🚀',
        title: 'Ship it !!',
        inputSocket: {},
        outputSocket: {},
        initialPosition: this.nodePositions[4],
      },
    ];

    this.paths = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
    ];
  }

  handleChangeNodePosition(event: { id: number; position: Position }) {
    this.nodePositions[event.id] = event.position;
  }

  getD(path: Path) {
    const startPosition = this.getNodePosition(path.from, 'OUTPUT');
    const endPosition = this.getNodePosition(path.to, 'INPUT');
    return (
      startPosition && endPosition && IOUtils.getD(startPosition, endPosition)
    );
  }

  private getNodePosition(
    nodeId: number,
    socketType: 'INPUT' | 'OUTPUT'
  ): Position | undefined {
    const position = this.nodePositions[nodeId];
    if (!position) {
      return undefined;
    }
    if (socketType === 'INPUT') {
      return IOUtils.setOffset(position, { x: 0, y: this.nodeSize.height / 2 });
    }
    return IOUtils.setOffset(position, {
      x: this.nodeSize.width,
      y: this.nodeSize.height / 2,
    });
  }
}
