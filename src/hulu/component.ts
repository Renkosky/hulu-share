import { HuluNode } from '../types/index';

class Component {
    props: Record<string, any> = {};

    constructor() {
        this.props.children = [];
    }

    appendChild(child: HuluNode): void {
        this.props.children.push(child);
    }

    render(): HuluNode {
        return;
    }
}

export default Component;
