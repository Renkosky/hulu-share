import { HuluNode } from '../types/index';

function setAttribute(element: HTMLElement, key: string, value: any) {
    element.setAttribute(key, String(value));
}

function render(huluNode: HuluNode, container: HTMLElement | null): void {
    let root = container ?? document.body;

    if (typeof huluNode === 'string') {
        let txt = document.createTextNode(huluNode);
        root.appendChild(txt);
        return;
    }

    // 对 children 生成的虚拟dom进行处理
    if (typeof huluNode === 'object' && huluNode instanceof Array) {
        huluNode.forEach((child: HuluNode) => {
            render(child, root);
        });
        return;
    }

    try {
        if (typeof huluNode.type === 'string') {
            let element = document.createElement(huluNode.type);

            // attribute
            Object.entries(huluNode.props ?? {}).forEach(([key, value]) => {
                setAttribute(element, key, value);
            });

            huluNode.children.forEach((child: HuluNode) => {
                render(child, element);
            });

            root.appendChild(element);
            return;
        }

        if (typeof huluNode.type === 'function') {
            if (huluNode.type.prototype.render) {
                let comp = new huluNode.type();
                huluNode.children.forEach((child: HuluNode) => {
                    comp.appendChild(child);
                });
                render(comp.render(), root);
                return;
            }

            let _huluNode = huluNode.type();
            render(_huluNode, root);
        }
    } catch (e) {
        console.debug('catch', huluNode);
        let txt = document.createTextNode(String(huluNode));
        root.appendChild(txt);
        return;
    }
}

export default render;
