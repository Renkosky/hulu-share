import { HuluNode } from '../types/index';
import Hulu from './index';
function render(huluNode: HuluNode, container: HTMLElement | null): void {
    let root = container ?? document.body;
    if (typeof huluNode === 'string') {
        let txt = document.createTextNode(huluNode);
        root.appendChild(txt);
        return;
    }
    if (
        ['boolean', 'undefined', 'number'].includes(typeof huluNode) ||
        JSON.stringify(huluNode) === '{}'
    )
        return;
    // 对 children 生成的虚拟dom进行处理
    if (typeof huluNode === 'object' && huluNode instanceof Array) {
        huluNode.forEach((child: HuluNode) => {
            render(child, root);
        });
        return;
    }
    if (typeof huluNode.type === 'function') {
        let comp = new huluNode.type();
        comp.children.forEach((child: HuluNode) => {
            render(child, null);
        });
        console.log(comp);
        // root.appendChild(comp);
    }
    if (typeof huluNode.type === 'string') {
        let element = document.createElement(huluNode.type);

        huluNode.children.forEach((child: HuluNode) => {
            render(child, element);
        });

        root.appendChild(element);
    } else {
        let comp = new huluNode.type();
        huluNode.children.forEach((child: HuluNode) => {
            comp.appendChild(child);
        });
        render(comp.render(), root);
    }

    // else {
    //     // console.log(huluNode.type, '=======');
    //     let comp = new huluNode.type();
    //     // console.log(comp instanceof Hulu.Component, '======');
    //     if (comp instanceof Hulu.Component) {
    //         huluNode.children.forEach((child: HuluNode) => {
    //             comp.appendChild(child);
    //         });
    //         render(comp.render(), root);
    //     } else {
    //         // console.log(huluNode);
    //         // huluNode.type.prototype = new fcComponent(huluNode.children as HuluNode[]);
    //         // let comp = new huluNode();
    //         huluNode.children.forEach((child: HuluNode) => {
    //             render(child, null);
    //         });

    //         root.appendChild(huluNode);
    //     }
    // }
}

export default render;
