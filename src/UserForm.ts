import {User} from "./model/User";

export class UserForm {

    hooks = [
        'button:click:submission',
        'random:click:random_age'
    ];

    template = () => `<h1>User Form</h1>
        <div>User name ${this.user.get('name')}
        <div>User age ${this.user.get('age')}</div>
        <form>
        <input />
        <button id="button">Submit</button>
        <button id="random">Random age</button>
    </form>`;

    node: HTMLDivElement | null = null;

    constructor(private user: User) {
        this.on('model_change', this.render);
        this.on('random_age', () => {
           this.user.set({age: Math.round(Math.random() * 100)});
        })
    }

    render = () => {
        if (this.node) {
            // @ts-ignore
            window.document.getElementById('root').removeChild(this.node);
        }
        this.node = document.createElement('div');
        this.node.innerHTML = this.template();
        // @ts-ignore
        window.document.getElementById('root').append(this.node);
        this.attachHooks(this.hooks);

    }

    attachHooks = (hooks: string[]) => {
        let id: string, event: string, hook: string;
        hooks.forEach((item) => {
            [id, event, hook] = item.split(':');
            // @ts-ignore
            document.getElementById(id).addEventListener(event, (e) => {e.preventDefault(); this.trigger(hook)});

        })
    }

    get on() {
        return this.user.on;
    }

    get trigger() {
        return this.user.trigger;
    }
}

