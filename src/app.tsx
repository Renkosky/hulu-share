import Hulu from './hulu';

const a = (
    <div>
        {true} {1} {{}}
        a
        <br />b 江山如此多娇
        <ol>
            <li tabIndex={1}>1</li>
            <li tabIndex={2}>2</li>
            <li>3</li>
            <li>4</li>
        </ol>
    </div>
);

class Abc extends Hulu.Component {
    render() {
        return (
            <div>
                {a} {this.props.children}
            </div>
        );
    }
}

function Def() {
    return (
        <div>
            <header>静夜思</header>
        </div>
    );
}

Hulu.render(
    <Abc>
        <div>引无数英雄竞折腰</div>
        <Def>
            <ul>
                <li>床前明月光</li>
                <li>疑似地上霜</li>
            </ul>
        </Def>
    </Abc>,
    document.getElementById('root')
);
